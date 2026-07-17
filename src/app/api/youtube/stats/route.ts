import { NextResponse } from "next/server";
import { fetchYouTubeStats } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600; // API route cache de 1 hora

/**
 * Endpoint GET /api/youtube/stats
 * Retorna as estatisticas somadas de todos os videos do canal.
 * Utiliza o Neon DB (via Prisma) para cache das métricas, evitando estourar cota do YouTube.
 */
export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    // Se o banco de dados nao estiver configurado, funciona em modo "sem banco"
    if (!databaseUrl || databaseUrl.includes("localhost:51213")) {
      console.warn("Prisma/Neon DB nao configurado com URL real. Servindo direto do fetch/fallback.");
      const freshStats = await fetchYouTubeStats();
      const totals = freshStats.reduce(
        (acc, curr) => {
          acc.views += curr.views;
          acc.likes += curr.likes;
          return acc;
        },
        { views: 0, likes: 0, videosCount: freshStats.length }
      );
      return NextResponse.json({ ...totals, source: "live/fallback" });
    }

    // 1. Tentar ler do CacheMetadata se temos atualizacao recente (menos de 1 hora)
    const cacheMeta = await prisma.cacheMetadata.findUnique({
      where: { key: "youtube_totals" },
    });

    const ONE_HOUR = 60 * 60 * 1000;
    if (cacheMeta && Date.now() - new Date(cacheMeta.updatedAt).getTime() < ONE_HOUR) {
      const cachedData = JSON.parse(cacheMeta.value);
      return NextResponse.json({ ...cachedData, source: "db_cache" });
    }

    // 2. Cache expirado ou inexistente: Buscar dados atualizados da API
    const freshStats = await fetchYouTubeStats();

    const totals = freshStats.reduce(
      (acc, curr) => {
        acc.views += curr.views;
        acc.likes += curr.likes;
        return acc;
      },
      { views: 0, likes: 0, videosCount: freshStats.length }
    );

    // 3. Salvar no banco em transacao paralela
    try {
      await prisma.$transaction([
        // Atualizar estatistica individual de cada video
        ...freshStats.map((video) =>
          prisma.videoStats.upsert({
            where: { id: video.id },
            update: { views: video.views, likes: video.likes, title: video.title },
            create: { id: video.id, views: video.views, likes: video.likes, title: video.title },
          })
        ),
        // Atualizar metadado de cache consolidado
        prisma.cacheMetadata.upsert({
          where: { key: "youtube_totals" },
          update: { value: JSON.stringify(totals) },
          create: { key: "youtube_totals", value: JSON.stringify(totals) },
        }),
      ]);
    } catch (dbError) {
      console.error("Falha ao salvar dados de cache no Neon DB:", dbError);
      // Nao quebra o request se o DB falhar ao salvar cache
    }

    return NextResponse.json({ ...totals, source: "refreshed_db" });
  } catch (error) {
    console.error("Erro geral na rota de API de estatisticas:", error);
    return NextResponse.json(
      { error: "Erro ao processar estatisticas." },
      { status: 500 }
    );
  }
}

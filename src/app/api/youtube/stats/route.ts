import { NextResponse } from "next/server";
import { VIDEOS } from "@/constants";
import { SITE_CONTENT } from "@/config/content";

export const revalidate = 3600; // API route cache de 1 hora

/**
 * Endpoint GET /api/youtube/stats
 * Como as APIs publicas do GitHub (badges) saíram do ar, 
 * os dados agora vao puxar direto de config/content.ts
 */
export async function GET() {
  try {
    return NextResponse.json({ 
      views: SITE_CONTENT.manualStats.views, 
      subs: SITE_CONTENT.manualStats.subs, 
      videosCount: VIDEOS.length,
      source: "manual_config" 
    });
  } catch (error) {
    console.error("Erro geral na rota de API de estatisticas:", error);
    return NextResponse.json(
      { error: "Erro ao processar estatisticas." },
      { status: 500 }
    );
  }
}

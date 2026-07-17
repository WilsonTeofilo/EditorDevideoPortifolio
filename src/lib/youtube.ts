import { VIDEOS } from "@/constants";

interface YouTubeVideoStats {
  id: string;
  title: string;
  views: number;
  likes: number;
}

/**
 * Servico do YouTube que faz requisicoes na API oficial do Google.
 * Caso a API key nao esteja configurada, retorna valores mockados baseados nos dados reais de 2025.
 */
export async function fetchYouTubeStats(): Promise<YouTubeVideoStats[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const videoIds = VIDEOS.map((v) => v.id);

  // Fallbacks baseados nos dados fornecidos pelo usuario (Teofilo_dev)
  const defaultFallbacks: Record<string, { views: number; likes: number; title: string }> = {
    zz0SsmtewOU: {
      views: 73200,
      likes: 4500,
      title: "iPhone XR Ainda Vale a Pena ? Teste REAL!",
    },
    AdK2uJl7FbA: {
      views: 61120,
      likes: 4950,
      title: "5 Melhores Sistemas Operacionais GRATIS para PC Antigo (512 MB E 1GB RAM)",
    },
    ZgzvEKFVC1w: {
      views: 50000,
      likes: 3000,
      title: "Perdi MESES aprendendo programacao do JEITO ERRADO",
    },
  };

  if (!apiKey || apiKey === "YOUR_YOUTUBE_API_KEY_HERE") {
    console.warn("YouTube API Key nao encontrada. Retornando dados em fallback.");
    return VIDEOS.map((video) => ({
      id: video.id,
      title: defaultFallbacks[video.id]?.title || video.title,
      views: defaultFallbacks[video.id]?.views || 0,
      likes: defaultFallbacks[video.id]?.likes || 0,
    }));
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(",")}&key=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache por 1 hora no Next.js
    });

    if (!response.ok) {
      throw new Error(`Erro na API do YouTube: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items) {
      throw new Error("Resposta invalida da API do YouTube.");
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      views: parseInt(item.statistics.viewCount, 10) || 0,
      likes: parseInt(item.statistics.likeCount, 10) || 0,
    }));
  } catch (error) {
    console.error("Falha ao buscar estatisticas do YouTube:", error);
    // Retorna fallback em caso de erro na requisicao
    return VIDEOS.map((video) => ({
      id: video.id,
      title: defaultFallbacks[video.id]?.title || video.title,
      views: defaultFallbacks[video.id]?.views || 0,
      likes: defaultFallbacks[video.id]?.likes || 0,
    }));
  }
}

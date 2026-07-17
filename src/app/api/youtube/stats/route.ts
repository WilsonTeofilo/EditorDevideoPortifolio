import { NextResponse } from "next/server";
import { VIDEOS } from "@/constants";

export const revalidate = 3600; // API route cache de 1 hora

/**
 * Função utilitária para converter strings como "217k" ou "1.5m" em números inteiros.
 */
function parseAbbreviatedNumber(str: string): number {
  if (!str) return 0;
  
  const cleanStr = str.toLowerCase().trim();
  const num = parseFloat(cleanStr);
  
  if (isNaN(num)) return 0;
  
  if (cleanStr.includes('k')) {
    return Math.floor(num * 1000);
  }
  if (cleanStr.includes('m')) {
    return Math.floor(num * 1000000);
  }
  
  return Math.floor(num);
}

/**
 * Endpoint GET /api/youtube/stats
 * Não usa mais banco de dados ou API Key do Google.
 * Faz scrape das badges públicas do YouTube (igual ao README do GitHub).
 */
export async function GET() {
  try {
    const CHANNEL_ID = "UCtoTrMdOt7GnX8YqPa5OpFQ";
    
    // 1. Fetch das Badges
    const [viewsRes, subsRes] = await Promise.all([
      fetch(`https://custom-icon-badges.demolab.com/youtube/channel/views/${CHANNEL_ID}`),
      fetch(`https://custom-icon-badges.demolab.com/youtube/channel/subscribers/${CHANNEL_ID}`)
    ]);

    if (!viewsRes.ok || !subsRes.ok) {
      throw new Error("Falha ao comunicar com a API de badges.");
    }

    const viewsSvg = await viewsRes.text();
    const subsSvg = await subsRes.text();

    // 2. Extração dos Valores via Regex (procurando pela aria-label="Views: 217k")
    const viewsMatch = viewsSvg.match(/aria-label=".*?: (.*?)"/);
    const subsMatch = subsSvg.match(/aria-label=".*?: (.*?)"/);

    const rawViews = viewsMatch ? viewsMatch[1] : "0";
    const rawSubs = subsMatch ? subsMatch[1] : "0";

    // 3. Conversão para números absolutos
    const views = parseAbbreviatedNumber(rawViews);
    const subs = parseAbbreviatedNumber(rawSubs);

    return NextResponse.json({ 
      views, 
      subs, 
      videosCount: VIDEOS.length,
      source: "badge_scraper" 
    });
  } catch (error) {
    console.error("Erro geral na rota de API de estatisticas:", error);
    return NextResponse.json(
      { error: "Erro ao processar estatisticas." },
      { status: 500 }
    );
  }
}

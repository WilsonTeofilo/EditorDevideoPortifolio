"use client";

import { useEffect, useState } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Loader2 } from "lucide-react";

import { useYoutubeStats } from "@/hooks/use-youtube-stats";

/**
 * Secao Estatisticas: contadores animados de views, likes e videos.
 * Busca dados dinamicamente do back-end (/api/youtube/stats) que possui cache no Neon DB.
 * Emojis permitidos nesta secao conforme regra do projeto.
 */
export default function StatsSection() {
  const { stats, loading, error } = useYoutubeStats();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-warm-gray">
        <Loader2 className="animate-spin text-sage mb-2" size={24} />
        <span className="text-xs" style={{ fontFamily: "var(--font-retro)" }}>Carregando metricas do YouTube...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 
        className="text-2xl font-bold text-sage mb-6"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Estatisticas Acumuladas 📊
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-5 bg-card win98-border-inset">
          <div 
            className="text-3xl font-bold text-charcoal tracking-wider"
            style={{ fontFamily: "var(--font-retro)" }}
          >
            {stats && <AnimatedCounter target={stats.views} />}
          </div>
          <p className="text-warm-gray text-xs mt-2 font-bold">
            Views Totais 👁️
          </p>
        </div>
        <div className="text-center p-5 bg-card win98-border-inset">
          <div 
            className="text-3xl font-bold text-charcoal tracking-wider"
            style={{ fontFamily: "var(--font-retro)" }}
          >
            {stats && <AnimatedCounter target={stats.likes} />}
          </div>
          <p className="text-warm-gray text-xs mt-2 font-bold">
            Likes Totais 👍
          </p>
        </div>
        <div className="text-center p-5 bg-card win98-border-inset">
          <div 
            className="text-3xl font-bold text-charcoal tracking-wider"
            style={{ fontFamily: "var(--font-retro)" }}
          >
            {stats && <AnimatedCounter target={stats.videosCount} duration={500} />}
          </div>
          <p className="text-warm-gray text-xs mt-2 font-bold">
            Videos Editados 🎬
          </p>
        </div>
      </div>
      <div className="mt-6 p-2 bg-paper win98-border flex justify-between items-center text-[10px] text-warm-gray">
        <span style={{ fontFamily: "var(--font-retro)" }}>
          {stats ? `Dados via ${stats.source === "db_cache" || stats.source === "refreshed_db" ? "Neon DB ⚡" : "API Fallback 🛡️"}` : "Aguardando dados..."}
        </span>
        {error && (
          <span className="text-red-500 font-bold" style={{ fontFamily: "var(--font-retro)" }}>
            * Offline Mode ({error})
          </span>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import type { StatsData } from "@/types";

/**
 * Data Layer (Clean Architecture):
 * Isola a lógica de requisição (fetch) e controle de estado de loading/erro
 * para o endpoint de estatísticas do YouTube.
 */
export function useYoutubeStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const response = await fetch("/api/youtube/stats");
        if (!response.ok) {
          throw new Error("Falha ao carregar dados do endpoint.");
        }
        
        const data: StatsData = await response.json();
        
        if (isMounted) {
          setStats(data);
          setError(null);
        }
      } catch (err: any) {
        console.error("[Data Layer] Falha ao buscar métricas:", err);
        if (isMounted) {
          setError(err.message || "Erro desconhecido");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, loading, error };
}

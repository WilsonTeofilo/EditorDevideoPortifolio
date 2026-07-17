"use client";

import { useState, useCallback } from "react";
import type { WindowStates } from "@/types";

/**
 * Hook que gerencia o estado de abertura/fechamento das janelas.
 * Centraliza a lógica em um único lugar reutilizável.
 */
const DEFAULT_STATE: WindowStates = {
  hero: true,
  about: false,
  services: false,
  portfolio: false,
  stats: false,
  contact: false,
};

export function useWindowManager(initialState: WindowStates = DEFAULT_STATE) {
  const [windows, setWindows] = useState<WindowStates>(initialState);

  const toggle = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: !prev[id as keyof WindowStates],
    }));
  }, []);

  const close = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: false,
    }));
  }, []);

  const open = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: true,
    }));
  }, []);

  return { windows, toggle, close, open };
}

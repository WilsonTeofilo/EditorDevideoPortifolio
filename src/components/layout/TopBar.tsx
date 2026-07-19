"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

interface TopBarProps {
  windows: NavItem[];
  onToggleWindow: (id: string) => void;
}

/**
 * Barra superior Y2K com navegação integrada e toggle de tema escuro.
 * Nenhuma cor hardcoded — tudo usa var(--theme-*).
 */
export default function TopBar({ windows, onToggleWindow }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 win98-border rounded-none">
      {/* Sistema de título — gradiente via variáveis CSS dinâmicas */}
      <div
        className="flex items-center justify-between px-3 py-1"
        style={{
          background:
            "linear-gradient(90deg, var(--theme-win-title) 0%, var(--theme-sage) 50%, var(--theme-mint) 100%)",
        }}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/Nara_Symbol.webp"
            alt="Naraa_Edx mascote"
            width={24}
            height={24}
            className="rounded-sm border border-white/30"
          />
          <span
            className="font-bold text-sm text-white tracking-wider"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Naraa_Edx
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão de alternar tema */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="win98-btn flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold"
              style={{ fontFamily: "var(--font-retro)" }}
              title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            >
              {theme === "dark" ? "☀ LIGHT" : "🌙 DARK"}
            </button>
          )}
          <div
            className="text-white/90 text-sm tracking-wider"
            style={{ fontFamily: "var(--font-retro)" }}
          >
            {new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* Barra de navegação — desktop only */}
      <nav className="hidden md:flex items-center gap-1 px-2 py-1 bg-card border-t border-win-chrome">
        {windows.map((win) => (
          <motion.button
            key={win.id}
            onClick={() => onToggleWindow(win.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex items-center gap-1.5 px-3 py-1 text-xs rounded-none transition-colors
              ${
                win.isOpen
                  ? "win98-border-inset bg-paper text-charcoal font-bold"
                  : "win98-btn text-warm-gray hover:text-charcoal"
              }
            `}
          >
            <span className="text-sage">{win.icon}</span>
            <span>{win.title}</span>
          </motion.button>
        ))}
      </nav>
    </header>
  );
}

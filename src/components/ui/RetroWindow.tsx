"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  id: string;
}

/**
 * Janela Y2K estilo Windows 98.
 * Todas as cores usam variáveis CSS dinâmicas (theme-aware).
 */
export default function RetroWindow({
  title,
  children,
  isOpen,
  onClose,
  className = "",
  id,
}: RetroWindowProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`win98-border rounded-sm overflow-hidden bg-card ${className}`}
        >
          {/* Barra de título Y2K — gradiente via variáveis CSS */}
          <div
            className="flex items-center justify-between px-2 py-1 select-none"
            style={{
              background: "linear-gradient(90deg, var(--theme-win-title) 0%, var(--theme-sage) 50%, var(--theme-mint) 100%)",
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-4 h-4 rounded-sm bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] text-white font-bold">L</span>
              </div>
              <span
                className="text-sm font-bold text-white truncate tracking-wide"
                style={{ fontFamily: "var(--font-retro)" }}
              >
                {title}
              </span>
            </div>

            {/* Botões de janela — quadrados Y2K */}
            <div className="flex items-center gap-[2px] flex-shrink-0">
              <button
                className="win98-btn text-xs leading-none w-5 h-5 flex items-center justify-center"
                aria-label="Minimizar"
              >
                _
              </button>
              <button
                className="win98-btn text-xs leading-none w-5 h-5 flex items-center justify-center"
                aria-label="Maximizar"
              >
                <span className="border border-charcoal w-2.5 h-2.5 block" />
              </button>
              <button
                onClick={onClose}
                className="win98-btn text-xs leading-none w-5 h-5 flex items-center justify-center font-bold hover:bg-blush transition-colors"
                aria-label="Fechar janela"
              >
                X
              </button>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="flex items-center gap-4 px-2 py-0.5 bg-card border-b border-win-chrome text-xs text-warm-gray">
            <span className="hover:text-charcoal cursor-default"><u>F</u>ile</span>
            <span className="hover:text-charcoal cursor-default"><u>E</u>dit</span>
            <span className="hover:text-charcoal cursor-default"><u>V</u>iew</span>
            <span className="hover:text-charcoal cursor-default"><u>H</u>elp</span>
          </div>

          {/* Conteúdo */}
          <div className="p-4 bg-paper">
            {children}
          </div>

          {/* Status Bar */}
          <div
            className="px-2 py-0.5 bg-card border-t border-win-chrome text-[10px] text-warm-gray win98-border-inset mx-1 mb-1"
            style={{ fontFamily: "var(--font-retro)" }}
          >
            Ready
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

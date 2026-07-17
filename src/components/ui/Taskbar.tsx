"use client";

import React from "react";
import { motion } from "framer-motion";

interface TaskbarWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  onToggleWindow: (id: string) => void;
}

/**
 * Taskbar: agora atua APENAS como dock de navegacao para MOBILE.
 * No desktop, a navegacao fica na TopBar.
 */
export default function Taskbar({ windows, onToggleWindow }: TaskbarProps) {
  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
        className="pointer-events-auto flex items-center justify-around w-full max-w-sm rounded-xl win98-border bg-card p-2 shadow-lg"
      >
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => onToggleWindow(win.id)}
            className={`
              relative flex flex-col items-center justify-center p-2 rounded-lg transition-colors
              ${win.isOpen ? "text-sage" : "text-warm-gray hover:bg-input"}
            `}
            title={win.title}
          >
            <span className={win.isOpen ? "scale-110 transition-transform" : ""}>
              {win.icon}
            </span>
            <span className="text-[10px] mt-1 font-bold" style={{ fontFamily: "var(--font-sans)" }}>
              {win.title}
            </span>
            {win.isOpen && (
              <motion.span
                layoutId={`dot-${win.id}`}
                className="absolute -top-1 right-2 h-2 w-2 rounded-full bg-gold shadow-sm"
              />
            )}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

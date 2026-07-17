"use client";

import { AnimatePresence, motion } from "framer-motion";

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

/**
 * Modal fullscreen para reproduzir vídeos do YouTube.
 * Aparece ao clicar em um card de vídeo no portfólio.
 */
export default function VideoModal({ videoId, onClose }: VideoModalProps) {
  if (!videoId) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="w-full max-w-4xl bg-win-chrome p-2 win98-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Barra de título do video */}
          <div className="flex items-center justify-between bg-win-title px-2 py-1 mb-2">
            <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "var(--font-retro)" }}>
              YouTube_Player.exe
            </span>
            <button
              onClick={onClose}
              className="win98-btn text-charcoal font-bold w-5 h-5 flex items-center justify-center leading-none"
            >
              X
            </button>
          </div>
          
          <div className="aspect-video win98-border-inset bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
              title="Video player"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

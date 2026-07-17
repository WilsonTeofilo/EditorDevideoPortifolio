"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { VIDEOS } from "@/constants";

interface PortfolioSectionProps {
  onPlayVideo: (videoId: string) => void;
}

/**
 * Secao Portfolio: cards de video com thumbnails do YouTube.
 * Ao clicar, abre o modal de video.
 */
export default function PortfolioSection({ onPlayVideo }: PortfolioSectionProps) {
  return (
    <div className="p-4">
      <h2 
        className="text-2xl font-bold text-sage mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Trabalhos Editados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEOS.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="group relative bg-card p-2 win98-border shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => onPlayVideo(video.id)}
          >
            {/* Efeito polaroid / card vintage */}
            <div className="relative aspect-video bg-charcoal/90 win98-border-inset overflow-hidden mb-2">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                fill
                className="object-cover filter contrast-110 saturate-110 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-paper/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-win-btn win98-border flex items-center justify-center text-charcoal"
                >
                  <PlayCircle size={24} />
                </motion.div>
              </div>
            </div>
            <div className="px-1 pb-1">
              <h3 
                className="text-xs font-bold text-charcoal leading-tight line-clamp-2"
                style={{ fontFamily: "var(--font-retro)" }}
              >
                {video.title}
              </h3>
              <p className="text-[10px] text-warm-gray mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-sage rounded-full inline-block" />
                {video.channel}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

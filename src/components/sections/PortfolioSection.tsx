"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { VIDEOS } from "@/constants";

interface PortfolioSectionProps {
  onPlayVideo: (videoId: string) => void;
}

/**
 * Secao Portfolio: cards de video com thumbnails do YouTube.
 * Ao clicar, abre o modal de video.
 */
export default function PortfolioSection({ onPlayVideo }: PortfolioSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="p-4 relative">
      <h2 
        className="text-2xl font-bold text-sage mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Trabalhos Editados
      </h2>
      
      {/* Container Relativo para as setas */}
      <div className="relative group/carousel">
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
        {VIDEOS.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative bg-card p-2 win98-border shadow-md hover:scale-[1.02] transition-transform cursor-pointer flex flex-col"
            onClick={() => onPlayVideo(video.id)}
          >
            {/* Efeito polaroid / card vintage */}
            <div className="relative aspect-video bg-charcoal/90 win98-border-inset overflow-hidden mb-2 shrink-0">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                fill
                className="object-cover filter contrast-110 saturate-110 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-paper/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-win-btn win98-border flex items-center justify-center text-charcoal shadow-xl"
                >
                  <PlayCircle size={24} className="ml-1" />
                </motion.div>
              </div>
            </div>
            <div className="px-1 pb-1 flex-1 flex flex-col justify-between">
              <h3 
                className="text-xs font-bold text-charcoal leading-tight line-clamp-2"
                style={{ fontFamily: "var(--font-retro)" }}
                title={video.title}
              >
                {video.title}
              </h3>
              <p className="text-[10px] text-warm-gray mt-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-sage rounded-full inline-block shrink-0" />
                <span className="truncate">{video.channel}</span>
              </p>
            </div>
          </motion.div>
        ))}
        </div>

        {/* Botões de Navegação */}
        <AnimatePresence>
          {showLeft && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => scroll("left")}
              className="absolute left-[-16px] top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-win-btn win98-border flex items-center justify-center text-charcoal shadow-xl hover:bg-sage transition-colors opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronLeft size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRight && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => scroll("right")}
              className="absolute right-[-16px] top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-win-btn win98-border flex items-center justify-center text-charcoal shadow-xl hover:bg-sage transition-colors opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronRight size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

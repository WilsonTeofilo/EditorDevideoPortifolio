"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/constants";
import { SITE_CONTENT } from "@/config/content";

/**
 * Secao Timeline: jornada profissional de 2016 ate 2025.
 * Emojis permitidos nesta secao conforme regra do projeto.
 */
export default function TimelineSection() {
  return (
    <div className="p-4">
      <h2 
        className="text-2xl font-bold text-sage mb-6"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {SITE_CONTENT.timeline.title}
      </h2>

      <div className="bg-paper p-4 win98-border-inset mb-8 relative">
        <div className="absolute top-0 right-0 w-8 h-8 bg-gold opacity-20 transform rotate-45 translate-x-4 -translate-y-4" />
        <p className="text-charcoal/80 text-sm leading-relaxed">
          {SITE_CONTENT.timeline.intro}
        </p>
      </div>

      <div className="relative border-l-2 border-sage/40 pl-6 space-y-8">
        {TIMELINE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="relative"
          >
            {/* Ponto na timeline estilo Y2K window button */}
            <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 bg-win-btn win98-border shadow-sm flex items-center justify-center">
              <div className="w-1 h-1 bg-charcoal" />
            </div>
            
            <div className="bg-card p-3 win98-border-inset">
              <span 
                className="text-charcoal font-bold tracking-wider block mb-1"
                style={{ fontFamily: "var(--font-retro)" }}
              >
                &gt; {item.year}
              </span>
              <p className="text-warm-gray text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 bg-sage/10 p-4 win98-border border-sage/30 flex gap-3 items-start">
        <span className="text-2xl">💡</span>
        <p className="text-charcoal text-sm font-semibold italic">
          {SITE_CONTENT.timeline.outro}
        </p>
      </div>
    </div>
  );
}

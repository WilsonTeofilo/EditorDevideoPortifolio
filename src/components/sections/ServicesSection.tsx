"use client";

import { motion } from "framer-motion";
import { PlayCircle, Briefcase } from "lucide-react";
import { SERVICES, SKILLS } from "@/constants";

/**
 * Secao Servicos: lista de servicos oferecidos e habilidades.
 */
export default function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    PlayCircle: <PlayCircle size={20} />,
    Briefcase: <Briefcase size={20} />,
  };

  return (
    <div className="p-4">
      <div className="flex items-end justify-between mb-6">
        <h2 
          className="text-2xl font-bold text-sage"
          style={{ fontFamily: "var(--font-display)" }}
        >
          O que eu faco
        </h2>
        <p 
          className="text-warm-gray text-xs bg-input px-2 py-1 win98-border-inset hidden sm:block"
          style={{ fontFamily: "var(--font-retro)" }}
        >
          Nivel: Basico - Intermediario
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {SERVICES.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="p-4 bg-card win98-border-inset relative group"
          >
            {/* Elemento de washi tape decorativo */}
            <div className="absolute -top-2 -right-2 w-8 h-3 bg-mint/60 rotate-45 backdrop-blur-sm z-10" />

            <div className="flex items-center gap-2 mb-3 text-sage">
              {iconMap[service.iconName]}
              <h3 
                className="text-charcoal font-bold tracking-wide"
                style={{ fontFamily: "var(--font-retro)" }}
              >
                {service.title}
              </h3>
            </div>
            <p className="text-warm-gray text-xs leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-paper p-3 win98-border">
        <div className="flex items-center gap-2 mb-2 border-b border-win-chrome pb-1">
          <span className="text-gold">★</span>
          <span className="text-charcoal text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Habilidades Tecnicas
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {SKILLS.map((skill, i) => (
            <span 
              key={i}
              className="text-charcoal bg-card px-2 py-1 text-xs win98-border-inset"
              style={{ fontFamily: "var(--font-retro)" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

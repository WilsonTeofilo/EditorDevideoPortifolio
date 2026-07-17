"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Mail, Briefcase } from "lucide-react";
import XIcon from "@/icons/XIcon";
import { SOCIAL_LINKS } from "@/constants";
import { SITE_CONTENT } from "@/config/content";

/**
 * Seção Hero: apresentação principal com foto, título e links sociais.
 */
export default function HeroSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Instagram: <Instagram size={16} />,
    XIcon: <XIcon size={16} />,
    Mail: <Mail size={16} />,
    Briefcase: <Briefcase size={16} />,
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="relative flex-shrink-0"
      >
        {/* Adesivo decorativo simulado */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-lavender/40 rotate-12 rounded-sm backdrop-blur-sm shadow-sm z-10" />
        
        <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden win98-border-inset bg-card p-2">
          <Image
            src="/perfikl.png"
            alt="Lokitta Edx"
            width={224}
            height={224}
            className="w-full h-full object-cover object-top filter contrast-[0.95] sepia-[0.1]"
            priority
          />
        </div>
        <div 
          className="absolute -bottom-3 -right-3 bg-blush text-charcoal text-xs font-bold px-3 py-1 win98-border transform rotate-3"
          style={{ fontFamily: "var(--font-retro)" }}
        >
          {SITE_CONTENT.status}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1 text-center md:text-left"
      >
        <h1 
          className="text-3xl md:text-4xl font-bold text-sage tracking-tight mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {SITE_CONTENT.title}
        </h1>
        <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
          {SITE_CONTENT.hero.description}
        </p>
        
        <div className="bg-input p-3 win98-border-inset mb-4 relative">
          <div className="absolute -left-2 top-2 w-4 h-4 bg-lavender rounded-full opacity-50 mix-blend-multiply" />
          <p className="text-charcoal/70 text-xs italic">
            {SITE_CONTENT.hero.quote}
          </p>
        </div>

        <div className="flex gap-3 mt-4 justify-center md:justify-start">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target={link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="flex items-center gap-2 px-3 py-1.5 win98-btn text-charcoal hover:bg-input transition-colors group"
            >
              <span className="text-sage group-hover:text-gold transition-colors">
                {iconMap[link.iconName]}
              </span>
              <span style={{ fontFamily: "var(--font-retro)" }}>{link.platform}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

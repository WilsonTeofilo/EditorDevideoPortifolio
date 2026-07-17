"use client";

import { Instagram, Mail, ExternalLink, Briefcase } from "lucide-react";
import { SITE_CONTENT } from "@/config/content";
import XIcon from "@/icons/XIcon";
import { SOCIAL_LINKS } from "@/constants";

/**
 * Secao Contato: lista de canais de comunicacao.
 */
export default function ContactSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Instagram: <Instagram size={20} className="text-charcoal group-hover:text-sage transition-colors" />,
    XIcon: <span className="text-charcoal group-hover:text-sage transition-colors"><XIcon size={20} /></span>,
    Mail: <Mail size={20} className="text-charcoal group-hover:text-sage transition-colors" />,
    Briefcase: <Briefcase size={20} className="text-charcoal group-hover:text-sage transition-colors" />,
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2 border-b-2 border-sage/30 pb-2">
        <span className="text-2xl">💌</span>
        <h2 
          className="text-2xl font-bold text-sage"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {SITE_CONTENT.contact.title}
        </h2>
      </div>
      
      <p className="text-charcoal/80 text-sm mb-6 bg-input p-3 win98-border-inset">
        {SITE_CONTENT.contact.description}
      </p>

      <div className="flex flex-col gap-3">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="flex items-center gap-3 p-3 bg-card win98-btn hover:bg-input transition-all group"
          >
            {iconMap[link.iconName]}
            <div>
              <p 
                className="text-sm font-bold text-charcoal"
                style={{ fontFamily: "var(--font-retro)" }}
              >
                {link.platform}
              </p>
              <p className="text-xs text-warm-gray">{link.handle}</p>
            </div>
            <ExternalLink size={14} className="ml-auto text-warm-gray/50 group-hover:text-sage" />
          </a>
        ))}
      </div>
    </div>
  );
}

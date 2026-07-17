"use client";

import { useState, useEffect } from "react";
import {
  User,
  Clock,
  Briefcase,
  PlayCircle,
  BarChart3,
  Mail,
} from "lucide-react";

import PaperBackground from "@/components/ui/PaperBackground";
import RetroWindow from "@/components/ui/RetroWindow";
import Taskbar from "@/components/ui/Taskbar";
import VideoModal from "@/components/ui/VideoModal";
import TopBar from "@/components/layout/TopBar";

import HeroSection from "@/components/sections/HeroSection";
import TimelineSection from "@/components/sections/TimelineSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import StatsSection from "@/components/sections/StatsSection";
import ContactSection from "@/components/sections/ContactSection";

import { useWindowManager } from "@/hooks/use-window-manager";
import { useScrollNavigation } from "@/hooks/use-scroll-navigation";
import type { TaskbarItem } from "@/types";
import { SITE_CONTENT } from "@/config/content";

/**
 * DesktopLayout: componente orquestrador que monta o "desktop" retro.
 * Clean Architecture: Sem lógicas complexas aqui, apenas injeção de dependências.
 */
export default function DesktopLayout() {
  const { windows, toggle, close, open } = useWindowManager();
  const { windowOrder } = useScrollNavigation(windows, open);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  /* Hook encapsula a complexidade do scroll */

  /* Definição dos itens da Taskbar */
  const taskbarItems: TaskbarItem[] = [
    { id: "hero", title: "Inicio", icon: <User size={22} />, isOpen: windows.hero },
    { id: "about", title: "Sobre", icon: <Clock size={22} />, isOpen: windows.about },
    { id: "services", title: "Servicos", icon: <Briefcase size={22} />, isOpen: windows.services },
    { id: "portfolio", title: "Portfolio", icon: <PlayCircle size={22} />, isOpen: windows.portfolio },
    { id: "stats", title: "Estatisticas", icon: <BarChart3 size={22} />, isOpen: windows.stats },
    { id: "contact", title: "Contato", icon: <Mail size={22} />, isOpen: windows.contact },
  ];

  return (
    <>
      <PaperBackground />
      <TopBar windows={taskbarItems} onToggleWindow={toggle} />

      {/* Area principal com todas as janelas */}
      <main className="relative z-10 min-h-screen pt-20 pb-24 px-4 md:px-8 flex flex-col gap-6">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          <RetroWindow id="hero" title={SITE_CONTENT.windows.hero.title} isOpen={windows.hero} onClose={() => close("hero")} className="w-full max-w-3xl mx-auto">
            <HeroSection />
          </RetroWindow>

          <RetroWindow id="about" title={SITE_CONTENT.windows.about.title} isOpen={windows.about} onClose={() => close("about")} className="w-full max-w-3xl mx-auto">
            <TimelineSection />
          </RetroWindow>

          <RetroWindow id="services" title={SITE_CONTENT.windows.services.title} isOpen={windows.services} onClose={() => close("services")} className="w-full max-w-3xl mx-auto">
            <ServicesSection />
          </RetroWindow>

          <RetroWindow id="portfolio" title={SITE_CONTENT.windows.portfolio.title} isOpen={windows.portfolio} onClose={() => close("portfolio")} className="w-full max-w-4xl mx-auto">
            <PortfolioSection onPlayVideo={setActiveVideo} />
          </RetroWindow>

          <RetroWindow id="stats" title={SITE_CONTENT.windows.stats.title} isOpen={windows.stats} onClose={() => close("stats")} className="w-full max-w-2xl mx-auto">
            <StatsSection />
          </RetroWindow>

          <RetroWindow id="contact" title={SITE_CONTENT.windows.contact.title} isOpen={windows.contact} onClose={() => close("contact")} className="w-full max-w-lg mx-auto">
            <ContactSection />
          </RetroWindow>
          
          {/* Scroll Indicator (Opcional, apenas quando tem aba fechada) */}
          {windowOrder.some((id) => !windows[id as keyof typeof windows]) && (
            <div className="text-center text-warm-gray/60 py-4 animate-pulse">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>
                Role para explorar ↓
              </span>
            </div>
          )}
        </div>
      </main>

      <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
      <Taskbar windows={taskbarItems} onToggleWindow={toggle} />
    </>
  );
}

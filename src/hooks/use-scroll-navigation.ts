"use client";

import { useEffect } from "react";
import type { WindowStates } from "@/types";

const WINDOW_ORDER = ["hero", "about", "services", "portfolio", "stats", "contact"];

/**
 * Clean Architecture:
 * Extrai a complexidade do cálculo matemático de rolagem (scroll/touch)
 * para fora do componente DesktopLayout.
 */
export function useScrollNavigation(
  windows: WindowStates, 
  open: (id: string) => void
) {
  useEffect(() => {
    let lastScrollTime = 0;
    
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 800) return;

      let isScrollingDown = false;

      if (e.type === "wheel") {
        isScrollingDown = (e as WheelEvent).deltaY > 0;
      }

      if (isScrollingDown) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const bodyHeight = document.body.offsetHeight;
        
        if (bodyHeight - scrollPosition < 100) {
          const nextWindow = WINDOW_ORDER.find((id) => !windows[id as keyof typeof windows]);
          
          if (nextWindow) {
            open(nextWindow);
            lastScrollTime = now;
            
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
              });
            }, 100);
          }
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const isScrollingDown = touchStartY > touchEndY + 50; 
      
      if (isScrollingDown) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const bodyHeight = document.body.offsetHeight;
        
        if (bodyHeight - scrollPosition < 100) {
          const nextWindow = WINDOW_ORDER.find((id) => !windows[id as keyof typeof windows]);
          if (nextWindow) {
            const now = Date.now();
            if (now - lastScrollTime > 800) {
              open(nextWindow);
              lastScrollTime = now;
              setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }, 100);
            }
          }
        }
      }
    };
    
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [windows, open]);

  return { windowOrder: WINDOW_ORDER };
}

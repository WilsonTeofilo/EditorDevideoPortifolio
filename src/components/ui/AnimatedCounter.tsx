"use client";

import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

/**
 * Componente que anima um número de 0 até o valor alvo.
 * Usado nas estatísticas acumuladas.
 */
export default function AnimatedCounter({
  target,
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count.toLocaleString("pt-BR")}</>;
}

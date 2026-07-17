"use client";

import { motion } from "framer-motion";

/**
 * Fundo de caderno com textura de papel pautado.
 * Bolinhas flutuantes e estrelinhas decorativas.
 * TODAS as cores usam var(--theme-*) para responder ao dark mode.
 */

const floatingDots = [
  { varColor: "--theme-lavender", size: 120, x: "10%",  y: "15%", delay: 0   },
  { varColor: "--theme-blush",    size: 90,  x: "75%",  y: "8%",  delay: 2   },
  { varColor: "--theme-mint",     size: 140, x: "85%",  y: "55%", delay: 1   },
  { varColor: "--theme-lavender", size: 100, x: "5%",   y: "70%", delay: 3   },
  { varColor: "--theme-blush",    size: 70,  x: "50%",  y: "85%", delay: 1.5 },
  { varColor: "--theme-sky",      size: 110, x: "30%",  y: "40%", delay: 2.5 },
];

const stars = [
  { x: "15%", y: "20%", size: 16, delay: 0,   rotation: 15  },
  { x: "80%", y: "12%", size: 12, delay: 1,   rotation: -10 },
  { x: "60%", y: "65%", size: 18, delay: 2,   rotation: 20  },
  { x: "25%", y: "80%", size: 14, delay: 0.5, rotation: -5  },
  { x: "90%", y: "75%", size: 10, delay: 1.5, rotation: 30  },
  { x: "45%", y: "35%", size: 13, delay: 3,   rotation: -20 },
];

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6z" />
    </svg>
  );
}

export default function PaperBackground() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden paper-bg"
      aria-hidden="true"
    >
      {/* Bolinhas difusas flutuantes — cor via CSS var para dark mode */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.x,
            top: dot.y,
            background: `radial-gradient(circle, var(${dot.varColor}) 0%, transparent 70%)`,
            opacity: 0.18,
          }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -8, 5, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 18 + i * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      {/* Estrelinhas decorativas — usam cor CSS herdada do tema */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-lavender"
          style={{
            left: star.x,
            top: star.y,
            rotate: `${star.rotation}deg`,
            opacity: 0.2,
          }}
          animate={{
            opacity: [0.12, 0.28, 0.12],
            scale: [1, 1.15, 1],
            rotate: [star.rotation, star.rotation + 10, star.rotation],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: star.delay,
          }}
        >
          <Star size={star.size} />
        </motion.div>
      ))}

      {/* Margem de caderno */}
      <div
        className="absolute top-0 bottom-0 left-[60px] w-[2px] hidden lg:block bg-blush opacity-20"
      />
    </div>
  );
}

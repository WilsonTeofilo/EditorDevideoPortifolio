'use client';

import { motion } from 'framer-motion';

const orbs = [
  {
    color: 'radial-gradient(circle, rgba(13,26,13,0.9) 0%, transparent 70%)',
    size: 'w-[700px] h-[700px]',
    position: 'top-[-10%] left-[-10%]',
    animate: {
      x: [0, 80, -40, 60, 0],
      y: [0, 60, 100, -30, 0],
      scale: [1, 1.15, 0.95, 1.1, 1],
    },
    duration: 22,
  },
  {
    color: 'radial-gradient(circle, rgba(212,255,0,0.07) 0%, rgba(212,255,0,0.02) 30%, transparent 70%)',
    size: 'w-[600px] h-[600px]',
    position: 'top-[20%] right-[-5%]',
    animate: {
      x: [0, -70, 30, -50, 0],
      y: [0, -40, 60, -80, 0],
      scale: [1, 1.08, 1.18, 0.92, 1],
    },
    duration: 25,
  },
  {
    color: 'radial-gradient(circle, rgba(10,5,15,0.85) 0%, rgba(10,5,15,0.3) 40%, transparent 70%)',
    size: 'w-[800px] h-[800px]',
    position: 'bottom-[-15%] left-[20%]',
    animate: {
      x: [0, 50, -60, 40, 0],
      y: [0, -70, -20, 50, 0],
      scale: [1, 1.12, 1.05, 1.18, 1],
    },
    duration: 20,
  },
  {
    color: 'radial-gradient(circle, rgba(17,17,17,0.8) 0%, rgba(17,17,17,0.2) 50%, transparent 70%)',
    size: 'w-[550px] h-[550px]',
    position: 'top-[50%] left-[50%]',
    animate: {
      x: [0, -90, 40, -30, 0],
      y: [0, 50, -60, 30, 0],
      scale: [1, 0.95, 1.1, 1.05, 1],
    },
    duration: 18,
  },
];

export default function MeshGradient() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ background: '#0a0a0a' }}
      aria-hidden="true"
    >
      {/* Gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.size} ${orb.position} rounded-full blur-3xl`}
          style={{ background: orb.color }}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Noise/grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}

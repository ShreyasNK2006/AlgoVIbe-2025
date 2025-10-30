'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface ParticleTrailProps {
  isActive: boolean;
  color?: string;
  count?: number;
}

export default function ParticleTrail({ isActive, color = '#6366f1', count = 20 }: ParticleTrailProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      setParticles(prev => {
        // Add new particles
        const newParticles: Particle[] = Array.from({ length: 2 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        }));

        // Update existing particles
        const updated = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0);

        return [...updated, ...newParticles].slice(-count);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, count]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: color,
            opacity: particle.life,
            boxShadow: `0 0 ${4 * particle.life}px ${color}`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      ))}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Home, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useSimulationStore } from '@/lib/store/simulation-store';

export function Navbar() {
  const { totalSatisfaction, totalDistance } = useSimulationStore();

  return (
    <nav className="h-16 border-b border-white/10 backdrop-blur-md bg-white/5">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Home className="w-6 h-6 text-accent-cyan" />
            <span className="text-xl font-heading font-bold text-gradient">
              Dunphy Dynamics
            </span>
          </motion.div>
        </Link>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-gold" />
            <div>
              <p className="text-xs text-gray-400">Satisfaction</p>
              <p className="text-sm font-heading font-bold text-accent-gold">
                {totalSatisfaction.toFixed(0)}%
              </p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/10" />
          
          <div>
            <p className="text-xs text-gray-400">Distance</p>
            <p className="text-sm font-heading font-bold text-white">
              {totalDistance.toFixed(1)} km
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

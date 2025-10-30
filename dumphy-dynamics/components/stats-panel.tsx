'use client';

import { motion } from 'framer-motion';
import { Activity, Zap, TrendingUp, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function StatsCard({ title, value, subtitle, icon, color }: StatsCardProps) {
  return (
    <motion.div
      className={`glass-card p-6 border-l-4 ${color} group hover:scale-105 transition-all cursor-pointer`}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">{title}</p>
          <motion.div 
            className="text-3xl font-bold text-slate-50"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {value}
          </motion.div>
        </div>
        <div className={`p-3 rounded-xl bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors`}>
          {icon}
        </div>
      </div>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </motion.div>
  );
}

interface StatsPanelProps {
  routeLength: number;
  totalDistance: number;
  timeElapsed: number;
  dpStates: number;
}

export default function StatsPanel({ routeLength, totalDistance, timeElapsed, dpStates }: StatsPanelProps) {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    const rafId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Route Efficiency"
        value={`${routeLength}`}
        subtitle="Total stops in optimal route"
        icon={<TrendingUp className="w-6 h-6 text-green-400" />}
        color="border-green-500"
      />
      
      <StatsCard
        title="Total Distance"
        value={`${totalDistance.toFixed(1)}km`}
        subtitle="Minimized travel distance"
        icon={<Activity className="w-6 h-6 text-blue-400" />}
        color="border-blue-500"
      />
      
      <StatsCard
        title="DP States"
        value={dpStates}
        subtitle="Dynamic programming iterations"
        icon={<Zap className="w-6 h-6 text-yellow-400" />}
        color="border-yellow-500"
      />
      
      <StatsCard
        title="Performance"
        value={`${fps}fps`}
        subtitle="Silky smooth animations"
        icon={<Clock className="w-6 h-6 text-purple-400" />}
        color="border-purple-500"
      />
    </div>
  );
}

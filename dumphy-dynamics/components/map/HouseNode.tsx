'use client';

import { motion } from 'framer-motion';
import { Home, Check, Lock } from 'lucide-react';
import { House } from '@/lib/types';
import { useState } from 'react';

interface HouseNodeProps {
  house: House;
}

export function HouseNode({ house }: HouseNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    available: '#00FFFF',
    visited: '#FFD93D',
    locked: '#FF4E50'
  };

  const color = statusColors[house.status];

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      {/* Pulsing ring for active houses */}
      {house.status === 'available' && (
        <motion.circle
          cx={house.coordinates.x}
          cy={house.coordinates.y}
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
          animate={{
            r: [20, 30, 20],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Main circle */}
      <motion.circle
        cx={house.coordinates.x}
        cy={house.coordinates.y}
        r="16"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.2 }}
      />

      {/* Icon */}
      <foreignObject
        x={house.coordinates.x - 8}
        y={house.coordinates.y - 8}
        width="16"
        height="16"
      >
        <div className="flex items-center justify-center w-full h-full">
          {house.status === 'visited' ? (
            <Check className="w-4 h-4" style={{ color }} />
          ) : house.status === 'locked' ? (
            <Lock className="w-4 h-4" style={{ color }} />
          ) : (
            <Home className="w-4 h-4" style={{ color }} />
          )}
        </div>
      </foreignObject>

      {/* Tooltip */}
      {isHovered && (
        <foreignObject
          x={house.coordinates.x - 80}
          y={house.coordinates.y - 90}
          width="160"
          height="80"
        >
          <motion.div
            className="glass-card p-3 shadow-xl shadow-cyan-500/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-heading font-bold text-white mb-1">
              {house.name}
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>⏰ {house.timeWindow.start}-{house.timeWindow.end} min</p>
              <p>⭐ Preference: {house.preference}/10</p>
              {house.description && (
                <p className="text-gray-500 text-[10px] mt-1">
                  {house.description.substring(0, 40)}...
                </p>
              )}
            </div>
          </motion.div>
        </foreignObject>
      )}

      {/* Label */}
      <text
        x={house.coordinates.x}
        y={house.coordinates.y + 30}
        textAnchor="middle"
        className="text-xs font-body fill-gray-300 pointer-events-none"
      >
        {house.name.split("'")[0]}&apos;s
      </text>
    </g>
  );
}

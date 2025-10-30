'use client';

import { motion } from 'framer-motion';
import { House } from '@/lib/types';
import { HouseNode } from './HouseNode';

interface MapCanvasProps {
  houses: House[];
}

export function MapCanvas({ houses }: MapCanvasProps) {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* LA City label */}
      <div className="absolute top-4 left-4 glass-card px-3 py-2">
        <p className="text-xs font-heading text-accent-cyan">Los Angeles Suburbs</p>
      </div>

      {/* Houses */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        {/* Connection lines (routes) */}
        <g className="opacity-30">
          {houses.map((house, i) =>
            houses.slice(i + 1).map((otherHouse, j) => (
              <line
                key={`${house.id}-${otherHouse.id}`}
                x1={house.coordinates.x}
                y1={house.coordinates.y}
                x2={otherHouse.coordinates.x}
                y2={otherHouse.coordinates.y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-600"
                strokeDasharray="4 4"
              />
            ))
          )}
        </g>

        {/* House nodes */}
        {houses.map((house) => (
          <HouseNode key={house.id} house={house} />
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass-card px-4 py-3 space-y-2">
        <p className="text-xs font-heading font-semibold text-gray-300 mb-2">Legend</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-cyan shadow-lg shadow-cyan-500/50" />
          <span className="text-xs text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-gold shadow-lg shadow-yellow-400/50" />
          <span className="text-xs text-gray-400">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
          <span className="text-xs text-gray-400">Locked</span>
        </div>
      </div>
    </div>
  );
}

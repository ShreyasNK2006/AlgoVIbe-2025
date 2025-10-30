'use client';

import { House } from '@/lib/types';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

interface TimelineProps {
  route: number[];
  houses: House[];
  currentPosition: number;
  currentTime: number;
}

export default function Timeline({ route, houses, currentPosition, currentTime }: TimelineProps) {
  if (route.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Clock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-300">
          Timeline will appear once route is calculated
        </p>
      </div>
    );
  }

  const calculateArrivalTime = (index: number): number => {
    // Simple calculation - in real implementation, this would come from the algorithm
    return 8 + index * 1.5; // Start at 8:00 AM, ~1.5 hours between stops
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-indigo-400" />
        <h3 className="font-heading text-xl font-bold text-slate-50">
          Route Timeline
        </h3>
        <div className="ml-auto text-sm text-slate-300">
          Current Time: {Math.floor(currentTime)}:
          {String(Math.round((currentTime % 1) * 60)).padStart(2, '0')}
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800" />
        
        {/* Active progress line */}
        <motion.div
          className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"
          initial={{ height: 0 }}
          animate={{ 
            height: `${(currentPosition / (route.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Timeline items */}
        <div className="space-y-6">
          {route.map((houseIdx, idx) => {
            const house = houses[houseIdx];
            const arrivalTime = calculateArrivalTime(idx);
            const isPast = idx < currentPosition;
            const isCurrent = idx === currentPosition;
            const isFuture = idx > currentPosition;

            return (
              <motion.div
                key={idx}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="relative z-10">
                  <motion.div
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center
                      ${isCurrent ? 'bg-indigo-500 shadow-glow' : ''}
                      ${isPast ? 'bg-purple-500' : ''}
                      ${isFuture ? 'bg-slate-800' : ''}
                      transition-all duration-300
                    `}
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MapPin className={`
                      w-8 h-8
                      ${isCurrent || isPast ? 'text-slate-50' : 'text-slate-500'}
                    `} />
                  </motion.div>
                </div>

                {/* House info card */}
                <motion.div
                  className={`
                    flex-1 p-4 rounded-lg border
                    ${isCurrent ? 'bg-indigo-500/20 border-indigo-500' : ''}
                    ${isPast ? 'bg-purple-500/10 border-purple-500/50' : ''}
                    ${isFuture ? 'bg-slate-900 border-slate-700' : ''}
                    transition-all duration-300
                  `}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`
                          text-xs font-mono px-2 py-1 rounded
                          ${isCurrent ? 'bg-indigo-500 text-white' : ''}
                          ${isPast ? 'bg-purple-500 text-white' : ''}
                          ${isFuture ? 'bg-slate-800 text-slate-500' : ''}
                        `}>
                          Stop #{idx + 1}
                        </span>
                        {isCurrent && (
                          <motion.span
                            className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/50"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            In Progress
                          </motion.span>
                        )}
                      </div>
                      
                      <h4 className="font-heading text-lg font-semibold text-slate-50">
                        {house.name}
                      </h4>
                      
                      <p className="text-sm text-slate-300 mt-1">
                        {house.description || house.id}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>ETA: {Math.floor(arrivalTime)}:
                            {String(Math.round((arrivalTime % 1) * 60)).padStart(2, '0')}
                          </span>
                        </div>
                        <div>
                          Window: {house.timeWindow.start}:00 - {house.timeWindow.end}:00
                        </div>
                        <div>
                          Priority: {house.preference}
                        </div>
                      </div>
                    </div>

                    {/* Priority badge */}
                    <div className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${house.preference >= 8 ? 'bg-red-500/20 text-red-400 border border-red-500/50' : ''}
                      ${house.preference >= 5 && house.preference < 8 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : ''}
                      ${house.preference < 5 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : ''}
                    `}>
                      {house.preference >= 8 ? 'High' : house.preference >= 5 ? 'Medium' : 'Low'}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-400">
            {route.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Total Stops</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {currentPosition + 1}
          </div>
          <div className="text-xs text-slate-500 mt-1">Current Stop</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-50">
            {route.length - currentPosition - 1}
          </div>
          <div className="text-xs text-slate-500 mt-1">Remaining</div>
        </div>
      </div>
    </div>
  );
}

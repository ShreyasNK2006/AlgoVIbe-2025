'use client';

import { DPStep } from '@/lib/types';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface DPVisualizerProps {
  steps: DPStep[];
  currentStep: number;
  houses: { owner: string }[];
}

export default function DPVisualizer({ steps, currentStep, houses }: DPVisualizerProps) {
  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Info className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-300">
          Run the simulation to see the Dynamic Programming states
        </p>
      </div>
    );
  }

  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];

  // Convert mask to binary representation
  const getBinaryMask = (mask: number, n: number) => {
    return mask.toString(2).padStart(n, '0').split('').reverse();
  };

  // Get house names from mask
  const getVisitedHouses = (mask: number, houses: { owner: string }[]) => {
    const binary = getBinaryMask(mask, houses.length);
    return binary
      .map((bit, idx) => (bit === '1' ? houses[idx].owner : null))
      .filter(Boolean);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold text-slate-50">
          DP State Visualization
        </h3>
        <div className="text-sm text-slate-300">
          Step {Math.min(currentStep + 1, steps.length)} / {steps.length}
        </div>
      </div>

      {/* Current State Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="p-4 rounded-lg bg-slate-900 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={currentStep}
        >
          <div className="text-xs text-slate-500 mb-1">State Mask</div>
          <div className="font-mono text-lg text-indigo-400">
            {currentStepData.mask.toString(2).padStart(houses.length, '0')}
          </div>
          <div className="text-xs text-slate-300 mt-2">
            Visited: {getVisitedHouses(currentStepData.mask, houses).length} houses
          </div>
        </motion.div>

        <motion.div
          className="p-4 rounded-lg bg-slate-900 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={`last-${currentStep}`}
        >
          <div className="text-xs text-slate-500 mb-1">Current House</div>
          <div className="text-lg font-semibold text-slate-50">
            {houses[currentStepData.last]?.owner || 'N/A'}
          </div>
          <div className="text-xs text-slate-300 mt-2">
            Index: {currentStepData.last}
          </div>
        </motion.div>

        <motion.div
          className="p-4 rounded-lg bg-slate-900 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          key={`score-${currentStep}`}
        >
          <div className="text-xs text-slate-500 mb-1">State Score</div>
          <div className="text-lg font-semibold text-purple-400">
            {currentStepData.score.toFixed(2)}
          </div>
          <div className="text-xs text-slate-300 mt-2">
            Cumulative value
          </div>
        </motion.div>
      </div>

      {/* Visited Houses */}
      <div>
        <div className="text-sm text-slate-500 mb-3">Houses in Current State:</div>
        <div className="flex flex-wrap gap-2">
          {getBinaryMask(currentStepData.mask, houses.length).map((bit, idx) => (
            <motion.div
              key={idx}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium
                ${bit === '1' 
                  ? 'bg-indigo-500/20 border border-indigo-500 text-indigo-400' 
                  : 'bg-slate-900 border border-slate-700 text-slate-500'
                }
                ${idx === currentStepData.last ? 'ring-2 ring-purple-500' : ''}
              `}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="font-heading">{houses[idx]?.owner || `H${idx}`}</div>
              <div className="text-xs opacity-75">Bit {idx}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transition Info */}
      {currentStepData.prev !== -1 && (
        <motion.div
          className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-sm text-slate-300 mb-2">Transition:</div>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-mono text-slate-50">
              {houses[currentStepData.prev]?.owner}
            </span>
            <span className="text-purple-400">→</span>
            <span className="font-mono text-slate-50">
              {houses[currentStepData.last]?.owner}
            </span>
            <span className="text-slate-500 ml-auto">
              Score: {currentStepData.score.toFixed(2)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

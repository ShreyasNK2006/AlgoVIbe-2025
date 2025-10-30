'use client';

import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';
import { useSimulationStore } from '@/lib/store/simulation-store';
import { useState } from 'react';

export function ControlPanel() {
  const {
    isRunning,
    isPaused,
    speed,
    algorithm,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    setSpeed,
    setAlgorithm
  } = useSimulationStore();

  const [numHouses, setNumHouses] = useState(8);
  const [travelSpeed, setTravelSpeed] = useState(45);

  return (
    <aside className="w-80 border-r border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-y-auto">
      <div className="mb-8">
        <h3 className="text-lg font-heading font-bold text-white mb-1">
          Control Panel
        </h3>
        <p className="text-sm text-gray-400">
          Configure and run the simulation
        </p>
      </div>

      {/* Playback Controls */}
      <div className="mb-8">
        <h4 className="text-sm font-heading font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          Playback
        </h4>
        
        <div className="flex gap-2">
          <motion.button
            onClick={startSimulation}
            disabled={isRunning && !isPaused}
            className={`flex-1 px-4 py-3 rounded-lg font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isRunning && !isPaused
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:shadow-lg hover:shadow-cyan-500/50'
            }`}
            whileHover={isRunning && !isPaused ? {} : { scale: 1.02 }}
            whileTap={isRunning && !isPaused ? {} : { scale: 0.98 }}
          >
            <Play className="w-4 h-4" />
            Play
          </motion.button>

          <motion.button
            onClick={pauseSimulation}
            disabled={!isRunning}
            className={`px-4 py-3 rounded-lg border transition-all ${
              !isRunning
                ? 'border-gray-700 text-gray-500 cursor-not-allowed'
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
            whileHover={!isRunning ? {} : { scale: 1.02 }}
            whileTap={!isRunning ? {} : { scale: 0.98 }}
          >
            <Pause className="w-4 h-4" />
          </motion.button>

          <motion.button
            onClick={resetSimulation}
            className="px-4 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="mb-8">
        <label className="block text-sm font-heading font-semibold text-gray-300 mb-3">
          Speed: {speed}x
        </label>
        <input
          type="range"
          min="0.5"
          max="4"
          step="0.5"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 rounded-full bg-gray-700 appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-cyan-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-cyan-500/50"
        />
      </div>

      {/* Algorithm Selection */}
      <div className="mb-8">
        <label className="block text-sm font-heading font-semibold text-gray-300 mb-3">
          Algorithm
        </label>
        <div className="space-y-2">
          {['dp', 'greedy', 'branch-bound'].map((algo) => (
            <label key={algo} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="algorithm"
                value={algo}
                checked={algorithm === algo}
                onChange={() => setAlgorithm(algo as any)}
                className="w-4 h-4 text-cyan-400 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-300 capitalize">
                {algo === 'dp' ? 'Dynamic Programming' : algo === 'greedy' ? 'Greedy Heuristic' : 'Branch & Bound'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-heading font-semibold text-gray-300 mb-3">
            Number of Houses: {numHouses}
          </label>
          <input
            type="range"
            min="5"
            max="12"
            value={numHouses}
            onChange={(e) => setNumHouses(parseInt(e.target.value))}
            className="w-full h-2 rounded-full bg-gray-700 appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-yellow-500
              [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-gray-300 mb-3">
            Travel Speed: {travelSpeed} km/h
          </label>
          <input
            type="range"
            min="30"
            max="60"
            value={travelSpeed}
            onChange={(e) => setTravelSpeed(parseInt(e.target.value))}
            className="w-full h-2 rounded-full bg-gray-700 appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-pink-500
              [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      {/* Status Info */}
      <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
        <p className="text-xs text-gray-400 mb-2">Status</p>
        <p className="text-sm font-body text-white">
          {isRunning ? (isPaused ? 'Paused' : 'Running...') : 'Ready'}
        </p>
      </div>
    </aside>
  );
}

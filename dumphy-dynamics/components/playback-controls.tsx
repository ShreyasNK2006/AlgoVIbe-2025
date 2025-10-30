'use client';

import { Play, Pause, RotateCcw, SkipForward, SkipBack, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
}

const SPEED_OPTIONS = [0.5, 1, 1.5, 2, 3];

export default function PlaybackControls({
  isPlaying,
  isPaused,
  speed,
  currentStep,
  totalSteps,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  onStepForward,
  onStepBackward,
}: PlaybackControlsProps) {
  
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Progress</span>
          <span className="font-mono text-slate-50">
            {currentStep} / {totalSteps} steps
          </span>
        </div>
        <div className="h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%]"
            initial={{ width: 0 }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: isPlaying ? ['0% 0%', '100% 0%'] : '0% 0%'
            }}
            transition={{ 
              width: { duration: 0.3 },
              backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
            }}
          />
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-3">
        {/* Step backward */}
        {onStepBackward && (
          <motion.button
            onClick={onStepBackward}
            disabled={currentStep === 0}
            className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipBack className="w-5 h-5 text-slate-50" />
          </motion.button>
        )}

        {/* Reset */}
        <motion.button
          onClick={onReset}
          className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500/50 transition-all group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5 text-slate-50 group-hover:rotate-180 transition-transform duration-500" />
        </motion.button>

        {/* Play/Pause */}
        <motion.button
          onClick={isPlaying ? onPause : onPlay}
          className="p-5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-glow hover:shadow-glow-lg transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 text-white fill-white" />
          ) : (
            <Play className="w-7 h-7 text-white fill-white ml-0.5" />
          )}
        </motion.button>

        {/* Step forward */}
        {onStepForward && (
          <motion.button
            onClick={onStepForward}
            disabled={currentStep >= totalSteps}
            className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward className="w-5 h-5 text-slate-50" />
          </motion.button>
        )}
      </div>

      {/* Speed controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Zap className="w-4 h-4" />
            <span>Playback Speed</span>
          </div>
          <span className="text-sm font-mono text-indigo-400">
            {speed}x
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {SPEED_OPTIONS.map((speedOption) => (
            <motion.button
              key={speedOption}
              onClick={() => onSpeedChange(speedOption)}
              className={`
                flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${speed === speedOption
                  ? 'bg-indigo-500 text-white shadow-glow'
                  : 'bg-slate-900 text-slate-500 border border-slate-700 hover:border-indigo-500/50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {speedOption}x
            </motion.button>
          ))}
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <motion.div
          className={`
            w-2 h-2 rounded-full
            ${isPlaying ? 'bg-green-500' : isPaused ? 'bg-yellow-500' : 'bg-gray-500'}
          `}
          animate={isPlaying ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-slate-500">
          {isPlaying ? 'Playing' : isPaused ? 'Paused' : 'Ready'}
        </span>
      </div>
    </div>
  );
}

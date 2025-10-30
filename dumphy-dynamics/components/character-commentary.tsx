'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { COMMENTARY } from '@/lib/constants';

interface CharacterCommentaryProps {
  currentPhase: 'planning' | 'executing' | 'completed';
  currentStep: number;
  totalSteps: number;
}

export default function CharacterCommentary({ 
  currentPhase, 
  currentStep, 
  totalSteps 
}: CharacterCommentaryProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentCommentary, setCurrentCommentary] = useState<{
    character: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    // Get commentary based on current phase
    const phaseCommentary = COMMENTARY[currentPhase];
    if (!phaseCommentary || phaseCommentary.length === 0) return;

    // Select commentary based on progress
    const progress = totalSteps > 0 ? currentStep / totalSteps : 0;
    const index = Math.min(
      Math.floor(progress * phaseCommentary.length),
      phaseCommentary.length - 1
    );

    setCurrentCommentary(phaseCommentary[index]);
    setIsVisible(true);
  }, [currentPhase, currentStep, totalSteps]);

  if (!currentCommentary) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 max-w-md"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="glass-card p-5 border-2 border-indigo-500/50 shadow-glow">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-heading font-semibold text-slate-50">
                    {currentCommentary.character}
                  </div>
                  <div className="text-xs text-slate-500 capitalize">
                    {currentPhase} Phase
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Commentary text */}
            <motion.p
              className="text-sm text-slate-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              "{currentCommentary.text}"
            </motion.p>

            {/* Progress indicator */}
            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: COMMENTARY[currentPhase]?.length || 0 }).map((_, i) => {
                const progress = totalSteps > 0 ? currentStep / totalSteps : 0;
                const activeIndex = Math.min(
                  Math.floor(progress * (COMMENTARY[currentPhase]?.length || 1)),
                  (COMMENTARY[currentPhase]?.length || 1) - 1
                );
                
                return (
                  <div
                    key={i}
                    className={`
                      h-1 flex-1 rounded-full transition-all duration-300
                      ${i <= activeIndex ? 'bg-indigo-500' : 'bg-slate-800'}
                    `}
                  />
                );
              })}
            </div>
          </div>

          {/* Tooltip arrow */}
          <div className="absolute -bottom-2 right-12 w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-indigo-500/50 transform rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

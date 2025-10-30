'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Volume2, VolumeX, Zap, Eye } from 'lucide-react';

interface SettingsPanelProps {
  onSoundToggle: (enabled: boolean) => void;
  onParticlesToggle: (enabled: boolean) => void;
  onAnimationsToggle: (enabled: boolean) => void;
}

export default function SettingsPanel({ 
  onSoundToggle, 
  onParticlesToggle, 
  onAnimationsToggle 
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const handleSoundToggle = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    onSoundToggle(newValue);
  };

  const handleParticlesToggle = () => {
    const newValue = !particlesEnabled;
    setParticlesEnabled(newValue);
    onParticlesToggle(newValue);
  };

  const handleAnimationsToggle = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    onAnimationsToggle(newValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glass-card p-4 mb-4 space-y-4 min-w-[250px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h3 className="text-sm font-semibold text-slate-50 mb-3">Preferences</h3>
            
            {/* Sound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
                <span className="text-sm text-slate-300">Sound Effects</span>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`
                  relative w-12 h-6 rounded-full transition-colors
                  ${soundEnabled ? 'bg-indigo-500' : 'bg-slate-700'}
                `}
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                  animate={{ x: soundEnabled ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Particles Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${particlesEnabled ? 'text-purple-400' : 'text-slate-500'}`} />
                <span className="text-sm text-slate-300">Particle Effects</span>
              </div>
              <button
                onClick={handleParticlesToggle}
                className={`
                  relative w-12 h-6 rounded-full transition-colors
                  ${particlesEnabled ? 'bg-purple-500' : 'bg-slate-700'}
                `}
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                  animate={{ x: particlesEnabled ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Animations Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className={`w-4 h-4 ${animationsEnabled ? 'text-green-400' : 'text-slate-500'}`} />
                <span className="text-sm text-slate-300">Animations</span>
              </div>
              <button
                onClick={handleAnimationsToggle}
                className={`
                  relative w-12 h-6 rounded-full transition-colors
                  ${animationsEnabled ? 'bg-green-500' : 'bg-slate-700'}
                `}
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                  animate={{ x: animationsEnabled ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card p-4 rounded-full shadow-glow hover:shadow-glow-lg transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Settings className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        </motion.div>
      </motion.button>
    </div>
  );
}

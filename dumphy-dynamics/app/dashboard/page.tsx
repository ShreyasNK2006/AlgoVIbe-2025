'use client';

import { useState, useEffect } from 'react';
import { useSimulationStore } from '@/lib/store/simulation-store';
import { TSPSolver } from '@/lib/algorithms/tsp-dp';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import PlaybackControls from '@/components/playback-controls';
import DPVisualizer from '@/components/dp-visualizer';
import Timeline from '@/components/timeline';
import CharacterCommentary from '@/components/character-commentary';
import StatsPanel from '@/components/stats-panel';
import SettingsPanel from '@/components/settings-panel';
import ExportPanel from '@/components/export-panel';
import { useSoundEffects } from '@/components/sound-manager';
import LoadingSpinner from '@/components/loading-spinner';
import { TSPResult, DPStep } from '@/lib/types';

// Dynamically import MapVisualization to avoid SSR issues with ReactFlow
const MapVisualization = dynamic(
  () => import('@/components/map-visualization'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export default function Dashboard() {
  const { 
    houses, 
    isRunning, 
    isPaused, 
    timeElapsed,
    startSimulation, 
    pauseSimulation, 
    resetSimulation 
  } = useSimulationStore();

  const [result, setResult] = useState<TSPResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [phase, setPhase] = useState<'planning' | 'executing' | 'completed'>('planning');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const { play } = useSoundEffects(soundEnabled);

  // Initialize TSP solver and calculate route
  useEffect(() => {
    if (houses.length > 0 && !result) {
      const solver = new TSPSolver({
        houses,
        startTime: 0, // 8:00 AM
        travelSpeed: 40 // km/h average city speed
      });
      const tspResult = solver.solve();
      setResult(tspResult);
    }
  }, [houses, result]);

  // Animation loop for playback
  useEffect(() => {
    if (!isRunning || !result) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= result.steps.length - 1) {
          pauseSimulation();
          setPhase('completed');
          play('complete'); // Play completion sound
          return prev;
        }
        const next = prev + 1;
        
        // Update phase based on progress
        const progress = next / result.steps.length;
        if (progress < 0.3) setPhase('planning');
        else if (progress < 0.9) setPhase('executing');
        else setPhase('completed');
        
        play('step'); // Play step sound
        return next;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, result, pauseSimulation, play]);

  const handleReset = () => {
    resetSimulation();
    setCurrentStep(0);
    setPhase('planning');
    play('click');
  };

  const handleStepForward = () => {
    if (result && currentStep < result.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      play('step');
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      play('step');
    }
  };

  const handlePlayPause = () => {
    if (isRunning) {
      pauseSimulation();
    } else {
      startSimulation();
    }
    play('click');
  };

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden relative">
      {/* Animated Grid Background */}
      <motion.div 
        className="fixed inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
      </motion.div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.nav 
          className="glass-card p-4 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-slate-50 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <div>
                <h1 className="text-2xl font-heading font-bold text-gradient flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                  </motion.div>
                  Phil&apos;s Command Center
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  TSP Dynamic Programming Visualization
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-300">
                {houses.length} houses • {result?.steps.length || 0} DP states
              </div>
              <ExportPanel
                route={result?.path || []}
                houses={houses}
                totalDistance={result?.totalDistance || 0}
                timeElapsed={timeElapsed}
              />
            </div>
          </div>
        </motion.nav>

        {/* Stats Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <StatsPanel
            routeLength={result?.path.length || 0}
            totalDistance={result?.totalDistance || 0}
            timeElapsed={timeElapsed}
            dpStates={result?.steps.length || 0}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Left column: Controls and DP Visualizer */}
          <div className="xl:col-span-1 space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <PlaybackControls
                isPlaying={isRunning}
                isPaused={isPaused}
                speed={speed}
                currentStep={currentStep}
                totalSteps={result?.steps.length || 0}
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                onReset={handleReset}
                onSpeedChange={(s) => { setSpeed(s); play('click'); }}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <DPVisualizer
                steps={result?.steps || []}
                currentStep={currentStep}
                houses={houses.map(h => ({ owner: h.name }))}
              />
            </motion.div>
          </div>

          {/* Right column: Map Visualization */}
          <motion.div 
            className="xl:col-span-2"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MapVisualization
              houses={houses}
              route={result?.path || []}
              currentPosition={Math.min(
                currentStep, 
                (result?.path.length || 1) - 1
              )}
              isPlaying={isRunning}
            />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Timeline
            route={result?.path || []}
            houses={houses}
            currentPosition={Math.min(
              currentStep,
              (result?.path.length || 1) - 1
            )}
            currentTime={8 + timeElapsed / 60}
          />
        </motion.div>

        {/* Character Commentary */}
        <CharacterCommentary
          currentPhase={phase}
          currentStep={currentStep}
          totalSteps={result?.steps.length || 0}
        />

        {/* Settings Panel */}
        <SettingsPanel
          onSoundToggle={setSoundEnabled}
          onParticlesToggle={setParticlesEnabled}
          onAnimationsToggle={setAnimationsEnabled}
        />
      </div>
    </div>
  );
}

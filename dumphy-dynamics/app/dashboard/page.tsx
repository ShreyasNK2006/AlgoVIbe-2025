'use client';

import { useState, useEffect } from 'react';
import { useSimulationStore } from '@/lib/store/simulation-store';
import { TSPSolver } from '@/lib/algorithms/tsp-dp';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PlaybackControls from '@/components/playback-controls';
import DPVisualizer from '@/components/dp-visualizer';
import Timeline from '@/components/timeline';
import CharacterCommentary from '@/components/character-commentary';
import { TSPResult, DPStep } from '@/lib/types';

// Dynamically import MapVisualization to avoid SSR issues with ReactFlow
const MapVisualization = dynamic(
  () => import('@/components/map-visualization'),
  { ssr: false }
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
          return prev;
        }
        const next = prev + 1;
        
        // Update phase based on progress
        const progress = next / result.steps.length;
        if (progress < 0.3) setPhase('planning');
        else if (progress < 0.9) setPhase('executing');
        else setPhase('completed');
        
        return next;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, result, pauseSimulation]);

  const handleReset = () => {
    resetSimulation();
    setCurrentStep(0);
    setPhase('planning');
  };

  const handleStepForward = () => {
    if (result && currentStep < result.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <nav className="glass-card p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-50" />
            </Link>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gradient flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                Phil&apos;s Command Center
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                TSP Dynamic Programming Visualization
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-300">
            {houses.length} houses • {result?.steps.length || 0} DP states
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column: Controls and DP Visualizer */}
        <div className="xl:col-span-1 space-y-6">
          <PlaybackControls
            isPlaying={isRunning}
            isPaused={isPaused}
            speed={speed}
            currentStep={currentStep}
            totalSteps={result?.steps.length || 0}
            onPlay={startSimulation}
            onPause={pauseSimulation}
            onReset={handleReset}
            onSpeedChange={setSpeed}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
          />

          <DPVisualizer
            steps={result?.steps || []}
            currentStep={currentStep}
            houses={houses.map(h => ({ owner: h.name }))}
          />
        </div>

        {/* Right column: Map Visualization */}
        <div className="xl:col-span-2">
          <MapVisualization
            houses={houses}
            route={result?.path || []}
            currentPosition={Math.min(
              currentStep, 
              (result?.path.length || 1) - 1
            )}
            isPlaying={isRunning}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <Timeline
          route={result?.path || []}
          houses={houses}
          currentPosition={Math.min(
            currentStep,
            (result?.path.length || 1) - 1
          )}
          currentTime={8 + timeElapsed / 60}
        />
      </div>

      {/* Character Commentary */}
      <CharacterCommentary
        currentPhase={phase}
        currentStep={currentStep}
        totalSteps={result?.steps.length || 0}
      />
    </div>
  );
}

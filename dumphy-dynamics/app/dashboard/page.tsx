'use client';

import { motion } from 'framer-motion';
import { useSimulationStore } from '@/lib/store/simulation-store';
import { MapCanvas } from '@/components/map/MapCanvas';
import { ControlPanel } from '@/components/controls/ControlPanel';
import { Navbar } from '@/components/layout/Navbar';
import { pageVariants } from '@/lib/animations';

export default function DashboardPage() {
  const { houses, isRunning } = useSimulationStore();

  return (
    <motion.div
      className="min-h-screen bg-bg-primary"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Control Panel - Sidebar */}
        <ControlPanel />

        {/* Main Content - Map Visualization */}
        <main className="flex-1 p-8">
          <div className="h-full glass-card p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-heading font-bold text-white mb-2">
                Phil&apos;s Command Center
              </h2>
              <p className="text-gray-400 font-body text-sm">
                {isRunning ? 'Optimizing route...' : 'Ready to optimize'}
              </p>
            </div>
            
            <MapCanvas houses={houses} />
          </div>
        </main>
      </div>
    </motion.div>
  );
}

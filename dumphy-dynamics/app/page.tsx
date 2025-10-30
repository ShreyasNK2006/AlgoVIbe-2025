'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <motion.div
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-300">Modern Family × Data Structures</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-center mb-4 text-gradient" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Dunphy Dynamics
        </h1>

        <p className="text-xl md:text-2xl font-normal text-center text-gray-400 mb-12 max-w-2xl" style={{ fontFamily: 'var(--font-family-heading)' }}>
          The Realty Route Reimagined
        </p>

        <p className="text-base md:text-lg text-center text-gray-300 mb-12 max-w-xl">
          Help Phil Dunphy optimize his perfect property showing route using dynamic programming and time window constraints.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-4xl">
          <div className="glass-card p-4">
            <p className="text-sm text-yellow-300 mb-1">Claire says:</p>
            <p className="text-xs text-gray-300">&quot;Don&apos;t mess this up again, Phil!&quot;</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm text-cyan-300 mb-1">Luke says:</p>
            <p className="text-xs text-gray-300">&quot;Dad&apos;s doing math? This should be interesting...&quot;</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm text-pink-300 mb-1">Haley says:</p>
            <p className="text-xs text-gray-300">&quot;Just use GPS like a normal person 🙄&quot;</p>
          </div>
        </div>

        <Link href="/dashboard">
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-xl transition-all flex items-center gap-3" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Start Optimization
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>

        <p className="mt-16 text-sm text-gray-500 text-center">
          A cinematic DSA visualization • Built with Next.js & Framer Motion
        </p>
      </main>
    </div>
  );
}

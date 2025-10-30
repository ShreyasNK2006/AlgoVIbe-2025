'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { pageVariants, floatVariants } from '@/lib/animations';

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-magenta/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {/* Logo/Badge */}
        <motion.div
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass-card"
          variants={floatVariants}
          animate="float"
        >
          <Sparkles className="w-4 h-4 text-accent-cyan" />
          <span className="text-sm font-body text-gray-300">
            Modern Family × Data Structures
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-heading font-black text-center mb-4 text-gradient"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Dunphy Dynamics
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-heading font-normal text-center text-gray-400 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          The Realty Route Reimagined
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg font-body text-center text-gray-300 mb-12 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Help Phil Dunphy optimize his perfect property showing route using
          dynamic programming and time window constraints. Experience the TSP
          algorithm like never before!
        </motion.p>

        {/* Sticky notes (Modern Family quotes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-4xl">
          <motion.div
            className="glass-card p-4 transform rotate-[-2deg] hover:rotate-0 transition-transform"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
          >
            <p className="text-sm font-body text-yellow-300 mb-1">Claire says:</p>
            <p className="text-xs text-gray-300">
              &quot;Don&apos;t mess this up again, Phil!&quot;
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-4 transform rotate-[1deg] hover:rotate-0 transition-transform"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
          >
            <p className="text-sm font-body text-cyan-300 mb-1">Luke says:</p>
            <p className="text-xs text-gray-300">
              &quot;Dad&apos;s doing math? This should be interesting...&quot;
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-4 transform rotate-[-1deg] hover:rotate-0 transition-transform"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
          >
            <p className="text-sm font-body text-magenta-300 mb-1">Haley says:</p>
            <p className="text-xs text-gray-300">
              &quot;Just use GPS like a normal person 🙄&quot;
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Link href="/dashboard">
            <motion.button
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-heading font-bold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Optimization
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer text */}
        <motion.p
          className="mt-16 text-sm text-gray-500 font-body text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          A cinematic DSA visualization • Built with Next.js & Framer Motion
        </motion.p>
      </main>
    </motion.div>
  );
}

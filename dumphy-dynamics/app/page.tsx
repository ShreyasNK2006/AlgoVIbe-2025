'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, TrendingUp, Code, Layers } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          style={{ y: y2 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Mouse Follower Glow */}
      <motion.div
        className="pointer-events-none fixed w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {/* Badge */}
        <motion.div
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass-card group cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-sm text-gray-300">Modern Family × Data Structures</span>
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Main Heading with Gradient */}
        <motion.h1 
          className="text-6xl md:text-8xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
          style={{ fontFamily: 'var(--font-family-heading)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Dunphy Dynamics
        </motion.h1>

        <motion.p 
          className="text-2xl md:text-3xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 mb-6"
          style={{ fontFamily: 'var(--font-family-heading)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The Realty Route Reimagined
        </motion.p>

        <motion.p 
          className="text-base md:text-lg text-center text-gray-300 mb-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Help Phil Dunphy optimize his perfect property showing route using dynamic programming and time window constraints. 
          <span className="text-indigo-400 font-semibold"> Experience algorithms like never before.</span>
        </motion.p>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="glass-card p-6 group hover:border-cyan-500/50 transition-all cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Zap className="w-8 h-8 text-cyan-400 mb-3 group-hover:animate-pulse" />
            <p className="text-sm text-cyan-300 mb-1 font-semibold">⚡ Real-time Visualization</p>
            <p className="text-xs text-gray-300">Watch DP states evolve in real-time with stunning animations</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 group hover:border-purple-500/50 transition-all cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <TrendingUp className="w-8 h-8 text-purple-400 mb-3 group-hover:animate-pulse" />
            <p className="text-sm text-purple-300 mb-1 font-semibold">📊 Interactive Analytics</p>
            <p className="text-xs text-gray-300">Explore algorithm performance with detailed metrics</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 group hover:border-pink-500/50 transition-all cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Code className="w-8 h-8 text-pink-400 mb-3 group-hover:animate-pulse" />
            <p className="text-sm text-pink-300 mb-1 font-semibold">🎯 Educational</p>
            <p className="text-xs text-gray-300">Learn TSP algorithms through Phil's hilarious journey</p>
          </motion.div>
        </motion.div>

                {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/dashboard">
            <motion.button 
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg text-white shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              <span className="relative z-10 flex items-center gap-2">
                Launch Dashboard
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(99, 102, 241, 0.5)',
                    '0 0 60px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(99, 102, 241, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Character Quotes Carousel */}
        <motion.div
          className="mt-16 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              className="glass-card p-5 border-l-4 border-yellow-400"
              whileHover={{ x: 5 }}
            >
              <p className="text-sm text-yellow-300 mb-1 font-semibold flex items-center gap-2">
                <span className="text-2xl">👩</span> Claire says:
              </p>
              <p className="text-xs text-gray-300 italic">&quot;Don&apos;t mess this up again, Phil!&quot;</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-5 border-l-4 border-cyan-400"
              whileHover={{ x: 5 }}
            >
              <p className="text-sm text-cyan-300 mb-1 font-semibold flex items-center gap-2">
                <span className="text-2xl">🧒</span> Luke says:
              </p>
              <p className="text-xs text-gray-300 italic">&quot;Dad&apos;s doing math? This should be interesting...&quot;</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-5 border-l-4 border-pink-400"
              whileHover={{ x: 5 }}
            >
              <p className="text-sm text-pink-300 mb-1 font-semibold flex items-center gap-2">
                <span className="text-2xl">👱‍♀️</span> Haley says:
              </p>
              <p className="text-xs text-gray-300 italic">&quot;Just use GPS like a normal person 🙄&quot;</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-5 border-l-4 border-purple-400"
              whileHover={{ x: 5 }}
            >
              <p className="text-sm text-purple-300 mb-1 font-semibold flex items-center gap-2">
                <span className="text-2xl">👧</span> Alex says:
              </p>
              <p className="text-xs text-gray-300 italic">&quot;The optimal solution requires dynamic programming...&quot;</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold text-gradient mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              O(2^n · n²)
            </motion.div>
            <div className="text-xs text-gray-400">Time Complexity</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold text-gradient mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              8
            </motion.div>
            <div className="text-xs text-gray-400">Modern Family Houses</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold text-gradient mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              60fps
            </motion.div>
            <div className="text-xs text-gray-400">Smooth Animations</div>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mt-16 text-sm text-gray-500 text-center">
          A cinematic DSA visualization • Built with Next.js & Framer Motion
        </p>
      </main>
    </div>
  );
}

# 🎨 Dunphy Dynamics: Visual Theme & Style Guide

**Version:** 1.0  
**Last Updated:** October 30, 2025  
**Related:** Product Requirements Document (PRD.md)

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Animation Principles](#animation-principles)
7. [Iconography](#iconography)
8. [Glassmorphism Effects](#glassmorphism-effects)
9. [Responsive Design](#responsive-design)
10. [Accessibility](#accessibility)
11. [Code Examples](#code-examples)

---

## 🎯 Design Philosophy

### Core Principles

1. **Cinematic First**
   - Every interaction should feel like a scene from a high-budget film
   - Smooth transitions over instant changes
   - Purposeful motion that guides the eye

2. **Information Hierarchy**
   - Primary: Algorithm visualization (map, DP table)
   - Secondary: Controls and parameters
   - Tertiary: Commentary and Easter eggs

3. **Modern Meets Playful**
   - Professional glassmorphic aesthetic
   - Injected with Modern Family humor
   - Balance between serious DSA and entertainment

4. **Performance-Conscious Beauty**
   - 60 FPS animations minimum
   - Optimized asset loading
   - Graceful degradation on lower-end devices

### Visual Inspirations

- **Apple's visionOS UI** - Glassmorphic depth and blur
- **Stripe's website** - Clean, professional gradients
- **Linear app** - Smooth, purposeful animations
- **Cyberpunk aesthetics** - Neon accents and dark backgrounds

---

## 🌈 Color System

### Primary Palette

```css
:root {
  /* Backgrounds */
  --bg-primary: #0B0F19;
  --bg-secondary: #1B2430;
  --bg-tertiary: #2A3342;
  
  /* Accents */
  --accent-cyan: #00FFFF;
  --accent-gold: #FFD93D;
  --accent-magenta: #FF6EC7;
  --accent-purple: #A855F7;
  
  /* States */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #FF4E50;
  --info: #3B82F6;
  
  /* Text */
  --text-primary: #F1F5F9;
  --text-secondary: #A0AEC0;
  --text-tertiary: #64748B;
  --text-inverse: #0B0F19;
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: rgba(0, 0, 0, 0.3);
}
```

### Semantic Colors

| Use Case | Color | Variable | Hex |
|----------|-------|----------|-----|
| House node (available) | Cyan | `--accent-cyan` | `#00FFFF` |
| House node (visited) | Gold | `--accent-gold` | `#FFD93D` |
| House node (locked) | Error | `--error` | `#FF4E50` |
| Route edge (active) | Cyan glow | `--accent-cyan` | `#00FFFF` |
| Route edge (optimal) | Gold glow | `--accent-gold` | `#FFD93D` |
| DP cell (computed) | Cyan | `--accent-cyan` | `#00FFFF` |
| DP cell (active) | Magenta | `--accent-magenta` | `#FF6EC7` |
| DP cell (optimal) | Gold | `--accent-gold` | `#FFD93D` |
| Time window valid | Success | `--success` | `#10B981` |
| Time window warning | Warning | `--warning` | `#F59E0B` |
| Time window violated | Error | `--error` | `#FF4E50` |

### Gradients

```css
/* Background Gradient */
.bg-gradient-primary {
  background: linear-gradient(
    135deg,
    #0B0F19 0%,
    #1B2430 50%,
    #0B0F19 100%
  );
}

/* Accent Gradient (Buttons, Headers) */
.bg-gradient-accent {
  background: linear-gradient(
    90deg,
    #00FFFF 0%,
    #A855F7 50%,
    #FF6EC7 100%
  );
}

/* Success Gradient */
.bg-gradient-success {
  background: linear-gradient(
    135deg,
    #10B981 0%,
    #FFD93D 100%
  );
}

/* Glassmorphic Overlay */
.bg-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

### Color Usage Guidelines

✅ **Do:**
- Use cyan for interactive elements and highlights
- Reserve gold for success states and achievements
- Apply magenta sparingly for special emphasis
- Maintain 4.5:1 contrast ratio for text

❌ **Don't:**
- Mix more than 3 accent colors in one component
- Use pure white (#FFFFFF) - always use `--text-primary`
- Apply bright colors to large backgrounds
- Create gradients with more than 3 stops

---

## ✍️ Typography

### Font Family Stack

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Orbitron', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      }
    }
  }
}
```

### Font Weights

| Family | Weights | Usage |
|--------|---------|-------|
| Orbitron | 400, 700, 900 | Headings, CTAs, Logo |
| Manrope | 400, 500, 600, 700 | Body, Labels, Descriptions |
| JetBrains Mono | 400, 500 | Code snippets, DP states |

### Type Scale

```css
/* Mobile-first with responsive scaling */
:root {
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);      /* 12-14px */
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);        /* 14-16px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);      /* 16-18px */
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);        /* 18-24px */
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem);      /* 20-30px */
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);          /* 24-36px */
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 3rem);       /* 30-48px */
  --text-4xl: clamp(2.25rem, 1.8rem + 2.25vw, 3.75rem);      /* 36-60px */
  --text-5xl: clamp(3rem, 2.4rem + 3vw, 4.5rem);             /* 48-72px */
}
```

### Typography Components

```tsx
// Heading Variants
<h1 className="font-heading font-bold text-5xl leading-tight tracking-tight text-white">
  Dunphy Dynamics
</h1>

<h2 className="font-heading font-bold text-3xl leading-snug tracking-tight text-white">
  Phil's Command Center
</h2>

<h3 className="font-heading font-semibold text-xl leading-normal text-cyan-400">
  Algorithm Visualization
</h3>

// Body Text
<p className="font-body font-normal text-base leading-relaxed text-gray-300">
  Optimize Phil's route through Los Angeles...
</p>

<span className="font-body font-medium text-sm text-gray-400">
  Current satisfaction: 87%
</span>

// Code/Data
<code className="font-mono font-normal text-sm text-cyan-300 bg-gray-900 px-2 py-1 rounded">
  dp[0110][2] = 245
</code>
```

### Line Height & Spacing

```css
.typography-heading {
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.typography-body {
  line-height: 1.6;
  letter-spacing: 0;
}

.typography-mono {
  line-height: 1.5;
  letter-spacing: -0.01em;
}
```

### Text Hierarchy Example

```
┌────────────────────────────────────┐
│ DUNPHY DYNAMICS                    │ ← h1, Orbitron 900, 48-72px
│ The Realty Route Reimagined        │ ← subtitle, Manrope 400, 18-24px
│                                    │
│ Phil's Command Center              │ ← h2, Orbitron 700, 30-48px
│ ────────────────────────           │
│                                    │
│ Current Route Status               │ ← h3, Orbitron 600, 20-30px
│ Phil is optimizing his route       │ ← body, Manrope 400, 16-18px
│ through 8 houses in LA.            │
│                                    │
│ Satisfaction: 87/100               │ ← label, Manrope 500, 14-16px
│ Time: 3h 45m / 10h                 │
└────────────────────────────────────┘
```

---

## 📐 Spacing & Layout

### Spacing Scale

```typescript
// TailwindCSS spacing (4px base unit)
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px
}
```

### Layout Grid

```css
/* Desktop (1440px standard) */
.container-desktop {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem; /* 32px */
}

/* Grid System */
.grid-layout {
  display: grid;
  grid-template-columns: 320px 1fr; /* Sidebar + Main */
  gap: 2rem; /* 32px */
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}
```

### Component Spacing Patterns

```tsx
// Card Padding
<div className="p-6"> {/* 24px padding */}
  <h3 className="mb-4">Title</h3> {/* 16px margin bottom */}
  <p className="mb-6">Content</p> {/* 24px margin bottom */}
  <button>Action</button>
</div>

// Section Spacing
<section className="py-16 px-8"> {/* 64px vertical, 32px horizontal */}
  {/* ... */}
</section>

// Component Gap
<div className="flex gap-4"> {/* 16px between items */}
  <button>Play</button>
  <button>Pause</button>
  <button>Reset</button>
</div>
```

### Layout Templates

#### Dashboard Layout

```
┌─────────────────────────────────────────────────┐
│ Navbar (h: 64px, px: 32px)                      │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│ Sidebar      │ Main Content                     │
│ (w: 320px)   │ (flex: 1)                        │
│ (p: 24px)    │ (p: 32px)                        │
│              │                                  │
│              │                                  │
│              │                                  │
├──────────────┴──────────────────────────────────┤
│ Timeline (h: 120px, px: 32px)                   │
└─────────────────────────────────────────────────┘
```

---

## 🧩 Component Library

### Button System

```tsx
// Primary Button
<motion.button
  className="
    px-6 py-3 rounded-xl
    bg-gradient-to-r from-cyan-500 to-purple-600
    text-white font-heading font-bold text-base
    shadow-lg shadow-cyan-500/50
    hover:shadow-xl hover:shadow-cyan-500/70
    transition-all duration-300
  "
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Start Optimization
</motion.button>

// Secondary Button (Glass)
<button className="
  px-5 py-2.5 rounded-lg
  bg-white/5 border border-white/20
  backdrop-blur-md
  text-gray-200 font-body font-medium text-sm
  hover:bg-white/10 hover:border-white/30
  transition-all duration-200
">
  Learn More
</button>

// Icon Button
<button className="
  p-3 rounded-full
  bg-white/5 border border-white/10
  hover:bg-white/10 hover:border-cyan-500/50
  transition-all duration-200
">
  <Play className="w-5 h-5 text-cyan-400" />
</button>
```

### Card Component

```tsx
interface CardProps {
  variant: 'glass' | 'solid' | 'glow';
  children: React.ReactNode;
}

export function Card({ variant = 'glass', children }: CardProps) {
  const variants = {
    glass: `
      bg-white/5 border border-white/10
      backdrop-blur-xl
      shadow-2xl shadow-black/50
    `,
    solid: `
      bg-gray-900 border border-gray-800
      shadow-xl
    `,
    glow: `
      bg-gradient-to-br from-cyan-500/10 to-purple-500/10
      border border-cyan-500/30
      shadow-2xl shadow-cyan-500/20
    `
  };

  return (
    <div className={`
      rounded-2xl p-6
      ${variants[variant]}
      transition-all duration-300
    `}>
      {children}
    </div>
  );
}
```

### Tooltip Component

```tsx
<div className="relative group">
  <button>Hover me</button>
  
  <div className="
    absolute bottom-full left-1/2 -translate-x-1/2 mb-2
    px-3 py-2 rounded-lg
    bg-gray-900 border border-cyan-500/50
    text-gray-200 text-xs font-body whitespace-nowrap
    opacity-0 group-hover:opacity-100
    pointer-events-none
    transition-opacity duration-200
    shadow-lg shadow-cyan-500/30
  ">
    This is a tooltip
    <div className="
      absolute top-full left-1/2 -translate-x-1/2
      border-4 border-transparent border-t-gray-900
    " />
  </div>
</div>
```

### Input Components

```tsx
// Slider
<input
  type="range"
  min="5"
  max="15"
  className="
    w-full h-2 rounded-full
    bg-gray-700
    appearance-none
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-cyan-400
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:shadow-lg
    [&::-webkit-slider-thumb]:shadow-cyan-500/50
  "
/>

// Toggle Switch
<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="
    w-11 h-6 rounded-full
    bg-gray-700 peer-checked:bg-cyan-500
    after:content-['']
    after:absolute after:top-0.5 after:left-0.5
    after:w-5 after:h-5 after:rounded-full
    after:bg-white after:transition-all
    peer-checked:after:translate-x-5
  " />
</label>
```

### Modal Component

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/70 backdrop-blur-sm
  "
>
  <motion.div
    initial={{ scale: 0.9, y: 20 }}
    animate={{ scale: 1, y: 0 }}
    exit={{ scale: 0.9, y: 20 }}
    className="
      w-full max-w-2xl mx-4
      bg-gray-900 border border-gray-700
      rounded-2xl p-8
      shadow-2xl
    "
  >
    <h2 className="text-2xl font-heading font-bold mb-4">
      Modal Title
    </h2>
    <p className="text-gray-300 mb-6">
      Modal content goes here...
    </p>
    <div className="flex justify-end gap-4">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </motion.div>
</motion.div>
```

---

## 🎬 Animation Principles

### Motion Philosophy

1. **Purposeful Movement**
   - Every animation serves a function (guide attention, show state change)
   - No animation for animation's sake

2. **Natural Physics**
   - Spring-based over linear
   - Respect momentum and inertia
   - Bouncy but not excessive

3. **Performance First**
   - Use `transform` and `opacity` (GPU-accelerated)
   - Avoid animating `width`, `height`, `top`, `left`
   - Will-change for complex animations

4. **Timing Harmony**
   - Fast micro-interactions (100-200ms)
   - Medium component changes (300-500ms)
   - Slow page transitions (600-800ms)

### Framer Motion Variants

```typescript
// Page Transitions
export const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] // Custom ease
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.4 
    }
  }
};

// Stagger Children
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Hover Effect
export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  tap: { scale: 0.95 }
};

// Pulse (for active elements)
export const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
```

### Path Animations (SVG Routes)

```tsx
<motion.path
  d="M10,10 L100,100"
  stroke="url(#cyanGradient)"
  strokeWidth={2}
  fill="none"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
  transition={{ 
    duration: 1.5, 
    ease: "easeInOut",
    opacity: { duration: 0.3 }
  }}
/>
```

### Car Movement Animation

```tsx
const carPath = [
  { x: 100, y: 100 },
  { x: 200, y: 150 },
  { x: 350, y: 120 },
  // ... more points
];

<motion.div
  animate={{
    x: carPath.map(p => p.x),
    y: carPath.map(p => p.y)
  }}
  transition={{
    duration: carPath.length * 0.5,
    ease: "linear"
  }}
>
  <Car />
</motion.div>
```

### DP Cell Update Animation

```tsx
<motion.div
  key={`${mask}-${node}`}
  className="dp-cell"
  initial={{ scale: 0, backgroundColor: "rgba(0,0,0,0)" }}
  animate={{ 
    scale: 1, 
    backgroundColor: "rgba(0,255,255,0.2)" 
  }}
  transition={{ 
    type: "spring", 
    stiffness: 500, 
    damping: 25 
  }}
>
  {value}
</motion.div>
```

### Confetti Effect

```tsx
import { motion } from 'framer-motion';

const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * window.innerWidth,
  y: -20,
  rotation: Math.random() * 360,
  color: ['#00FFFF', '#FFD93D', '#FF6EC7'][Math.floor(Math.random() * 3)]
}));

<div className="fixed inset-0 pointer-events-none">
  {confettiPieces.map(piece => (
    <motion.div
      key={piece.id}
      className="absolute w-3 h-3 rounded-sm"
      style={{ backgroundColor: piece.color }}
      initial={{ 
        x: piece.x, 
        y: piece.y, 
        rotate: piece.rotation 
      }}
      animate={{
        y: window.innerHeight + 20,
        rotate: piece.rotation + 720,
        x: piece.x + (Math.random() - 0.5) * 200
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        ease: "easeIn"
      }}
    />
  ))}
</div>
```

### Animation Performance Tips

```tsx
// Use will-change for complex animations
<motion.div
  style={{ willChange: 'transform, opacity' }}
  animate={{ ... }}
/>

// Reduce motion for accessibility
const shouldReduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  animate={shouldReduceMotion ? {} : { x: 100 }}
/>

// Use layout animations for smooth transitions
<motion.div layout>
  {/* Content that changes size/position */}
</motion.div>
```

---

## 🎨 Iconography

### Icon System (Lucide React)

```tsx
import {
  Play, Pause, RotateCcw, FastForward,
  Home, Clock, Star, MapPin, TrendingUp,
  Settings, Info, Share2, Download
} from 'lucide-react';

// Icon Sizing
const iconSizes = {
  xs: 'w-3 h-3',   // 12px
  sm: 'w-4 h-4',   // 16px
  md: 'w-5 h-5',   // 20px
  lg: 'w-6 h-6',   // 24px
  xl: 'w-8 h-8',   // 32px
  '2xl': 'w-10 h-10' // 40px
};

// Usage with color and animation
<Play className="w-5 h-5 text-cyan-400 hover:text-cyan-300 transition-colors" />
```

### Custom Icons (Map Markers)

```tsx
// House Node Icon
export function HouseIcon({ status }: { status: 'available' | 'visited' | 'locked' }) {
  const colors = {
    available: 'text-cyan-400',
    visited: 'text-yellow-400',
    locked: 'text-red-400'
  };

  return (
    <div className={`relative ${colors[status]}`}>
      <Home className="w-8 h-8" />
      {status === 'visited' && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        />
      )}
    </div>
  );
}
```

### Icon States

| Icon | Rest | Hover | Active | Disabled |
|------|------|-------|--------|----------|
| Color | `text-gray-400` | `text-cyan-400` | `text-cyan-300` | `text-gray-600` |
| Opacity | `opacity-100` | `opacity-100` | `opacity-100` | `opacity-40` |
| Cursor | `cursor-pointer` | `cursor-pointer` | `cursor-pointer` | `cursor-not-allowed` |

---

## 🪟 Glassmorphism Effects

### Glass Card

```css
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### Glassmorphism Variants

```tsx
// Subtle Glass (Sidebar)
<div className="
  bg-white/5
  border border-white/10
  backdrop-blur-md
  rounded-2xl
  shadow-xl shadow-black/20
">

// Prominent Glass (Modal)
<div className="
  bg-white/10
  border border-white/20
  backdrop-blur-2xl
  rounded-3xl
  shadow-2xl shadow-black/40
">

// Glowing Glass (Active Card)
<div className="
  bg-gradient-to-br from-cyan-500/20 to-purple-500/20
  border border-cyan-500/30
  backdrop-blur-xl
  rounded-2xl
  shadow-2xl shadow-cyan-500/30
">
```

### Frosted Background

```css
.frosted-bg {
  position: relative;
  overflow: hidden;
}

.frosted-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/noise.png') repeat;
  opacity: 0.03;
  pointer-events: none;
}
```

---

## 📱 Responsive Design

### Breakpoint System

```typescript
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};
```

### Responsive Patterns

```tsx
// Mobile-First Approach
<div className="
  flex flex-col gap-4           /* Mobile */
  md:flex-row md:gap-6          /* Tablet+ */
  lg:gap-8                      /* Desktop+ */
">

// Hide/Show Based on Screen
<div className="
  hidden                        /* Hidden on mobile */
  md:block                      /* Visible on tablet+ */
">

// Responsive Grid
<div className="
  grid grid-cols-1              /* 1 column on mobile */
  md:grid-cols-2                /* 2 columns on tablet */
  lg:grid-cols-3                /* 3 columns on desktop */
  gap-6
">
```

### Mobile Adaptations

**Dashboard Layout:**
```
Mobile (< 768px):
┌─────────────────┐
│ Navbar          │
├─────────────────┤
│ Map             │
│ (full width)    │
├─────────────────┤
│ Controls        │
│ (collapsed)     │
├─────────────────┤
│ Timeline        │
│ (swipeable)     │
└─────────────────┘

Tablet (768px+):
┌────────┬────────┐
│ Nav    │ Nav    │
├────────┴────────┤
│ Controls  │ Map │
│ (sidebar) │     │
│           │     │
├───────────┴─────┤
│ Timeline        │
└─────────────────┘
```

### Touch Targets

```css
/* Minimum touch target: 44x44px */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* Spacing between touch targets */
.touch-area {
  gap: 12px; /* Minimum 8px */
}
```

---

## ♿ Accessibility

### Color Contrast

All text must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18pt+): 3:1 minimum contrast ratio

```tsx
// Good: High contrast
<p className="text-white bg-gray-900">Readable text</p>

// Bad: Low contrast
<p className="text-gray-400 bg-gray-500">Hard to read</p>
```

### Keyboard Navigation

```tsx
// Focus Styles
<button className="
  focus:outline-none
  focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900
  rounded-lg
">
  Accessible Button
</button>

// Tab Index
<div tabIndex={0} role="button" onKeyDown={handleKeyPress}>
  Custom Interactive Element
</div>
```

### Screen Reader Support

```tsx
// ARIA Labels
<button aria-label="Play algorithm animation">
  <Play className="w-5 h-5" />
</button>

// Live Regions (for dynamic updates)
<div aria-live="polite" aria-atomic="true">
  Current satisfaction: {score}
</div>

// Hidden Labels
<label htmlFor="speed" className="sr-only">
  Animation Speed
</label>
<input id="speed" type="range" />
```

### Reduced Motion

```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  animate={prefersReducedMotion ? {} : {
    x: [0, 100],
    transition: { duration: 1 }
  }}
>
  Respects user preference
</motion.div>
```

### Skip Links

```tsx
<a
  href="#main-content"
  className="
    sr-only focus:not-sr-only
    focus:absolute focus:top-4 focus:left-4
    focus:z-50 focus:px-4 focus:py-2
    focus:bg-cyan-500 focus:text-white
    focus:rounded-lg
  "
>
  Skip to main content
</a>
```

---

## 💻 Code Examples

### Complete Component Example

```tsx
// components/map/HouseNode.tsx
import { motion } from 'framer-motion';
import { Home, Check, Lock } from 'lucide-react';
import { House } from '@/lib/types';

interface HouseNodeProps {
  house: House;
  isActive: boolean;
  onClick: () => void;
}

export function HouseNode({ house, isActive, onClick }: HouseNodeProps) {
  const statusColors = {
    available: 'border-cyan-400 shadow-cyan-400/50',
    visited: 'border-yellow-400 shadow-yellow-400/50',
    locked: 'border-red-400 shadow-red-400/50'
  };

  const statusIcons = {
    available: <Home className="w-6 h-6 text-cyan-400" />,
    visited: <Check className="w-6 h-6 text-yellow-400" />,
    locked: <Lock className="w-6 h-6 text-red-400" />
  };

  return (
    <motion.button
      className={`
        relative p-4 rounded-2xl
        bg-white/5 border-2
        backdrop-blur-md
        shadow-lg
        ${statusColors[house.status]}
        transition-all duration-300
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-cyan-400
        ${isActive && 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900'}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Icon */}
      {statusIcons[house.status]}

      {/* Tooltip */}
      <motion.div
        className="
          absolute -top-16 left-1/2 -translate-x-1/2
          px-3 py-2 rounded-lg
          bg-gray-900 border border-cyan-500/50
          text-xs text-gray-200 whitespace-nowrap
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-opacity duration-200
          shadow-xl shadow-cyan-500/20
        "
      >
        <div className="font-semibold">{house.name}</div>
        <div className="text-gray-400">
          {house.timeWindow.start} - {house.timeWindow.end}
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          ⭐ {house.preference}/10
        </div>
      </motion.div>

      {/* Pulse Animation (if active) */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-yellow-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
}
```

### Theme Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B0F19',
        'bg-secondary': '#1B2430',
        'accent-cyan': '#00FFFF',
        'accent-gold': '#FFD93D',
        'accent-magenta': '#FF6EC7',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Global Styles

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-bg-primary text-text-primary font-body;
    @apply antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer utilities {
  .glass-card {
    @apply bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl;
  }
  
  .text-gradient {
    @apply bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent;
  }
  
  .glow-cyan {
    @apply shadow-lg shadow-cyan-500/50;
  }
  
  .glow-gold {
    @apply shadow-lg shadow-yellow-400/50;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 255, 0.5);
}

/* Selection */
::selection {
  background: rgba(0, 255, 255, 0.3);
  color: white;
}
```

---

## 📋 Component Checklist

### Pre-Implementation Checklist

Before building any component, ensure:

- [ ] Responsive design considered (mobile-first)
- [ ] Accessibility requirements met (ARIA, keyboard nav)
- [ ] Animation performance optimized
- [ ] Color contrast validated
- [ ] TypeScript types defined
- [ ] Framer Motion variants prepared
- [ ] Glassmorphism effects applied correctly
- [ ] Touch targets minimum 44x44px
- [ ] Loading states designed
- [ ] Error states designed
- [ ] Empty states designed

### Component Review Checklist

Before marking component complete:

- [ ] Renders correctly on mobile (320px)
- [ ] Renders correctly on tablet (768px)
- [ ] Renders correctly on desktop (1440px)
- [ ] Keyboard navigation works
- [ ] Screen reader announces properly
- [ ] Animations run at 60 FPS
- [ ] Hover states are clear
- [ ] Focus states are visible
- [ ] No console errors/warnings
- [ ] Props are properly typed
- [ ] Code is commented where complex

---

## 🎨 Design Tokens Export

```typescript
// lib/design-tokens.ts
export const designTokens = {
  colors: {
    background: {
      primary: '#0B0F19',
      secondary: '#1B2430',
      tertiary: '#2A3342'
    },
    accent: {
      cyan: '#00FFFF',
      gold: '#FFD93D',
      magenta: '#FF6EC7',
      purple: '#A855F7'
    },
    state: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#FF4E50',
      info: '#3B82F6'
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#A0AEC0',
      tertiary: '#64748B'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px'
  },
  typography: {
    fontFamily: {
      heading: 'Orbitron, sans-serif',
      body: 'Manrope, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    }
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      custom: 'cubic-bezier(0.22, 1, 0.36, 1)'
    }
  }
} as const;
```

---

**Document Version:** 1.0  
**Figma File:** [Link to design system]  
**Storybook:** [Link to component library]  
**Last Updated:** October 30, 2025

---

*"Design is not just what it looks like and feels like. Design is how it works."* — Steve Jobs

*"...and how it impresses Claire!"* — Phil Dunphy

# Dunphy Dynamics - TSP Visualization Platform

## 🎯 Project Overview

**Dunphy Dynamics** is an interactive educational platform that visualizes the Traveling Salesman Problem (TSP) with Time Windows using Dynamic Programming. Themed around Phil Dunphy from Modern Family, this project makes complex algorithms engaging and accessible.

## ✨ Features

### Core Functionality
- **Dynamic Programming TSP Solver**: Complete implementation with bitmask optimization
- **Interactive Map Visualization**: React Flow-based interactive graph with animated routes
- **DP State Visualizer**: Real-time visualization of dynamic programming table states
- **Timeline View**: Step-by-step route progression with time windows
- **Playback Controls**: Play, pause, reset, speed control (0.5x - 3x)
- **Character Commentary**: Modern Family characters provide contextual feedback

### Technical Highlights
- **Next.js 16** with App Router and Turbopack
- **Tailwind CSS v4** with CSS-based @theme configuration
- **TypeScript** with strict type checking
- **Framer Motion** for 60fps animations
- **Zustand** for state management
- **React Flow** for graph visualization

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd dumphy-dynamics

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Access the Application
- **Development**: http://localhost:3000
- **Landing Page**: `/`
- **Dashboard**: `/dashboard`

## 📁 Project Structure

```
dumphy-dynamics/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/
│   │   └── page.tsx          # Main visualization dashboard
│   ├── globals.css           # Tailwind v4 config & styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── map-visualization.tsx     # React Flow map
│   ├── dp-visualizer.tsx         # DP table visualization
│   ├── timeline.tsx              # Route timeline
│   ├── playback-controls.tsx     # Player controls
│   └── character-commentary.tsx  # Character feedback
├── lib/
│   ├── algorithms/
│   │   └── tsp-dp.ts         # TSP solver with DP
│   ├── store/
│   │   └── simulation-store.ts   # Zustand store
│   ├── types.ts              # TypeScript definitions
│   ├── constants.ts          # Sample data & constants
│   └── animations.ts         # Framer Motion variants
└── public/                   # Static assets
```

## 🎨 Design System

### Color Palette (Tailwind v4 Custom Tokens)
- **Primary**: `#0f0f23` (Deep space blue)
- **Accent Primary**: `#6366f1` (Indigo)
- **Accent Secondary**: `#8b5cf6` (Purple)
- **Text Primary**: `#e2e8f0`
- **Text Secondary**: `#94a3b8`

### Typography
- **Heading**: Orbitron (Futuristic, tech-inspired)
- **Body**: Manrope (Clean, readable)
- **Code**: JetBrains Mono

### Components
- **Glassmorphism**: `backdrop-blur-xl` + semi-transparent backgrounds
- **Animations**: Pulse, glow, float keyframes
- **Shadows**: Custom glow effects for active elements

## 🧮 Algorithm Details

### TSP with Time Windows

The solver implements:
1. **Bitmask DP**: Represents visited sets as binary masks
2. **State**: `dp[mask][last]` = max satisfaction score
3. **Transition**: Try visiting each unvisited house
4. **Constraints**: 
   - Time windows must be respected
   - Travel time calculated from coordinates
   - Preference scores influence decisions

### Complexity
- **Time**: O(2^n × n^2)
- **Space**: O(2^n × n)
- **Optimal for**: n ≤ 15 houses

## 🎮 User Guide

### Dashboard Controls
1. **Play**: Start the visualization
2. **Pause**: Pause at current step
3. **Reset**: Return to initial state
4. **Speed**: Adjust playback speed (0.5x - 3x)
5. **Step Forward/Back**: Manual step control

### Visualization Panels
- **Map**: Shows houses as nodes, routes as edges
- **DP Visualizer**: Binary mask representation, current state, scores
- **Timeline**: Sequential route with ETAs and time windows
- **Commentary**: Character feedback based on progress

## 🛠️ Development

### Key Technologies
- **Next.js 16.0.1**: React framework with App Router
- **Tailwind CSS v4**: Utility-first CSS (CSS @theme directive)
- **TypeScript 5**: Type safety
- **Framer Motion**: Animation library
- **React Flow**: Graph visualization
- **Zustand**: Lightweight state management

### Build Process
```bash
# Development (Turbopack)
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Setup
The project uses:
- **Turbopack**: Fast bundler for development
- **CSS Variables**: Tailwind v4 theme system
- **Client Components**: All interactive UIs
- **SSR**: Landing page pre-rendered

## 📊 Sample Data

8 Modern Family-themed houses included:
- Jay's Mansion (9.5 priority)
- Mitchell's Modern Loft (8.0 priority)
- Haley's Trendy Condo (7.5 priority)
- Alex's Smart Home (9.0 priority)
- Luke's Fixer-Upper (6.0 priority)
- Manny's Poetry Manor (7.0 priority)
- Gloria's Villa (8.5 priority)
- Cam's Country House (7.8 priority)

## 🎭 Character Commentary System

Dynamic feedback based on simulation phase:
- **Planning**: Initial setup comments
- **Executing**: Progress updates
- **Completed**: Success/completion reactions

Characters: Phil, Claire, Luke, Haley, Alex

## 🚧 Future Enhancements

- [ ] Sound effects (Howler.js integration)
- [ ] 3D visualization mode (Three.js)
- [ ] Custom house input
- [ ] Algorithm comparison (DP vs Greedy vs Branch & Bound)
- [ ] Export results/statistics
- [ ] Mobile responsive improvements
- [ ] Accessibility enhancements

## 📝 License

MIT License - Educational Project

## 👨‍💻 Credits

Inspired by Modern Family and designed for algorithm education.

---

**Built with ❤️ for AlgoVibe 2025 Hackathon**

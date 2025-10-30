# 🏡 Dunphy Dynamics: The Realty Route Reimagined

## Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** October 30, 2025  
**Project Type:** Interactive DSA Visualization Platform  
**Hackathon:** Modern Family: Phil's Property Showing Route Optimizer

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target Audience](#target-audience)
4. [Core Problem Statement](#core-problem-statement)
5. [Solution Overview](#solution-overview)
6. [Feature Specifications](#feature-specifications)
7. [Technical Architecture](#technical-architecture)
8. [User Flow](#user-flow)
9. [Success Metrics](#success-metrics)
10. [Timeline & Milestones](#timeline--milestones)

---

## 🎯 Executive Summary

**Dunphy Dynamics** is an immersive web-based visualization platform that transforms the classic Traveling Salesman Problem (TSP) with Time Windows into an engaging, story-driven experience. By following Phil Dunphy's comedic journey through optimizing his real estate showing route, users will understand complex algorithms through beautiful animations, interactive controls, and Modern Family humor.

### Key Differentiators

- **Narrative-Driven Learning:** Algorithm education through storytelling
- **Cinematic Visuals:** Glassmorphic UI with neon accents and smooth animations
- **Interactive Exploration:** Real-time parameter tuning and algorithm playback
- **Multi-Modal Learning:** Visual, textual, and auditory engagement
- **Production-Grade Stack:** Next.js 14+, TypeScript, TailwindCSS, Framer Motion

---

## 🌟 Product Vision

### Mission Statement

> *"To make advanced data structures and algorithms accessible, engaging, and memorable through cinematic web experiences that blend competitive programming with pop culture."*

### Long-Term Vision

- **Phase 1 (Hackathon):** Phil's Route Optimizer (TSP + Time Windows)
- **Phase 2:** Expand to other Modern Family characters and DSA problems
- **Phase 3:** Multi-series support (The Office, Parks & Rec, etc.)
- **Phase 4:** Community-driven problem submissions and visualizations

---

## 👥 Target Audience

### Primary Personas

1. **The Competitive Programmer**
   - Age: 18-25
   - Needs: Visual understanding of optimization algorithms
   - Pain Point: Abstract algorithms hard to internalize
   - Value: Step-by-step DP visualization with code correlation

2. **The CS Student**
   - Age: 16-22
   - Needs: Engaging learning materials for DSA courses
   - Pain Point: Traditional textbooks are dry
   - Value: Story-driven, interactive learning modules

3. **The Tech Enthusiast**
   - Age: 20-35
   - Needs: Fun, shareable tech demos
   - Pain Point: Most visualizations lack polish
   - Value: Cinematic UI worthy of sharing on social media

4. **The Modern Family Fan**
   - Age: 18-45
   - Needs: Novel ways to engage with favorite show
   - Pain Point: Limited interactive fan experiences
   - Value: Authentic character integration and Easter eggs

---

## 🎯 Core Problem Statement

### The Challenge

**TSP with Time Windows** is a complex optimization problem combining:
- Graph theory (shortest path)
- Dynamic programming (state optimization)
- Constraint satisfaction (time windows)
- Multi-objective optimization (distance vs. satisfaction)

### Current Limitations

❌ **Existing Solutions:**
- Dry, academic visualizations
- No narrative context
- Limited interactivity
- Poor mobile responsiveness
- Minimal visual appeal

✅ **Our Approach:**
- Story-first design
- Character-driven engagement
- Full parameter control
- Responsive, accessible UI
- Production-grade aesthetics

---

## 💡 Solution Overview

### Core Value Proposition

**Dunphy Dynamics** transforms algorithm learning by:

1. **Contextualizing** abstract concepts in relatable scenarios
2. **Visualizing** state transitions and decision trees dynamically
3. **Gamifying** the learning experience with scores and achievements
4. **Entertaining** through Modern Family humor and references
5. **Educating** with multi-layered explanation modules

### Key Capabilities

| Capability | Description | User Benefit |
|------------|-------------|--------------|
| **Real-Time Visualization** | Live graph updates during algorithm execution | See how TSP/DP works in action |
| **Interactive Controls** | Adjust parameters, pause, step through | Hands-on experimentation |
| **Multiple View Modes** | Map, DP Table, Timeline, Analytics | Diverse learning styles |
| **Story Integration** | Character dialogues and narrative flow | Enhanced engagement and memory |
| **Learning Modules** | Step-by-step algorithm breakdown | Clear understanding of concepts |
| **Performance Analytics** | Detailed metrics and comparisons | Measure optimization quality |

---

## 🧩 Feature Specifications

### 🏁 F1: Landing Screen – "Phil's Morning Briefing"

**Priority:** P0 (Must-Have)  
**Complexity:** Low

#### Description
The entry point that sets the tone with Modern Family theming and introduces the challenge.

#### User Story
> *As a user, I want to immediately understand the context and feel immersed in Phil's world, so that I'm excited to explore the visualization.*

#### Acceptance Criteria
- [ ] Background shows blurred LA suburb map with animated house pins
- [ ] Animated greeting text using Framer Motion (fade-in + slide-up)
- [ ] Floating sticky notes with character quotes (Claire, Luke, Haley)
- [ ] "Start Optimization" button with hover effects
- [ ] Smooth transition to dashboard (page transition animation)
- [ ] Responsive design for mobile/tablet/desktop

#### Visual Specifications
```typescript
// Animation Timings
const landingAnimations = {
  backgroundFadeIn: { duration: 1.0, ease: "easeOut" },
  titleSlideUp: { duration: 0.8, delay: 0.3 },
  stickyNotes: { 
    stagger: 0.15, 
    spring: { stiffness: 100, damping: 15 } 
  },
  startButton: {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  }
}
```

#### Content
- **Title:** "Dunphy Dynamics: The Realty Route Reimagined"
- **Subtitle:** "Help Phil optimize his perfect property showing route!"
- **Sticky Notes:**
  - Claire: "Don't mess this up again, Phil!"
  - Luke: "Dad's doing math? This should be interesting..."
  - Haley: "Just use GPS like a normal person 🙄"

---

### 🧭 F2: Main Dashboard – "Phil's Command Center"

**Priority:** P0 (Must-Have)  
**Complexity:** High

#### Description
The core visualization hub with interactive map, controls, and real-time algorithm execution.

#### User Story
> *As a user, I want to see the optimization algorithm run in real-time on an interactive map, so that I understand how TSP with time windows works.*

#### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Navbar: Logo | Current Status | Score                  │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Control     │         Interactive Map Canvas          │
│  Panel       │                                          │
│  (Sidebar)   │         - Houses (nodes)                │
│              │         - Routes (edges)                │
│  - Params    │         - Animated car icon             │
│  - Playback  │         - Time window arcs              │
│  - Mode      │         - Tooltips                      │
│  - Comments  │                                          │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│  Timeline View (Horizontal Scrollable)                  │
└─────────────────────────────────────────────────────────┘
```

#### Sub-Components

##### 2.1 Interactive City Map

**Technology:** React Flow / D3-Force Layout

**Elements:**
- **Nodes (Houses):**
  ```typescript
  interface House {
    id: string;
    name: string; // e.g., "Jay's Mansion"
    coordinates: { x: number; y: number };
    timeWindow: { start: number; end: number }; // minutes since 8am
    preference: number; // 0-10 score
    visited: boolean;
    locked: boolean; // outside time window
  }
  ```

- **Edges (Routes):**
  ```typescript
  interface Route {
    from: string;
    to: string;
    distance: number; // km
    travelTime: number; // minutes
    active: boolean; // currently being traversed
    optimal: boolean; // part of final route
  }
  ```

- **Visual States:**
  - Default: Pulsing glow (cyan)
  - Available: Bright glow (cyan)
  - Locked: Dimmed (red tint)
  - Visited: Gold glow
  - Active: Animated pulse ring

- **Hover Tooltips:**
  ```
  ╭─────────────────────────╮
  │ 🏠 Jay's Mansion        │
  │ ────────────────────    │
  │ 📍 Downtown             │
  │ ⏰ 09:00 - 11:00       │
  │ ⭐ Preference: 8.5/10  │
  │ 🚗 15 min from current │
  ╰─────────────────────────╯
  ```

- **Animations:**
  - Car icon follows path with smooth bezier curve
  - Edges glow and pulse when active
  - Time window arcs rotate with time progression
  - Confetti burst when optimal route found

##### 2.2 Algorithm Playback Controls

**Location:** Bottom-right floating panel

**Controls:**
- ▶️ **Play** - Start/resume algorithm
- ⏸️ **Pause** - Freeze current state
- ⏮️ **Reset** - Return to initial state
- ⏭️ **Step** - Advance one decision
- 🎚️ **Speed Slider** - 0.5x to 4x speed
- 👁️ **DP Mode Toggle** - Show/hide DP table

**State Display:**
```
Current Step: 12/45
Algorithm: Dynamic Programming (Bitmask)
Status: Evaluating state [0110][2]
```

##### 2.3 Control Panel (Left Sidebar)

**Sections:**

1. **Parameters** (Adjustable before start)
   ```
   Houses: [Slider: 5-15] Current: 8
   Travel Speed: [Slider: 30-60 km/h] Current: 45
   Start Time: [Input: HH:MM] 08:00
   End Time: [Input: HH:MM] 18:00
   ```

2. **Algorithm Mode**
   ```
   ○ Dynamic Programming (Bitmask)
   ○ Branch & Bound
   ○ Greedy Heuristic (for comparison)
   ```

3. **Visualization Options**
   ```
   ☑ Show Time Windows
   ☑ Show Distance Labels
   ☑ Family Commentary
   ☐ 3D Map Mode
   ☐ Night Mode
   ```

4. **Presets**
   ```
   [Load Preset ▼]
   - Easy Mode (5 houses, relaxed windows)
   - Phil's Actual Day (8 houses, tight windows)
   - Nightmare Mode (12 houses, overlapping constraints)
   - Random Challenge
   ```

##### 2.4 Data Summary Bar

**Location:** Top-right corner

```
╭────────────────────────────────────╮
│ 📊 Current Stats                   │
│ Satisfaction: 87/100 ⭐⭐⭐⭐      │
│ Time Elapsed: 3h 45m / 10h         │
│ Houses Shown: 5/8                  │
│ Distance: 42 km                    │
│ Phil's Status: "Overthinking..."   │
╰────────────────────────────────────╯
```

---

### 🧠 F3: DP Visualization Mode – "Phil's Brain Matrix"

**Priority:** P0 (Must-Have)  
**Complexity:** High

#### Description
A grid-based visualization of the DP state table showing how dynamic programming explores and optimizes routes.

#### User Story
> *As a user learning DP, I want to see the state table update in real-time, so that I understand how memoization and state transitions work.*

#### Visual Layout

```
DP State Table: dp[mask][lastNode]

        Node 0    Node 1    Node 2    Node 3
0000    [ 0  ]    [ -  ]    [ -  ]    [ -  ]
0001    [120 ]    [135 ]    [ -  ]    [ -  ]
0010    [145 ]    [ -  ]    [160 ]    [ -  ]
0011    [230 ]    [245 ]    [250 ]    [ -  ]
...
1111    [580 ]    [595 ]    [600 ]    [610 ]
              ↑ Active Cell (glowing)
```

#### Features

1. **Grid Cells**
   - Empty: Dark background
   - Computed: Cyan glow
   - Active: Pulsing yellow border
   - Optimal path: Gold highlight

2. **Transitions**
   - Animated arrows between cells during state updates
   - Bezier curves showing dependency flow
   - Color-coded by operation type (min/max)

3. **Tooltips**
   ```
   State: dp[0110][2]
   Meaning: Visited houses {1,2}, ending at house 2
   Value: 245 (max satisfaction)
   From: dp[0100][1] + travel(1→2) + pref(2)
   ```

4. **Side-by-Side Code**
   - Split view option showing actual DP code
   - Highlighted lines sync with active state
   ```typescript
   for (let mask = 0; mask < (1 << n); mask++) {
     for (let last = 0; last < n; last++) {
       // Current line highlighted in yellow
       if (!(mask & (1 << last))) continue;
       // ...
     }
   }
   ```

5. **Modern Family Commentary**
   - Random quotes appear during key transitions:
     - "Phil's actually thinking 4 steps ahead!"
     - "Claire would be impressed... maybe."
     - "This is more complex than Luke's math homework."

---

### 🕓 F4: Timeline View – "A Day in the Life"

**Priority:** P1 (Should-Have)  
**Complexity:** Medium

#### Description
A horizontal timeline showing Phil's day from 8 AM to 6 PM with visit markers and time window constraints.

#### Visual Design

```
08:00 ━━━━━━━━━━━ 10:00 ━━━━━━━━━━━ 12:00 ━━━━━━━━━━━ 14:00 ━━━━━━━━━━━ 16:00 ━━━━━━━━━━━ 18:00
  🚗     🏠         🚗      🏠         🚗      🏠         🚗      🏠         🚗      🏠
        Jay's            Mitchell's         Claire's          Work          Home
```

#### Elements

1. **Time Markers**
   - Hour divisions with minute subdivisions
   - Current time indicator (moving red line)
   - Smooth auto-scroll following current time

2. **Visit Blocks**
   ```
   ┌─────────────┐
   │ 🏠 Jay's    │ ← Visit duration: 45 min
   │ 09:15-10:00 │ ← Time window: ✅ Valid
   └─────────────┘
   ```

3. **Travel Segments**
   ```
   ═══🚗═══  (15 min travel)
   ```

4. **Status Icons**
   - 🏠 Completed visit (green)
   - 🔒 Locked/unavailable (red)
   - 💡 Available now (cyan pulse)
   - ⏳ Available soon (yellow)
   - ❌ Time window violated (red X)

5. **Hover Details**
   ```
   ╭───────────────────────────╮
   │ Stop #3: Mitchell's House │
   │ Arrival: 11:20 AM         │
   │ Window: 11:00 - 13:00 ✅  │
   │ Duration: 30 min          │
   │ Satisfaction: +25 points  │
   ╰───────────────────────────╯
   ```

---

### 📊 F5: Results & Analytics – "Phil's Report Card"

**Priority:** P1 (Should-Have)  
**Complexity:** Medium

#### Description
Post-optimization summary with beautiful charts, metrics, and humor.

#### Layout

```
┌────────────────────────────────────────────────────┐
│           🎉 Route Optimization Complete!          │
├──────────────┬─────────────────────────────────────┤
│              │                                     │
│  Satisfaction│  📈 Performance Charts              │
│  Gauge       │                                     │
│    92%       │  - Satisfaction vs Time (Line)      │
│  ⭐⭐⭐⭐⭐  │  - Time Breakdown (Pie)             │
│              │  - Travel vs Showing (Bar)          │
│  "Realtor of │  - Route Comparison (Multi-line)    │
│   the Year!" │                                     │
│              │                                     │
├──────────────┴─────────────────────────────────────┤
│  Claire's Eye Roll Meter: ████░░░░░░ 40%          │
│  Phil's Confidence: ████████░░ 80%                │
└────────────────────────────────────────────────────┘
```

#### Components

1. **Circular Progress Gauge** (Recharts RadialBarChart)
   ```typescript
   <RadialBarChart data={[{ value: 92, fill: "#00FFFF" }]}>
     <PolarAngleAxis type="number" domain={[0, 100]} />
     <RadialBar dataKey="value" cornerRadius={10} />
     <text>92% Satisfaction</text>
   </RadialBarChart>
   ```

2. **Line Chart: Satisfaction Over Time**
   - X-axis: Time of day
   - Y-axis: Cumulative satisfaction score
   - Multiple lines for different strategies (DP vs Greedy)

3. **Pie Chart: Time Allocation**
   - Travel time: 35%
   - Showing time: 55%
   - Idle/waiting: 10%

4. **Bar Chart: House Comparisons**
   - Each house's contribution to total satisfaction
   - Color-coded by preference level

5. **Metrics Summary**
   ```
   Total Distance: 87 km
   Total Time: 7h 35m
   Houses Shown: 8/8
   Average Satisfaction: 8.9/10
   Time Windows Met: 100%
   Optimal Route: Yes ✅
   ```

6. **Funny Insights**
   ```
   🎭 Character Reactions:
   
   Claire: "You actually did it without calling me 5 times!"
   Luke: "Dad used math! And it WORKED!"
   Haley: "Okay that's actually impressive I guess"
   Phil: "Phil's-osophy: Success is 10% inspiration,
          90% optimization algorithms!"
   ```

---

### 📚 F6: Learning Section – "Behind the Algorithm"

**Priority:** P1 (Should-Have)  
**Complexity:** Medium

#### Description
Educational modules explaining TSP, DP, and optimization concepts through interactive lessons.

#### Module Structure

Each module is a separate route: `/learn/[step]`

**Module 1: The Problem Setup**
- Route: `/learn/problem`
- Content:
  - Phil's challenge introduction
  - Visual city map with all houses
  - Time windows illustrated as clock segments
  - Client preferences explained
- Interactive: Hover houses to see constraints

**Module 2: Modeling as a Graph**
- Route: `/learn/graph`
- Content:
  - Graph theory basics (nodes, edges, weights)
  - Animated conversion: City map → Graph
  - Distance calculation (Euclidean, Manhattan)
- Interactive: Add/remove edges, see weight changes

**Module 3: The Time Window Constraint**
- Route: `/learn/constraints`
- Content:
  - What are time windows?
  - How they affect routing
  - Valid vs invalid routes animation
- Interactive: Drag time slider to see valid routes change

**Module 4: Dynamic Programming Approach**
- Route: `/learn/dp`
- Content:
  - Bitmask representation explanation
  - State definition: `dp[mask][last]`
  - Recurrence relation breakdown
  - Memoization benefits
- Interactive: Step through DP table manually

**Module 5: Finding the Optimal Path**
- Route: `/learn/solution`
- Content:
  - Path reconstruction from DP table
  - Comparison with greedy approach
  - Time complexity analysis
- Interactive: Visualize both algorithms side-by-side

**Module 6: Real-World Applications**
- Route: `/learn/applications`
- Content:
  - Delivery routing (Amazon, FedEx)
  - Circuit board drilling
  - DNA sequencing
  - Tour planning
- Interactive: Mini-simulations for each application

#### Navigation

```
[← Previous] [1] [2] [3] [4] [5] [6] [Next →]

Progress: ████████░░░░░░ 4/6 Complete
```

---

### 🎉 F7: End Screen – "Sold!"

**Priority:** P1 (Should-Have)  
**Complexity:** Low

#### Description
Celebration screen after completing optimization with options to replay or try new scenarios.

#### Visual Elements

1. **SOLD! Stamp Animation**
   ```typescript
   <motion.div
     initial={{ scale: 0, rotate: -180 }}
     animate={{ scale: 1, rotate: 0 }}
     transition={{ 
       type: "spring", 
       stiffness: 200, 
       damping: 10 
     }}
   >
     <Image src="/sold-stamp.png" alt="SOLD!" />
   </motion.div>
   ```

2. **Summary Card**
   ```
   ╭───────────────────────────────────╮
   │   🎊 Congratulations, Phil! 🎊   │
   │                                   │
   │  You optimized your route with:   │
   │  • 92% Client Satisfaction        │
   │  • 8/8 Houses Shown               │
   │  • 0 Time Violations              │
   │  • 87 km Total Distance           │
   │                                   │
   │      🏆 Realtor of the Year! 🏆   │
   ╰───────────────────────────────────╯
   ```

3. **Action Buttons**
   ```
   [🔄 Try Again]  [🎲 Random City]  [▶️ Replay Route]
   ```

4. **Phil's-osophy Generator**
   - Modal that opens random Modern Family quotes
   - Custom quotes based on performance:
     - High score: "I'm like the Steve Jobs of real estate!"
     - Low score: "Even my failures are learning opportunities!"
     - Perfect score: "Claire, did you see that?! CLAIRE?!"

5. **Share Results**
   ```
   [📱 Share on Twitter]  [📋 Copy Stats]  [💾 Download Report]
   ```

6. **Confetti Animation**
   - Framer Motion confetti burst
   - Color scheme: Gold + Cyan + Magenta
   - Triggered on screen mount

---

### 🎨 F8: Character Commentary System

**Priority:** P2 (Nice-to-Have)  
**Complexity:** Low

#### Description
Speech bubbles from Modern Family characters appear during algorithm execution with contextual humor.

#### Implementation

```typescript
interface Commentary {
  character: "Phil" | "Claire" | "Luke" | "Haley" | "Alex";
  trigger: "start" | "good_decision" | "bad_decision" | "completion" | "random";
  text: string;
  emotion: "happy" | "confused" | "annoyed" | "proud";
}

const commentaries: Commentary[] = [
  {
    character: "Phil",
    trigger: "start",
    text: "Time to show these houses like a Dunphy!",
    emotion: "happy"
  },
  {
    character: "Claire",
    trigger: "bad_decision",
    text: "Phil, you're going to be late again...",
    emotion: "annoyed"
  },
  // ... more commentaries
];
```

#### Visual Design

```
     _____________
    / Did you just \
   | optimize that? |
    \_____________/
         )  )
        /  /
    🙎‍♂️ Luke
```

**Positioning:** Random corners, auto-dismiss after 3s, fade in/out animation

---

### 🔊 F9: Audio System

**Priority:** P2 (Nice-to-Have)  
**Complexity:** Low

#### Description
Ambient audio layer with sound effects synchronized to animations.

#### Sound Effects

| Event | Sound | Volume |
|-------|-------|--------|
| Route start | Car engine start | 40% |
| House arrival | Door chime | 60% |
| Time violation | Error buzz | 50% |
| Optimal route found | Success jingle | 70% |
| DP state update | Subtle click | 20% |
| Background | Ambient city sounds | 15% |

#### Implementation

```typescript
import { Howl } from 'howler';

const sounds = {
  carEngine: new Howl({ src: ['/audio/car-start.mp3'], volume: 0.4 }),
  doorChime: new Howl({ src: ['/audio/door.mp3'], volume: 0.6 }),
  // ...
};

// Play on event
sounds.carEngine.play();
```

**Toggle:** Mute button in navbar

---

### 🌓 F10: Advanced Features (Stretch Goals)

**Priority:** P3 (Optional)  
**Complexity:** Very High

#### 10.1 AI Commentary Mode

Use local LLM (Ollama) to generate dynamic Phil quotes.

```typescript
async function generatePhilQuote(context: {
  satisfaction: number;
  housesShown: number;
  timeRemaining: number;
}) {
  const response = await fetch('/api/generate-quote', {
    method: 'POST',
    body: JSON.stringify(context)
  });
  return response.json();
}
```

#### 10.2 3D Map Mode

Three.js integration for depth and parallax.

```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

<Canvas>
  <OrbitControls />
  <HouseNodes houses={houses} />
  <RouteLines routes={routes} />
  <AnimatedCar position={carPosition} />
</Canvas>
```

#### 10.3 Day-Night Cycle

Background color transitions based on simulation time.

```typescript
const getSkyColor = (time: number) => {
  if (time < 6) return "#0B0F19"; // Night
  if (time < 12) return "#87CEEB"; // Morning
  if (time < 18) return "#FFD93D"; // Afternoon
  return "#1B2430"; // Evening
};
```

#### 10.4 Multiplayer Mode

Race against other users to find optimal route.

```
WebSocket connection → Shared city → Leaderboard
```

---

## 🏗️ Technical Architecture

### Tech Stack

```typescript
// package.json dependencies
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "framer-motion": "^10.16.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.292.0",
    "recharts": "^2.10.0",
    "reactflow": "^11.10.0",
    "zustand": "^4.4.0",
    "howler": "^2.2.3",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "three": "^0.158.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0"
  }
}
```

### Project Structure

```
/app
  ├── page.tsx                      // Landing page
  ├── layout.tsx                    // Root layout
  ├── globals.css                   // Global styles
  ├── dashboard/
  │   └── page.tsx                  // Main visualization
  ├── learn/
  │   ├── [step]/
  │   │   └── page.tsx              // Learning modules
  │   └── layout.tsx                // Learning layout
  └── api/
      └── generate-quote/
          └── route.ts              // AI quote generation

/components
  ├── ui/
  │   ├── Button.tsx
  │   ├── Card.tsx
  │   ├── Tooltip.tsx
  │   └── Modal.tsx
  ├── layout/
  │   ├── Navbar.tsx
  │   └── Footer.tsx
  ├── map/
  │   ├── MapCanvas.tsx             // Main map container
  │   ├── HouseNode.tsx             // Individual house
  │   ├── RouteEdge.tsx             // Path between houses
  │   ├── CarIcon.tsx               // Animated vehicle
  │   └── TimeWindowArc.tsx         // Time constraint visual
  ├── controls/
  │   ├── ControlPanel.tsx          // Left sidebar
  │   ├── PlaybackControls.tsx      // Play/pause/reset
  │   └── ParameterSliders.tsx      // Input controls
  ├── visualization/
  │   ├── DPVisualizer.tsx          // DP table grid
  │   ├── Timeline.tsx              // Horizontal timeline
  │   └── Analytics.tsx             // Charts & metrics
  ├── narrative/
  │   ├── Commentary.tsx            // Character speech bubbles
  │   └── PhilQuoteGenerator.tsx    // Random quote modal
  └── animations/
      ├── ConfettiEffect.tsx
      └── TransitionWrapper.tsx

/lib
  ├── algorithms/
  │   ├── tsp-dp.ts                 // Core DP implementation
  │   ├── greedy.ts                 // Greedy heuristic
  │   └── branch-bound.ts           // Branch & bound
  ├── utils/
  │   ├── distance.ts               // Distance calculations
  │   ├── time-windows.ts           // Constraint checking
  │   └── graph.ts                  // Graph utilities
  ├── store/
  │   └── simulation-store.ts       // Zustand global state
  ├── audio/
  │   └── sound-manager.ts          // Howler.js wrapper
  └── constants/
      ├── houses.ts                 // Sample house data
      └── commentaries.ts           // Character quotes

/public
  ├── fonts/
  │   ├── Orbitron-Bold.woff2
  │   ├── Manrope-Regular.woff2
  │   └── JetBrainsMono.woff2
  ├── images/
  │   ├── sold-stamp.png
  │   └── characters/
  │       ├── phil.png
  │       ├── claire.png
  │       └── ...
  └── audio/
      ├── car-start.mp3
      ├── door-chime.mp3
      └── ambient-city.mp3

/styles
  ├── theme.css                     // CSS custom properties
  └── animations.css                // Reusable animations

/.github
  └── workflows/
      └── deploy.yml                // Vercel deployment

/docs
  ├── ARCHITECTURE.md
  ├── ALGORITHM.md
  └── DEPLOYMENT.md
```

### State Management

```typescript
// lib/store/simulation-store.ts
import { create } from 'zustand';

interface SimulationState {
  // Simulation data
  houses: House[];
  routes: Route[];
  currentNode: number;
  visitedMask: number;
  
  // Algorithm state
  algorithm: 'dp' | 'greedy' | 'branch-bound';
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  
  // DP specific
  dpTable: number[][];
  currentDPState: [number, number];
  
  // Metrics
  totalDistance: number;
  totalSatisfaction: number;
  timeElapsed: number;
  
  // Actions
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  setSpeed: (speed: number) => void;
  updatePosition: (node: number, mask: number) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  // ... implementation
}));
```

### Algorithm Implementation

```typescript
// lib/algorithms/tsp-dp.ts

interface TSPInput {
  houses: House[];
  startTime: number;
  travelSpeed: number;
}

interface TSPResult {
  path: number[];
  totalDistance: number;
  totalSatisfaction: number;
  steps: DPStep[]; // For visualization
}

export class TSPSolver {
  private n: number;
  private dist: number[][];
  private timeWindows: [number, number][];
  private preferences: number[];
  private dp: number[][];
  private parent: number[][];
  
  constructor(input: TSPInput) {
    // Initialize data structures
  }
  
  solve(): TSPResult {
    // Main DP algorithm
    for (let mask = 0; mask < (1 << this.n); mask++) {
      for (let last = 0; last < this.n; last++) {
        if (!(mask & (1 << last))) continue;
        
        for (let prev = 0; prev < this.n; prev++) {
          if (last === prev || !(mask & (1 << prev))) continue;
          
          const prevMask = mask ^ (1 << last);
          const newScore = this.calculateScore(prevMask, prev, last);
          
          if (newScore > this.dp[mask][last]) {
            this.dp[mask][last] = newScore;
            this.parent[mask][last] = prev;
            
            // Store step for visualization
            this.steps.push({
              mask,
              last,
              prev,
              score: newScore
            });
          }
        }
      }
    }
    
    return this.reconstructPath();
  }
  
  private calculateScore(mask: number, from: number, to: number): number {
    // Check time window constraints
    // Calculate distance penalty
    // Add preference score
  }
  
  private reconstructPath(): TSPResult {
    // Backtrack through parent array
  }
}
```

### Animation System

```typescript
// components/animations/TransitionWrapper.tsx
import { motion, Variants } from 'framer-motion';

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
```

---

## 🎨 Visual Theme & Style Guide

See separate document: `STYLE_GUIDE.md`

---

## 🚀 User Flow

### Primary User Journey

```
1. Landing Page
   ↓ [Click "Start Optimization"]
   
2. Dashboard (Initial State)
   ↓ [Adjust Parameters] (optional)
   ↓ [Select Algorithm Mode]
   ↓ [Click Play]
   
3. Algorithm Execution
   ├─→ Map updates in real-time
   ├─→ DP table shows state transitions
   ├─→ Timeline progresses
   └─→ Commentary bubbles appear
   ↓ [Algorithm completes]
   
4. Results Screen
   ↓ [View Analytics]
   ↓ [Option 1: Try Again] → Back to 2
   ↓ [Option 2: Learn More] → Learning Section
   ↓ [Option 3: Share Results]
   
5. Learning Section (Optional)
   ├─→ Module 1: Problem
   ├─→ Module 2: Graph
   ├─→ Module 3: Constraints
   ├─→ Module 4: DP
   ├─→ Module 5: Solution
   └─→ Module 6: Applications
   ↓ [Back to Dashboard]
```

### Secondary Flows

**Mobile Experience:**
- Simplified single-column layout
- Swipeable timeline
- Collapsible control panel
- Touch-friendly controls

**Accessibility:**
- Keyboard navigation (Tab, Space, Arrow keys)
- Screen reader support (ARIA labels)
- High contrast mode toggle
- Reduced motion option

---

## 📊 Success Metrics

### Judging Criteria Alignment

| Criterion | Weight | Our Implementation | Score Target |
|-----------|--------|-------------------|--------------|
| **Visualization & Creativity** | 60% | - Cinematic glassmorphic UI<br>- Smooth Framer Motion animations<br>- Interactive map with real-time updates<br>- DP table visualization<br>- Modern Family theming | 55+/60 |
| **Clarity & Explanation** | 20% | - Step-by-step learning modules<br>- Tooltips on every element<br>- Multi-modal explanations<br>- Code correlation view | 18+/20 |
| **Technical Correctness** | 20% | - Proper DP implementation<br>- Time window validation<br>- Multiple algorithm options<br>- Edge case handling | 19+/20 |
| **Total** | **100%** | | **92+/100** |

### Analytics Tracking

```typescript
// Track user engagement
const metrics = {
  averageSessionDuration: '8 minutes',
  algorithmsRun: 'number of simulations',
  learningModulesCompleted: 'completion rate',
  shareRate: 'social shares / total users',
  mobileVsDesktop: 'device breakdown'
};
```

---

## 📅 Timeline & Milestones

### Phase 1: Foundation (Days 1-2)

- [ ] Project setup (Next.js, TypeScript, Tailwind)
- [ ] Install dependencies (Framer Motion, Zustand, etc.)
- [ ] Create basic folder structure
- [ ] Design system setup (colors, fonts, components)
- [ ] Landing page implementation
- [ ] Navbar & Footer

**Deliverable:** Working landing page with navigation

---

### Phase 2: Core Visualization (Days 3-5)

- [ ] Map canvas component (React Flow setup)
- [ ] House node components with animations
- [ ] Route edge rendering
- [ ] Basic TSP-DP algorithm implementation
- [ ] Zustand state management
- [ ] Control panel UI
- [ ] Playback controls

**Deliverable:** Interactive map with manual node placement

---

### Phase 3: Algorithm Integration (Days 6-7)

- [ ] Connect algorithm to visualization
- [ ] Real-time state updates
- [ ] DP table visualization
- [ ] Timeline component
- [ ] Time window constraint checking
- [ ] Animation synchronization

**Deliverable:** Fully animated algorithm execution

---

### Phase 4: Polish & Narrative (Days 8-9)

- [ ] Character commentary system
- [ ] Sound effects integration
- [ ] Results/analytics screen
- [ ] Learning modules (all 6)
- [ ] End screen with confetti
- [ ] Mobile responsiveness
- [ ] Accessibility improvements

**Deliverable:** Complete user experience

---

### Phase 5: Testing & Deployment (Day 10)

- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] Documentation
- [ ] Vercel deployment
- [ ] Demo video recording
- [ ] Final submission

**Deliverable:** Production-ready app + demo video

---

## 🎯 Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Algorithm complexity too high | High | Start with simpler greedy, add DP incrementally |
| Animation performance issues | Medium | Use React.memo, lazy loading, Web Workers |
| Scope creep | High | Prioritize P0/P1 features, defer P2/P3 |
| Time constraints | High | Daily milestones, MVP-first approach |
| Learning curve (Three.js) | Medium | Make 3D mode optional (P3) |

---

## 📚 Appendix

### Glossary

- **TSP:** Traveling Salesman Problem
- **DP:** Dynamic Programming
- **Bitmask:** Binary representation of visited nodes
- **Time Window:** Valid time range for visiting a house
- **Preference Score:** Client satisfaction metric (0-10)
- **Glassmorphism:** UI design style with frosted glass effect

### References

- [TSP with Time Windows (Research Paper)](https://example.com)
- [Dynamic Programming Tutorial](https://example.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [React Flow Docs](https://reactflow.dev/)

### Modern Family Character Guide

**Phil Dunphy:**
- Occupation: Real estate agent
- Personality: Optimistic, enthusiastic, sometimes clueless
- Catchphrase: "Phil's-osophy"
- Role: Protagonist of our visualization

**Claire Dunphy:**
- Occupation: CEO (later seasons)
- Personality: Type-A, organized, perfectionist
- Role: Voice of reason / critic

**Luke Dunphy:**
- Personality: Dim-witted but lovable
- Role: Comic relief

**Haley Dunphy:**
- Personality: Fashion-focused, social media savvy
- Role: Modern/tech perspective

**Alex Dunphy:**
- Personality: Genius, competitive
- Role: Technical explanations

---

## ✅ Acceptance Criteria Checklist

### Functional Requirements

- [ ] User can input N houses with coordinates and time windows
- [ ] Algorithm correctly solves TSP with time window constraints
- [ ] Visualization shows step-by-step execution
- [ ] User can pause, resume, and reset simulation
- [ ] DP table updates in real-time
- [ ] Timeline syncs with algorithm progress
- [ ] Results screen shows accurate metrics
- [ ] Learning modules explain core concepts
- [ ] Mobile responsive (320px - 1920px)
- [ ] Works on Chrome, Firefox, Safari, Edge

### Non-Functional Requirements

- [ ] Page load time < 3 seconds
- [ ] Animation runs at 60 FPS
- [ ] Lighthouse score > 90
- [ ] WCAG 2.1 AA compliant
- [ ] No console errors
- [ ] TypeScript strict mode passes
- [ ] All components have unit tests
- [ ] E2E tests cover critical paths

---

**Document Version:** 1.0  
**Last Updated:** October 30, 2025  
**Next Review:** Post-Hackathon Retrospective

---

*"In the Dunphy house, we don't just solve problems — we optimize them with style!"* — Phil Dunphy (probably)

// Core types for the TSP visualization

export interface House {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  timeWindow: { start: number; end: number }; // minutes since 8am
  preference: number; // 0-10 score
  status: 'available' | 'visited' | 'locked';
  description?: string;
}

export interface Route {
  from: string;
  to: string;
  distance: number; // km
  travelTime: number; // minutes
  active: boolean;
  optimal: boolean;
}

export interface DPStep {
  mask: number;
  last: number;
  prev: number;
  score: number;
  timestamp: number;
}

export interface TSPResult {
  path: number[];
  totalDistance: number;
  totalSatisfaction: number;
  timeElapsed: number;
  steps: DPStep[];
  dpTable: number[][];
}

export interface Commentary {
  character: 'Phil' | 'Claire' | 'Luke' | 'Haley' | 'Alex';
  trigger: 'start' | 'good_decision' | 'bad_decision' | 'completion' | 'random';
  text: string;
  emotion: 'happy' | 'confused' | 'annoyed' | 'proud';
}

export interface SimulationState {
  houses: House[];
  routes: Route[];
  currentNode: number;
  visitedMask: number;
  algorithm: 'dp' | 'greedy' | 'branch-bound';
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  dpTable: number[][];
  currentDPState: [number, number];
  totalDistance: number;
  totalSatisfaction: number;
  timeElapsed: number;
}

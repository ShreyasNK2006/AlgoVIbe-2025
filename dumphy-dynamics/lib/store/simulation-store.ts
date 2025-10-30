import { create } from 'zustand';
import { House, Route, SimulationState } from '../types';
import { sampleHouses } from '../constants';

interface SimulationStore extends SimulationState {
  // Actions
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  setSpeed: (speed: number) => void;
  setAlgorithm: (algorithm: 'dp' | 'greedy' | 'branch-bound') => void;
  updatePosition: (node: number, mask: number) => void;
  setHouses: (houses: House[]) => void;
  updateHouseStatus: (id: string, status: 'available' | 'visited' | 'locked') => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  // Initial state
  houses: sampleHouses,
  routes: [],
  currentNode: -1,
  visitedMask: 0,
  algorithm: 'dp',
  isRunning: false,
  isPaused: false,
  speed: 1,
  dpTable: [],
  currentDPState: [0, 0],
  totalDistance: 0,
  totalSatisfaction: 0,
  timeElapsed: 0,

  // Actions
  startSimulation: () => set((state) => ({
    isRunning: true,
    isPaused: false
  })),

  pauseSimulation: () => set((state) => ({
    isPaused: !state.isPaused
  })),

  resetSimulation: () => set((state) => ({
    houses: state.houses.map(h => ({ ...h, status: 'available' as const })),
    routes: [],
    currentNode: -1,
    visitedMask: 0,
    isRunning: false,
    isPaused: false,
    dpTable: [],
    currentDPState: [0, 0],
    totalDistance: 0,
    totalSatisfaction: 0,
    timeElapsed: 0
  })),

  setSpeed: (speed: number) => set({ speed }),

  setAlgorithm: (algorithm) => set({ algorithm }),

  updatePosition: (node: number, mask: number) => set((state) => ({
    currentNode: node,
    visitedMask: mask,
    houses: state.houses.map((h, i) => ({
      ...h,
      status: (mask & (1 << i)) ? 'visited' : h.status
    }))
  })),

  setHouses: (houses: House[]) => set({ houses }),

  updateHouseStatus: (id: string, status) => set((state) => ({
    houses: state.houses.map(h => 
      h.id === id ? { ...h, status } : h
    )
  }))
}));

import { House, TSPResult, DPStep } from '../types';

export interface TSPInput {
  houses: House[];
  startTime: number; // minutes since 8am
  travelSpeed: number; // km/h
}

export class TSPSolver {
  private n: number;
  private houses: House[];
  private dist: number[][];
  private timeWindows: [number, number][];
  private preferences: number[];
  private dp: number[][];
  private parent: number[][][]; // Changed from [number, number][] to number[][][]
  private steps: DPStep[];
  private travelSpeed: number;
  private startTime: number;

  constructor(input: TSPInput) {
    this.houses = input.houses;
    this.n = input.houses.length;
    this.travelSpeed = input.travelSpeed;
    this.startTime = input.startTime;
    this.steps = [];
    
    // Initialize distance matrix
    this.dist = Array(this.n).fill(0).map(() => Array(this.n).fill(0));
    this.calculateDistances();
    
    // Extract time windows and preferences
    this.timeWindows = input.houses.map(h => [h.timeWindow.start, h.timeWindow.end] as [number, number]);
    this.preferences = input.houses.map(h => h.preference);
    
    // Initialize DP table
    const maxMask = 1 << this.n;
    this.dp = Array(maxMask).fill(0).map(() => Array(this.n).fill(-Infinity));
    this.parent = Array(maxMask).fill(0).map(() => 
      Array(this.n).fill(null).map(() => [-1, -1] as [number, number])
    );
  }

  private calculateDistances(): void {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (i === j) {
          this.dist[i][j] = 0;
        } else {
          const dx = this.houses[i].coordinates.x - this.houses[j].coordinates.x;
          const dy = this.houses[i].coordinates.y - this.houses[j].coordinates.y;
          // Euclidean distance, scaled to approximate km
          this.dist[i][j] = Math.sqrt(dx * dx + dy * dy) / 100;
        }
      }
    }
  }

  private getTravelTime(from: number, to: number): number {

    if (from ==  -1) return 0;
    // Convert km to travel time in minutes
    return (this.dist[from][to] / this.travelSpeed) * 60;
  }

  private isTimeWindowValid(currentTime: number, houseIndex: number): boolean {
    const [start, end] = this.timeWindows[houseIndex];
    return currentTime >= start && currentTime <= end;
  }

  private calculateScore(
    mask: number,
    from: number,
    to: number,
    currentTime: number
  ): { score: number; valid: boolean; newTime: number } {
    // Calculate arrival time
    const travelTime = this.getTravelTime(from, to);
    const arrivalTime = currentTime + travelTime;
    
    // Check time window constraint
    const [start, end] = this.timeWindows[to];
    
    if (arrivalTime > end) {
      return { score: -Infinity, valid: false, newTime: arrivalTime };
    }
    
    // Wait if arriving early
    const visitTime = Math.max(arrivalTime, start);
    
    // Assume 30 minutes per showing
    const showingDuration = 30;
    const newTime = visitTime + showingDuration;
    
    // Calculate score: preference bonus - distance penalty
    const distancePenalty = from === -1 ? 0 : this.dist[from][to] * 0.5;
    const preferenceBonus = this.preferences[to] * 10;
    const score = preferenceBonus - distancePenalty;
    
    return { score, valid: true, newTime };
  }

  solve(): TSPResult {
    // Initialize: start from each house
    for (let i = 0; i < this.n; i++) {
      const mask = 1 << i;
      const result = this.calculateScore(0, -1, i, this.startTime);
      if (result.valid) {
        this.dp[mask][i] = result.score;
      }
    }

    // DP: iterate through all subsets
    const maxMask = 1 << this.n;
    
    for (let mask = 0; mask < maxMask; mask++) {
      for (let last = 0; last < this.n; last++) {
        // Skip if last is not in the mask
        if (!(mask & (1 << last))) continue;
        
        // Skip if this state is unreachable
        if (this.dp[mask][last] === -Infinity) continue;
        
        // Try extending to each unvisited house
        for (let next = 0; next < this.n; next++) {
          // Skip if next is already visited
          if (mask & (1 << next)) continue;
          
          const newMask = mask | (1 << next);
          
          // Estimate current time (simplified)
          const currentTime = this.startTime + this.countBits(mask) * 45;
          
          const result = this.calculateScore(mask, last, next, currentTime);
          
          if (result.valid) {
            const newScore = this.dp[mask][last] + result.score;
            
            if (newScore > this.dp[newMask][next]) {
              this.dp[newMask][next] = newScore;
              this.parent[newMask][next] = [mask, last];
              
              // Record step for visualization
              this.steps.push({
                mask: newMask,
                last: next,
                prev: last,
                score: newScore,
                timestamp: Date.now()
              });
            }
          }
        }
      }
    }

    return this.reconstructPath();
  }

  private countBits(n: number): number {
    let count = 0;
    while (n) {
      count += n & 1;
      n >>= 1;
    }
    return count;
  }

  private reconstructPath(): TSPResult {
    const fullMask = (1 << this.n) - 1;
    
    // Find the best ending state
    let bestScore = -Infinity;
    let bestLast = -1;
    
    for (let i = 0; i < this.n; i++) {
      if (this.dp[fullMask][i] > bestScore) {
        bestScore = this.dp[fullMask][i];
        bestLast = i;
      }
    }

    // Reconstruct path
    const path: number[] = [];
    let currentMask = fullMask;
    let currentLast = bestLast;
    
    while (currentLast !== -1) {
      path.unshift(currentLast);
      const [prevMask, prevLast] = this.parent[currentMask][currentLast];
      currentMask = prevMask;
      currentLast = prevLast;
    }

    // Calculate total distance
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += this.dist[path[i]][path[i + 1]];
    }

    return {
      path,
      totalDistance,
      totalSatisfaction: Math.max(0, bestScore),
      timeElapsed: path.length * 45, // Approximate
      steps: this.steps,
      dpTable: this.dp
    };
  }
}

// Greedy algorithm for comparison
export function greedyTSP(input: TSPInput): TSPResult {
  const { houses, startTime, travelSpeed } = input;
  const n = houses.length;
  const visited = new Set<number>();
  const path: number[] = [];
  let currentTime = startTime;
  let totalDistance = 0;
  let totalSatisfaction = 0;

  // Calculate distances
  const dist = (i: number, j: number): number => {
    const dx = houses[i].coordinates.x - houses[j].coordinates.x;
    const dy = houses[i].coordinates.y - houses[j].coordinates.y;
    return Math.sqrt(dx * dx + dy * dy) / 100;
  };

  // Start from house 0
  let current = 0;
  visited.add(0);
  path.push(0);
  totalSatisfaction += houses[0].preference * 10;

  while (visited.size < n) {
    let bestNext = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < n; i++) {
      if (visited.has(i)) continue;

      const travelTime = (dist(current, i) / travelSpeed) * 60;
      const arrivalTime = currentTime + travelTime;
      const [start, end] = [houses[i].timeWindow.start, houses[i].timeWindow.end];

      if (arrivalTime <= end) {
        const score = houses[i].preference - dist(current, i);
        if (score > bestScore) {
          bestScore = score;
          bestNext = i;
        }
      }
    }

    if (bestNext === -1) break; // No valid next house

    visited.add(bestNext);
    path.push(bestNext);
    totalDistance += dist(current, bestNext);
    totalSatisfaction += houses[bestNext].preference * 10;
    currentTime += (dist(current, bestNext) / travelSpeed) * 60 + 30; // +30 for showing
    current = bestNext;
  }

  return {
    path,
    totalDistance,
    totalSatisfaction,
    timeElapsed: currentTime - startTime,
    steps: [],
    dpTable: []
  };
}

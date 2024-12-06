import { MiningReward, NetworkStats } from '../types/mining';

// Simulated network difficulty adjustment
const BASE_DIFFICULTY = 1000;
const MAX_DIFFICULTY = 5000;
const DIFFICULTY_ADJUSTMENT_RATE = 0.1;

export function calculateNetworkStats(): NetworkStats {
  const now = Date.now();
  // Simulate network congestion based on time of day
  const hourOfDay = new Date(now).getHours();
  const congestionFactor = 1 + Math.sin((hourOfDay / 24) * Math.PI) * 0.5;
  
  const difficulty = Math.floor(
    BASE_DIFFICULTY + (MAX_DIFFICULTY - BASE_DIFFICULTY) * congestionFactor
  );
  
  return {
    difficulty,
    blockTime: 15000, // 15 seconds
    networkHashRate: difficulty * 1000,
    activeMiners: Math.floor(100 + Math.random() * 50), // Random number of active miners
  };
}

export function simulateMining(
  currentDifficulty: number,
  duration: number
): MiningReward | null {
  // Probability of successful mining based on difficulty
  const successProbability = 1 / (currentDifficulty / BASE_DIFFICULTY);
  
  if (Math.random() < successProbability) {
    const baseReward = 0.01; // Base reward in tokens
    const difficultyBonus = 1 + (currentDifficulty - BASE_DIFFICULTY) / MAX_DIFFICULTY;
    
    return {
      tokens: Number((baseReward * difficultyBonus).toFixed(4)),
      timestamp: Date.now(),
      difficulty: currentDifficulty,
    };
  }
  
  return null;
}
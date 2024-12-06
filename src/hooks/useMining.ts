import { useState, useEffect, useCallback } from 'react';
import { MiningStats, MiningReward } from '../types/mining';
import { calculateNetworkStats, simulateMining } from '../utils/mining';

export function useMining() {
  const [isMining, setIsMining] = useState(false);
  const [stats, setStats] = useState<MiningStats>({
    totalTokens: 0,
    lastMiningTime: null,
    difficulty: calculateNetworkStats().difficulty,
    hashRate: 0,
  });
  const [miningHistory, setMiningHistory] = useState<MiningReward[]>([]);

  const startMining = useCallback(() => {
    setIsMining(true);
  }, []);

  const stopMining = useCallback(() => {
    setIsMining(false);
  }, []);

  useEffect(() => {
    if (!isMining) return;

    const miningInterval = setInterval(() => {
      const networkStats = calculateNetworkStats();
      const reward = simulateMining(networkStats.difficulty, 1000);

      if (reward) {
        setStats(prev => ({
          ...prev,
          totalTokens: prev.totalTokens + reward.tokens,
          lastMiningTime: reward.timestamp,
          difficulty: networkStats.difficulty,
          hashRate: Math.random() * 100 + 50, // Simulated hash rate
        }));

        setMiningHistory(prev => [...prev, reward].slice(-10));
      }
    }, 1000);

    return () => clearInterval(miningInterval);
  }, [isMining]);

  return {
    isMining,
    stats,
    miningHistory,
    startMining,
    stopMining,
  };
}
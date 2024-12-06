export interface MiningStats {
  totalTokens: number;
  lastMiningTime: number | null;
  difficulty: number;
  hashRate: number;
}

export interface MiningReward {
  tokens: number;
  timestamp: number;
  difficulty: number;
}

export interface NetworkStats {
  difficulty: number;
  blockTime: number;
  networkHashRate: number;
  activeMiners: number;
}
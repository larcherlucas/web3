export type TrendStrength = 'strong' | 'moderate' | 'weak';
export type TrendDirection = 'bullish' | 'bearish' | 'neutral';

export interface MarketTrend {
  direction: TrendDirection;
  strength: TrendStrength;
  reason: string;
}

export interface InvestmentAdvice {
  etfId: string;
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string[];
  trends: MarketTrend[];
  timestamp: number;
}

export interface AlertConfig {
  id: string;
  etfId: string;
  type: 'price' | 'volume' | 'trend';
  condition: 'above' | 'below';
  value: number;
  enabled: boolean;
}
export interface ETFData {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  previousPrice: number;
  dayChange: number;
  dayChangePercentage: number;
  volume: number;
  marketCap: number;
  historicalData: PricePoint[];
}

export interface PricePoint {
  timestamp: number;
  price: number;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  threshold: number;
  type: 'above' | 'below';
  triggered: boolean;
}
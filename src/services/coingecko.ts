import axios from 'axios';
import { ETFData, PricePoint } from '../types/etf';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const CACHE_DURATION = 30000; // 30 seconds

interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

let cachedData: ETFData[] | null = null;
let lastFetchTime = 0;

async function fetchMarketData(): Promise<CoinGeckoMarketData[]> {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 4,
        sparkline: true,
        ids: 'bitcoin,ethereum,solana,cardano',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching from CoinGecko:', error);
    throw new Error('Failed to fetch market data');
  }
}

function processHistoricalData(prices: number[]): PricePoint[] {
  const now = Date.now();
  const timeInterval = 3600000; // 1 hour in milliseconds
  
  return prices.map((price, index) => ({
    timestamp: now - (prices.length - 1 - index) * timeInterval,
    price,
  }));
}

function transformMarketData(data: CoinGeckoMarketData[]): ETFData[] {
  return data.map(coin => ({
    id: coin.id,
    name: `${coin.name} ETF`,
    symbol: coin.symbol.toUpperCase(),
    currentPrice: coin.current_price,
    previousPrice: coin.current_price - (coin.price_change_24h || 0),
    dayChange: coin.price_change_24h || 0,
    dayChangePercentage: coin.price_change_percentage_24h || 0,
    volume: coin.total_volume,
    marketCap: coin.market_cap,
    historicalData: processHistoricalData(coin.sparkline_in_7d.price),
  }));
}

export async function getETFData(): Promise<ETFData[]> {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const marketData = await fetchMarketData();
    cachedData = transformMarketData(marketData);
    lastFetchTime = now;
    return cachedData;
  } catch (error) {
    // If cache exists but is stale, return it during API failure
    if (cachedData) {
      console.warn('Using stale cache due to API failure');
      return cachedData;
    }
    throw error;
  }
}
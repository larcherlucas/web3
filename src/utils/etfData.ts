import { ETFData, PricePoint } from '../types/etf';
import { subHours, getTime } from 'date-fns';

const ETF_LIST = [
  { id: 'btc-etf', name: 'Bitcoin ETF', symbol: 'BTCETF', basePrice: 45000 },
  { id: 'eth-etf', name: 'Ethereum ETF', symbol: 'ETHETF', basePrice: 2500 },
  { id: 'web3-etf', name: 'Web3 Index ETF', symbol: 'WEB3', basePrice: 100 },
  { id: 'defi-etf', name: 'DeFi Index ETF', symbol: 'DEFI', basePrice: 75 },
];

function generateHistoricalData(basePrice: number, hours: number): PricePoint[] {
  const data: PricePoint[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = getTime(subHours(now, i));
    const volatility = 0.02; // 2% volatility
    const randomChange = (Math.random() - 0.5) * volatility;
    const price = basePrice * (1 + randomChange);
    data.push({ timestamp, price });
  }

  return data;
}

function calculateDayChange(historicalData: PricePoint[]): {
  dayChange: number;
  dayChangePercentage: number;
} {
  const current = historicalData[historicalData.length - 1].price;
  const previous = historicalData[0].price;
  const dayChange = current - previous;
  const dayChangePercentage = (dayChange / previous) * 100;

  return { dayChange, dayChangePercentage };
}

export function generateETFData(): ETFData[] {
  return ETF_LIST.map(({ id, name, symbol, basePrice }) => {
    const historicalData = generateHistoricalData(basePrice, 24);
    const { dayChange, dayChangePercentage } = calculateDayChange(historicalData);
    const currentPrice = historicalData[historicalData.length - 1].price;
    const previousPrice = historicalData[historicalData.length - 2].price;

    return {
      id,
      name,
      symbol,
      currentPrice,
      previousPrice,
      dayChange,
      dayChangePercentage,
      volume: Math.random() * 1000000 + 500000,
      marketCap: currentPrice * 1000000,
      historicalData,
    };
  });
}
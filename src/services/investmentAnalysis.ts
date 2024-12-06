import { ETFData } from '../types/etf';
import { InvestmentAdvice, MarketTrend, TrendDirection, TrendStrength } from '../types/advice';

function analyzePriceMovement(
  currentPrice: number,
  previousPrice: number,
  dayChangePercentage: number
): MarketTrend {
  const priceChange = (currentPrice - previousPrice) / previousPrice;
  
  let direction: TrendDirection = 'neutral';
  let strength: TrendStrength = 'weak';
  let reason = '';

  if (Math.abs(dayChangePercentage) < 1) {
    direction = 'neutral';
    reason = 'Price movement is minimal';
  } else if (dayChangePercentage > 0) {
    direction = 'bullish';
    reason = `Price increased by ${dayChangePercentage.toFixed(2)}% in 24h`;
  } else {
    direction = 'bearish';
    reason = `Price decreased by ${Math.abs(dayChangePercentage).toFixed(2)}% in 24h`;
  }

  if (Math.abs(dayChangePercentage) > 10) {
    strength = 'strong';
  } else if (Math.abs(dayChangePercentage) > 5) {
    strength = 'moderate';
  }

  return { direction, strength, reason };
}

function analyzeVolume(volume: number, marketCap: number): MarketTrend {
  const volumeToMarketCap = volume / marketCap;
  let direction: TrendDirection = 'neutral';
  let strength: TrendStrength = 'weak';
  let reason = '';

  if (volumeToMarketCap > 0.2) {
    direction = 'bullish';
    strength = 'strong';
    reason = 'Exceptionally high trading volume relative to market cap';
  } else if (volumeToMarketCap > 0.1) {
    direction = 'bullish';
    strength = 'moderate';
    reason = 'Above average trading volume';
  } else if (volumeToMarketCap < 0.01) {
    direction = 'bearish';
    strength = 'moderate';
    reason = 'Low trading volume indicates weak market interest';
  } else {
    reason = 'Normal trading volume levels';
  }

  return { direction, strength, reason };
}

function generateAdvice(etf: ETFData, trends: MarketTrend[]): InvestmentAdvice {
  const bullishCount = trends.filter(t => t.direction === 'bullish').length;
  const bearishCount = trends.filter(t => t.direction === 'bearish').length;
  const strongSignals = trends.filter(t => t.strength === 'strong').length;
  
  let action: 'buy' | 'sell' | 'hold' = 'hold';
  let confidence = 0.5;
  const reasoning: string[] = [];

  if (bullishCount > bearishCount && strongSignals > 0) {
    action = 'buy';
    confidence = 0.6 + (strongSignals * 0.1);
    reasoning.push('Strong positive market indicators');
    reasoning.push('Above average trading volume');
  } else if (bearishCount > bullishCount && strongSignals > 0) {
    action = 'sell';
    confidence = 0.6 + (strongSignals * 0.1);
    reasoning.push('Strong negative market indicators');
    reasoning.push('Consider reducing position');
  } else {
    reasoning.push('Mixed or neutral market signals');
    reasoning.push('Monitor for clearer trends');
  }

  return {
    etfId: etf.id,
    symbol: etf.symbol,
    action,
    confidence,
    reasoning,
    trends,
    timestamp: Date.now(),
  };
}

export function analyzeETF(etf: ETFData): InvestmentAdvice {
  const trends: MarketTrend[] = [
    analyzePriceMovement(etf.currentPrice, etf.previousPrice, etf.dayChangePercentage),
    analyzeVolume(etf.volume, etf.marketCap),
  ];

  return generateAdvice(etf, trends);
}
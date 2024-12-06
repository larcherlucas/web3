import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ETFData } from '../../types/etf';
import { PriceChart } from './PriceChart';
import { InvestmentAdvicePanel } from './InvestmentAdvicePanel';
import { analyzeETF } from '../../services/investmentAnalysis';

interface ETFCardProps {
  etf: ETFData;
}

export function ETFCard({ etf }: ETFCardProps) {
  const isPositive = etf.dayChangePercentage >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  const advice = analyzeETF(etf);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{etf.name}</h3>
          <p className="text-gray-500">{etf.symbol}</p>
        </div>
        <div className={`${bgColor} ${changeColor} px-3 py-1 rounded-full flex items-center space-x-1`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{etf.dayChangePercentage.toFixed(2)}%</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold">
          ${etf.currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className={`${changeColor} text-sm`}>
          {isPositive ? '+' : ''}${etf.dayChange.toFixed(2)} today
        </p>
      </div>

      <div className="h-[300px] mb-6">
        <PriceChart
          data={etf.historicalData}
          color={isPositive ? '#16a34a' : '#dc2626'}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Volume (24h)</p>
          <p className="font-semibold">
            ${etf.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Market Cap</p>
          <p className="font-semibold">
            ${etf.marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      <InvestmentAdvicePanel advice={advice} />
    </div>
  );
}
import React from 'react';
import { InvestmentAdvice, MarketTrend } from '../../types/advice';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface InvestmentAdvicePanelProps {
  advice: InvestmentAdvice;
}

function TrendBadge({ trend }: { trend: MarketTrend }) {
  const getColor = () => {
    if (trend.direction === 'bullish') return 'text-green-600 bg-green-50';
    if (trend.direction === 'bearish') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getIcon = () => {
    if (trend.direction === 'bullish') return <TrendingUp className="w-4 h-4" />;
    if (trend.direction === 'bearish') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getColor()}`}>
      {getIcon()}
      <span className="text-sm capitalize">{trend.strength}</span>
    </div>
  );
}

export function InvestmentAdvicePanel({ advice }: InvestmentAdvicePanelProps) {
  const getActionColor = () => {
    switch (advice.action) {
      case 'buy': return 'bg-green-500';
      case 'sell': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Investment Advice</h3>
        <div className={`${getActionColor()} text-white px-4 py-1 rounded-full uppercase text-sm font-bold`}>
          {advice.action}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-600 mb-2">Confidence Level</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2"
              style={{ width: `${advice.confidence * 100}%` }}
            />
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-2">Market Trends</p>
          <div className="flex flex-wrap gap-2">
            {advice.trends.map((trend, index) => (
              <TrendBadge key={index} trend={trend} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-2">Reasoning</p>
          <ul className="space-y-2">
            {advice.reasoning.map((reason, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">
              This is automated analysis based on market data. Always conduct your own research
              before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';
import { PricePoint } from '../../types/etf';

interface PriceChartProps {
  data: PricePoint[];
  color?: string;
}

export function PriceChart({ data, color = '#3B82F6' }: PriceChartProps) {
  const formattedData = data.map(point => ({
    ...point,
    formattedTime: format(point.timestamp, 'HH:mm'),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="formattedTime"
          interval="preserveStartEnd"
          minTickGap={30}
        />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip
          formatter={(value: number) => [
            `$${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            'Price',
          ]}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
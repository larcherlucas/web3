import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../types/blockchain';
import { fetchLatestTransactions } from '../utils/ethereum';

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateTransactions = async () => {
      try {
        setError(null);
        const txs = await fetchLatestTransactions(5);
        if (txs.length > 0) {
          setTransactions(txs);
        }
      } catch (err) {
        setError('Failed to fetch blockchain data. Please try again later.');
        console.error('Error updating transactions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    updateTransactions();
    const interval = setInterval(updateTransactions, 15000);
    return () => clearInterval(interval);
  }, []);

  const chartData = transactions.map((tx, index) => ({
    name: `Tx ${index + 1}`,
    value: parseFloat(tx.value),
  }));

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Live Transaction Dashboard</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Transaction Volume</h3>
        <div className="h-64">
          {transactions.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No transaction data available
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>
        </div>
        
        {isLoading ? (
          <div className="p-6 text-center">Loading transactions...</div>
        ) : transactions.length > 0 ? (
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.hash} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Hash</p>
                    <p className="font-mono text-sm">{tx.hash.substring(0, 20)}...</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Value</p>
                    <p className="font-semibold">{parseFloat(tx.value).toFixed(4)} ETH</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No transactions available
          </div>
        )}
      </div>
    </div>
  );
}
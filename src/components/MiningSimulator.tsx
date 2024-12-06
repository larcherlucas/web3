import React from 'react';
import { useMining } from '../hooks/useMining';
import { Play, Square, Activity, Clock, Database, Cpu } from 'lucide-react';

export function MiningSimulator() {
  const { isMining, stats, miningHistory, startMining, stopMining } = useMining();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">ETF Mining Simulator</h2>
          <button
            onClick={isMining ? stopMining : startMining}
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              isMining
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
          >
            {isMining ? (
              <>
                <Square className="w-4 h-4" />
                <span>Stop Mining</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Mining</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Database className="w-4 h-4" />
              <span>Total Tokens</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalTokens.toFixed(4)}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Activity className="w-4 h-4" />
              <span>Hash Rate</span>
            </div>
            <p className="text-2xl font-bold">{stats.hashRate.toFixed(2)} H/s</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Difficulty</span>
            </div>
            <p className="text-2xl font-bold">{stats.difficulty}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>Last Mining</span>
            </div>
            <p className="text-2xl font-bold">
              {stats.lastMiningTime
                ? new Date(stats.lastMiningTime).toLocaleTimeString()
                : '-'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Mining History</h3>
          <div className="space-y-2">
            {miningHistory.map((reward, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-white rounded"
              >
                <span className="text-gray-600">
                  {new Date(reward.timestamp).toLocaleTimeString()}
                </span>
                <span className="font-semibold">+{reward.tokens} tokens</span>
                <span className="text-sm text-gray-500">
                  Difficulty: {reward.difficulty}
                </span>
              </div>
            ))}
            {miningHistory.length === 0 && (
              <p className="text-center text-gray-500">No mining history yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
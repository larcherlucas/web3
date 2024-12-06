import React, { useState } from 'react';
import { useEthereum } from '../hooks/useEthereum';

export function DAppDemo() {
  const { isConnected, account, balance, network, connectWallet } = useEthereum();
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Interactive DApp Demo</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Wallet Connection</h3>
        
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Connected Account</p>
              <p className="font-mono">{account}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Balance</p>
              <p className="font-semibold">{balance} ETH</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Network</p>
              <p className="font-semibold">{network}</p>
            </div>
          </div>
        )}
      </div>

      {isConnected && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Message Storage Demo</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store a Message
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a message to store on-chain"
              />
            </div>
            
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => alert('This is a demo. In a real DApp, this would store the message on-chain.')}
            >
              Store Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
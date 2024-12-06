import React from 'react';
import { Blocks, Lock, Share2 } from 'lucide-react';

export function Introduction() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Understanding Blockchain Technology
      </h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <Blocks className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Decentralized</h3>
          <p className="text-gray-600">
            No single entity controls the network. It's maintained by a distributed
            network of computers worldwide.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <Lock className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure</h3>
          <p className="text-gray-600">
            Cryptography ensures that transactions are secure and immutable once
            recorded on the blockchain.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <Share2 className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Transparent</h3>
          <p className="text-gray-600">
            All transactions are public and can be verified by anyone on the
            network.
          </p>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">How Blockchain Works</h2>
        <p className="mb-4">
          A blockchain is a distributed database that maintains a continuously
          growing list of records called blocks. Each block contains a timestamp
          and a link to the previous block, forming a chain of information.
        </p>
        
        <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Blocks contain multiple transactions and a reference to the previous block</li>
          <li>Miners validate transactions and create new blocks</li>
          <li>Smart contracts are self-executing contracts with terms directly written into code</li>
          <li>Consensus mechanisms ensure all network participants agree on the state of the blockchain</li>
        </ul>
      </div>
    </div>
  );
}
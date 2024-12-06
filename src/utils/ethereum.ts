import { ethers } from 'ethers';
import type { Transaction } from '../types/blockchain';

const FALLBACK_PROVIDERS = [
  'https://eth-mainnet.public.blastapi.io',
  'https://rpc.ankr.com/eth',
  'https://cloudflare-eth.com'
];

export async function getProvider(): Promise<ethers.JsonRpcProvider> {
  for (const url of FALLBACK_PROVIDERS) {
    try {
      const provider = new ethers.JsonRpcProvider(url);
      await provider.getBlockNumber(); // Test the connection
      return provider;
    } catch (error) {
      console.warn(`Failed to connect to ${url}, trying next provider...`);
    }
  }
  throw new Error('Failed to connect to any Ethereum provider');
}

export async function fetchLatestTransactions(count: number = 5): Promise<Transaction[]> {
  try {
    const provider = await getProvider();
    const blockNumber = await provider.getBlockNumber();
    const block = await provider.getBlock(blockNumber);
    
    if (!block?.transactions?.length) {
      throw new Error('No transactions found in the latest block');
    }

    const transactions = await Promise.all(
      block.transactions.slice(0, count).map(async (txHash) => {
        try {
          const tx = await provider.getTransaction(txHash);
          if (!tx) throw new Error(`Transaction ${txHash} not found`);
          
          return {
            hash: tx.hash,
            from: tx.from,
            to: tx.to || '',
            value: ethers.formatEther(tx.value),
            timestamp: Date.now()
          };
        } catch (error) {
          console.warn(`Failed to fetch transaction ${txHash}:`, error);
          return null;
        }
      })
    );

    return transactions.filter((tx): tx is Transaction => tx !== null);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}
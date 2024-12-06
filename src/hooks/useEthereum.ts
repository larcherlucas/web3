import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import type { BlockchainState } from '../types/blockchain';

export function useEthereum() {
  const [state, setState] = useState<BlockchainState>({
    isConnected: false,
    account: null,
    balance: '0',
    network: '',
  });

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(accounts[0]);

        setState({
          isConnected: true,
          account: accounts[0],
          balance: ethers.formatEther(balance),
          network: network.name,
        });
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setState(prev => ({ ...prev, account: accounts[0] }));
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return { ...state, connectWallet };
}
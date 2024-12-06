export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

export interface BlockchainState {
  isConnected: boolean;
  account: string | null;
  balance: string;
  network: string;
}

export interface SmartContractGuide {
  title: string;
  description: string;
  code: string;
  explanation: string;
}
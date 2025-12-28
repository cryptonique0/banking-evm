'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';

interface Web3ContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  balance: string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState('0');

  const connectWallet = useCallback(async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        const newProvider = new ethers.BrowserProvider((window as any).ethereum);
        const newSigner = await newProvider.getSigner();
        
        setProvider(newProvider);
        setSigner(newSigner);
        setAccount(accounts[0]);
        setIsConnected(true);

        // Get balance
        const balance = await newProvider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
    setBalance('0');
  }, []);

  const value: Web3ContextType = {
    account,
    provider,
    signer,
    isConnected,
    connectWallet,
    disconnectWallet,
    balance,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

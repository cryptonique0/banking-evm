'use client';

import React from 'react';
import { useWeb3 } from '@/contexts/Web3Context';

export const WalletConnect: React.FC = () => {
  const { account, isConnected, connectWallet, disconnectWallet, balance } = useWeb3();

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <>
          <div className="text-sm">
            <p className="font-semibold text-gray-900">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
            <p className="text-gray-600">{balance} ETH</p>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

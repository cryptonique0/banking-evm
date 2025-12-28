'use client';

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWeb3 } from '@/contexts/Web3Context';

const mockData = [
  { month: 'Jan', value: 1000 },
  { month: 'Feb', value: 1200 },
  { month: 'Mar', value: 1100 },
  { month: 'Apr', value: 1400 },
  { month: 'May', value: 1600 },
  { month: 'Jun', value: 1800 },
];

export const Dashboard: React.FC = () => {
  const { account, balance, isConnected } = useWeb3();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = async () => {
    if (!depositAmount || !isConnected) return;
    try {
      const response = await fetch('/api/deposits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user-123',
          amount: parseFloat(depositAmount),
          token: 'ETH',
          txHash: '0x' + Math.random().toString(16).slice(2),
        }),
      });
      if (response.ok) {
        setDepositAmount('');
        alert('Deposit initiated!');
      }
    } catch (error) {
      console.error('Deposit error:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !isConnected) return;
    try {
      const response = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user-123',
          amount: parseFloat(withdrawAmount),
          token: 'ETH',
          txHash: '0x' + Math.random().toString(16).slice(2),
        }),
      });
      if (response.ok) {
        setWithdrawAmount('');
        alert('Withdrawal initiated!');
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">DeFi Bank Dashboard</h1>
          {isConnected && (
            <p className="text-gray-400">Connected: {account?.slice(0, 6)}...{account?.slice(-4)}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-white">{balance} ETH</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Deposits</h3>
            <p className="text-3xl font-bold text-green-400">2.5 ETH</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Withdrawals</h3>
            <p className="text-3xl font-bold text-red-400">1.2 ETH</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <h3 className="text-white font-semibold mb-4">Balance History</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <h3 className="text-white font-semibold mb-4">Transaction Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <h3 className="text-white font-semibold mb-4">Deposit</h3>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Amount in ETH"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-400 border border-white border-opacity-20"
              />
              <button
                onClick={handleDeposit}
                disabled={!isConnected || !depositAmount}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-500 transition"
              >
                Deposit
              </button>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
            <h3 className="text-white font-semibold mb-4">Withdraw</h3>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Amount in ETH"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-400 border border-white border-opacity-20"
              />
              <button
                onClick={handleWithdraw}
                disabled={!isConnected || !withdrawAmount}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-500 transition"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

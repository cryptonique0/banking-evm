import { render, screen } from '@testing-library/react';
import { Dashboard } from '@/components/Dashboard';
import { Web3Provider } from '@/contexts/Web3Context';

jest.mock('@/contexts/Web3Context', () => ({
  ...jest.requireActual('@/contexts/Web3Context'),
  useWeb3: () => ({
    account: '0x123456...abcdef',
    balance: '2.5',
    isConnected: true,
  }),
}));

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    render(
      <Web3Provider>
        <Dashboard />
      </Web3Provider>
    );
    expect(screen.getByText('DeFi Bank Dashboard')).toBeInTheDocument();
  });

  it('displays balance information', () => {
    render(
      <Web3Provider>
        <Dashboard />
      </Web3Provider>
    );
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
  });

  it('has deposit and withdrawal forms', () => {
    render(
      <Web3Provider>
        <Dashboard />
      </Web3Provider>
    );
    expect(screen.getByText('Deposit')).toBeInTheDocument();
    expect(screen.getByText('Withdraw')).toBeInTheDocument();
  });
});

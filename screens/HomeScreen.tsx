
import React from 'react';
import { useAppContext } from '../context/AppContext';
import type { Screen, Transaction } from '../types';
import { SettingsIcon } from '../components/icons';

interface HomeScreenProps {
  setScreen: (screen: Screen) => void;
}

const TransactionItemPreview: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const isCredit = transaction.type === 'deposit' || transaction.type === 'transfer-in';
  const amountColor = isCredit ? 'text-green-600' : 'text-[#111618]';
  const amountPrefix = isCredit ? '+' : '-';

  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="font-medium text-sm text-[#111618]">{transaction.description}</p>
        <p className="text-xs text-[#617c89]">{new Date(transaction.date).toLocaleDateString()}</p>
      </div>
      <p className={`font-medium text-sm ${amountColor}`}>
        {amountPrefix}${transaction.amount.toFixed(2)}
      </p>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ setScreen }) => {
  const { currentUser, getAccount, getTransactions } = useAppContext();
  const account = currentUser ? getAccount(currentUser.id) : null;
  const balance = account ? account.balance : 0;
  const recentTransactions = currentUser ? getTransactions(currentUser.id).slice(0, 3) : [];

  return (
    <>
      <div className="flex items-center bg-white p-4 pb-2 justify-between">
        <div className="w-12 shrink-0"></div>
        <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Account
        </h2>
        <div className="flex w-12 shrink-0 items-center justify-end">
          <button
            onClick={() => setScreen('Settings')}
            className="flex items-center justify-center h-12 bg-transparent text-[#111618] p-0"
          >
            <SettingsIcon />
          </button>
        </div>
      </div>
      <h2 className="text-[#111618] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h2>
      <p className="text-[#617c89] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Available balance</p>

      <div className="flex justify-center">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
          <button
            onClick={() => setScreen('Deposit')}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#13a4ec] text-white text-sm font-bold leading-normal tracking-[0.015em] grow"
          >
            <span className="truncate">Deposit</span>
          </button>
          <button
            onClick={() => setScreen('Withdraw')}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em] grow"
          >
            <span className="truncate">Withdraw</span>
          </button>
        </div>
      </div>
      <div className="flex px-4 py-3 justify-center">
        <button
          onClick={() => setScreen('Transfer')}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f3f4] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Transfer</span>
        </button>
      </div>

      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-[#111618] text-base font-bold">Recent Transactions</h3>
            <button onClick={() => setScreen('History')} className="text-[#13a4ec] text-sm font-bold">View all</button>
        </div>
        <div className="rounded-lg bg-[#f0f3f4] p-4">
            {recentTransactions.length > 0 ? (
                recentTransactions.map((tx, index) => (
                    <div key={tx.id} className={index < recentTransactions.length - 1 ? 'border-b border-gray-300' : ''}>
                        <TransactionItemPreview transaction={tx} />
                    </div>
                ))
            ) : (
                <p className="text-center text-sm text-[#617c89] py-4">No recent transactions.</p>
            )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;


import React from 'react';
import { useAppContext } from '../context/AppContext';
import type { Screen, Transaction } from '../types';
import { ArrowLeftIcon } from '../components/icons';

interface HistoryScreenProps {
  setScreen: (screen: Screen) => void;
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const isCredit = transaction.type === 'deposit' || transaction.type === 'transfer-in';
  const amountColor = isCredit ? 'text-green-600' : 'text-[#111618]';
  const amountPrefix = isCredit ? '+' : '-';

  return (
    <div className="flex justify-between items-center py-4 border-b border-[#f0f3f4]">
      <div>
        <p className="font-medium text-[#111618]">{transaction.description}</p>
        <p className="text-sm text-[#617c89]">{new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <p className={`font-bold ${amountColor}`}>
        {amountPrefix}${transaction.amount.toFixed(2)}
      </p>
    </div>
  );
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({ setScreen }) => {
  const { currentUser, getTransactions } = useAppContext();
  const transactions = currentUser ? getTransactions(currentUser.id) : [];

  return (
    <div>
      <div className="flex items-center bg-white p-4 pb-2 justify-between">
        <button onClick={() => setScreen('Home')} className="text-[#111618] flex size-12 shrink-0 items-center -ml-2">
          <ArrowLeftIcon />
        </button>
        <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Transaction History</h2>
      </div>
      <div className="px-4">
        {transactions.length > 0 ? (
          transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
        ) : (
          <p className="text-center text-[#617c89] mt-8">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;

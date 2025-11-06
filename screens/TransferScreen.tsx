
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Screen } from '../types';
import { ArrowLeftIcon } from '../components/icons';

interface TransferScreenProps {
  setScreen: (screen: Screen) => void;
}

const TransferScreen: React.FC<TransferScreenProps> = ({ setScreen }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const { currentUser, transfer } = useAppContext();

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    if (!currentUser || !recipient || isNaN(transferAmount) || transferAmount <= 0) {
      setMessage('Please fill in all fields with valid values.');
      return;
    }
    
    const result = transfer(currentUser.id, recipient, transferAmount);
    setMessage(result.message);

    if (result.success) {
      setRecipient('');
      setAmount('');
      setTimeout(() => {
        setMessage('');
        setScreen('Home');
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center bg-white p-4 pb-2 justify-between">
          <button onClick={() => setScreen('Home')} className="text-[#111618] flex size-12 shrink-0 items-center">
            <ArrowLeftIcon />
          </button>
          <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Transfer</h2>
        </div>
        <div className="px-4 py-3">
          <input
            placeholder="Recipient Username (a, b, or c)"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-14 placeholder:text-[#617c89] p-4 text-base font-normal leading-normal"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div className="px-4 py-3">
          <input
            type="number"
            placeholder="Amount"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-14 placeholder:text-[#617c89] p-4 text-base font-normal leading-normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {message && <p className={`text-center mt-2 ${message.startsWith('Success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
      </div>
      <div className="px-4 py-3 fixed bottom-20 left-0 right-0">
        <button
          onClick={handleTransfer}
          className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#13a4ec] text-white text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
          disabled={!recipient || !amount || parseFloat(amount) <= 0}
        >
          <span className="truncate">Transfer</span>
        </button>
      </div>
    </div>
  );
};

export default TransferScreen;

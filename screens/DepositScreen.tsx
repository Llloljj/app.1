
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Screen } from '../types';
import { ArrowLeftIcon } from '../components/icons';

interface DepositScreenProps {
  setScreen: (screen: Screen) => void;
}

const DepositScreen: React.FC<DepositScreenProps> = ({ setScreen }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const { currentUser, deposit } = useAppContext();

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (!currentUser || isNaN(depositAmount) || depositAmount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }
    deposit(currentUser.id, depositAmount);
    setMessage(`Successfully deposited $${depositAmount.toFixed(2)}.`);
    setAmount('');
    setTimeout(() => {
        setMessage('');
        setScreen('Home');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center bg-white p-4 pb-2 justify-between">
          <button onClick={() => setScreen('Home')} className="text-[#111618] flex size-12 shrink-0 items-center">
            <ArrowLeftIcon />
          </button>
          <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Deposit</h2>
        </div>
        <div className="px-4 py-3">
            <input
              type="number"
              placeholder="Enter amount"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-14 placeholder:text-[#617c89] p-4 text-base font-normal leading-normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
        </div>
        {message && <p className="text-center text-green-600 mt-2">{message}</p>}
      </div>
       <div className="px-4 py-3 fixed bottom-20 left-0 right-0">
          <button
            onClick={handleDeposit}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#13a4ec] text-white text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <span className="truncate">Deposit</span>
          </button>
        </div>
    </div>
  );
};

export default DepositScreen;

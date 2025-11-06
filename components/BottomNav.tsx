
import React from 'react';
import type { Screen } from '../types';
import { HomeIcon, DepositIcon, WithdrawIcon, TransferIcon, HistoryIcon } from './icons';

interface BottomNavProps {
  activeScreen: Screen;
  setScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  label: Screen;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const color = isActive ? 'text-[#111618]' : 'text-[#617c89]';

  return (
    <button onClick={onClick} className={`flex flex-1 flex-col items-center justify-end gap-1 ${color}`}>
      <div className={`${color} flex h-8 items-center justify-center`}>
        {icon}
      </div>
      <p className={`${color} text-xs font-medium leading-normal tracking-[0.015em]`}>{label}</p>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setScreen }) => {
  return (
    <div className="flex gap-2 border-t border-[#f0f3f4] bg-white px-4 pb-3 pt-2">
      <NavItem
        label="Home"
        icon={<HomeIcon filled={activeScreen === 'Home'} />}
        isActive={activeScreen === 'Home'}
        onClick={() => setScreen('Home')}
      />
      <NavItem
        label="Deposit"
        icon={<DepositIcon filled={activeScreen === 'Deposit'} />}
        isActive={activeScreen === 'Deposit'}
        onClick={() => setScreen('Deposit')}
      />
      <NavItem
        label="Withdraw"
        icon={<WithdrawIcon filled={activeScreen === 'Withdraw'} />}
        isActive={activeScreen === 'Withdraw'}
        onClick={() => setScreen('Withdraw')}
      />
      <NavItem
        label="Transfer"
        icon={<TransferIcon filled={activeScreen === 'Transfer'} />}
        isActive={activeScreen === 'Transfer'}
        onClick={() => setScreen('Transfer')}
      />
      <NavItem
        label="History"
        icon={<HistoryIcon filled={activeScreen === 'History'} />}
        isActive={activeScreen === 'History'}
        onClick={() => setScreen('History')}
      />
    </div>
  );
};

export default BottomNav;

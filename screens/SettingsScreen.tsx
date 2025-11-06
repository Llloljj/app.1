
import React from 'react';
import { useAppContext } from '../context/AppContext';
import type { Screen } from '../types';
import { ArrowLeftIcon } from '../components/icons';

interface SettingsScreenProps {
  setScreen: (screen: Screen) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setScreen }) => {
  const { logout, currentUser } = useAppContext();

  return (
    <div>
      <div className="flex items-center bg-white p-4 pb-2 justify-between">
         <button onClick={() => setScreen('Home')} className="text-[#111618] flex size-12 shrink-0 items-center -ml-2">
            <ArrowLeftIcon />
          </button>
        <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Settings</h2>
      </div>
      <div className="p-4 text-center">
        <p className="mb-4">Logged in as: <strong>{currentUser?.username}</strong></p>
        <button
          onClick={logout}
          className="flex min-w-[84px] w-full max-w-sm mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-red-500 text-white text-base font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;

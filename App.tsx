
import React, { useState } from 'react';
import { useAppContext } from './context/AppContext';
import type { Screen } from './types';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DepositScreen from './screens/DepositScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import TransferScreen from './screens/TransferScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const { currentUser } = useAppContext();
  const [screen, setScreen] = useState<Screen>('Home');

  if (!currentUser) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'Home':
        return <HomeScreen setScreen={setScreen} />;
      case 'Deposit':
        return <DepositScreen setScreen={setScreen} />;
      case 'Withdraw':
        return <WithdrawScreen setScreen={setScreen} />;
      case 'Transfer':
        return <TransferScreen setScreen={setScreen} />;
      case 'History':
        return <HistoryScreen setScreen={setScreen} />;
      case 'Settings':
        return <SettingsScreen setScreen={setScreen} />;
      default:
        return <HomeScreen setScreen={setScreen} />;
    }
  };

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="flex-grow pb-24">
         {renderScreen()}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNav activeScreen={screen} setScreen={setScreen} />
      </div>
    </div>
  );
};

export default App;

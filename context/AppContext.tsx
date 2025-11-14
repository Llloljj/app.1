import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, Account, Transaction, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: 1, username: 'a', password: '1' },
  { id: 2, username: 'b', password: '2' },
  { id: 3, username: 'c', password: '3' },
];

const initialAccounts: Record<number, Account> = {
  1: { userId: 1, balance: 2450.00 },
  2: { userId: 2, balance: 5300.75 },
  3: { userId: 3, balance: 120.50 },
};

const initialTransactions: Transaction[] = [
  { id: '1', userId: 1, type: 'deposit', amount: 500, date: new Date('2023-10-26T10:00:00Z').toISOString(), description: 'Paycheck' },
  { id: '2', userId: 1, type: 'withdraw', amount: 50, date: new Date('2023-10-27T12:30:00Z').toISOString(), description: 'ATM Withdrawal' },
  { id: '3', userId: 1, type: 'transfer-out', amount: 100, date: new Date('2023-10-28T09:15:00Z').toISOString(), description: "Transfer to user 'b'" },
  { id: '4', userId: 2, type: 'transfer-in', amount: 100, date: new Date('2023-10-28T09:15:00Z').toISOString(), description: "Transfer from user 'a'" },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [accounts, setAccounts] = useState<Record<number, Account>>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const getAccount = (userId: number) => {
    return accounts[userId];
  };

  const getTransactions = (userId: number): Transaction[] => {
    return transactions
      .filter(tx => tx.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const deposit = (userId: number, amount: number) => {
    setAccounts(prevAccounts => {
      const newBalance = prevAccounts[userId].balance + amount;
      return {
        ...prevAccounts,
        [userId]: { ...prevAccounts[userId], balance: newBalance },
      };
    });
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      userId,
      type: 'deposit',
      amount,
      date: new Date().toISOString(),
      description: 'User deposit'
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const withdraw = (userId: number, amount: number): boolean => {
    if (accounts[userId].balance >= amount) {
      setAccounts(prevAccounts => {
        const newBalance = prevAccounts[userId].balance - amount;
        return {
          ...prevAccounts,
          [userId]: { ...prevAccounts[userId], balance: newBalance },
        };
      });
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        userId,
        type: 'withdraw',
        amount,
        date: new Date().toISOString(),
        description: 'User withdrawal'
      };
      setTransactions(prev => [...prev, newTransaction]);
      return true;
    }
    return false;
  };

  const transfer = (fromUserId: number, toUsername: string, amount: number) => {
    const fromAccount = accounts[fromUserId];
    if (fromAccount.balance < amount) {
      return { success: false, message: 'Insufficient funds.' };
    }

    const toUser = users.find(u => u.username === toUsername);
    if (!toUser) {
      return { success: false, message: 'Recipient not found.' };
    }
    
    if (toUser.id === fromUserId) {
        return { success: false, message: 'Cannot transfer to yourself.' };
    }

    setAccounts(prevAccounts => {
      const newFromBalance = prevAccounts[fromUserId].balance - amount;
      const newToBalance = prevAccounts[toUser.id].balance + amount;
      return {
        ...prevAccounts,
        [fromUserId]: { ...prevAccounts[fromUserId], balance: newFromBalance },
        [toUser.id]: { ...prevAccounts[toUser.id], balance: newToBalance },
      };
    });
    
    const date = new Date().toISOString();
    const fromUser = users.find(u => u.id === fromUserId);
    const fromTransaction: Transaction = {
      id: crypto.randomUUID(),
      userId: fromUserId,
      type: 'transfer-out',
      amount,
      date,
      description: `Transfer to user '${toUsername}'`
    };
    const toTransaction: Transaction = {
      id: crypto.randomUUID(),
      userId: toUser.id,
      type: 'transfer-in',
      amount,
      date,
      description: `Transfer from user '${fromUser?.username}'`
    };
    setTransactions(prev => [...prev, fromTransaction, toTransaction]);

    return { success: true, message: 'Transfer successful!' };
  };


  const value = {
    currentUser,
    users,
    accounts,
    login,
    logout,
    getAccount,
    getTransactions,
    deposit,
    withdraw,
    transfer,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

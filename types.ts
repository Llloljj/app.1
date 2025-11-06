
export interface User {
  id: number;
  username: string;
  password?: string;
}

export interface Account {
  userId: number;
  balance: number;
}

export type TransactionType = 'deposit' | 'withdraw' | 'transfer-out' | 'transfer-in';

export interface Transaction {
  id: string;
  userId: number;
  type: TransactionType;
  amount: number;
  date: string; // ISO string
  description: string;
}

export type Screen = 'Home' | 'Deposit' | 'Withdraw' | 'Transfer' | 'History' | 'Settings';

export interface AppContextType {
  currentUser: User | null;
  users: User[];
  accounts: Record<number, Account>;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  getAccount: (userId: number) => Account | undefined;
  getTransactions: (userId: number) => Transaction[];
  deposit: (userId: number, amount: number) => void;
  withdraw: (userId: number, amount: number) => boolean;
  transfer: (fromUserId: number, toUsername: string, amount: number) => { success: boolean, message: string };
}

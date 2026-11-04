import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Transaction } from "../types/transaction";
import { sampleTransactions } from "../data/transactions";

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<
    React.SetStateAction<Transaction[]>
  >;
}

const TransactionContext =
  createContext<TransactionContextType | undefined>(undefined);

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({
  children,
}: TransactionProviderProps) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(sampleTransactions);

  return (
    <TransactionContext.Provider
      value={{ transactions, setTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    );
  }

  return context;
}

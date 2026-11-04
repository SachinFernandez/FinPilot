export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: number;
  title: string;
  category: string;
  type: TransactionType;
  amount: number;
  date: string;
  paymentMethod: string;
  notes?: string;
}

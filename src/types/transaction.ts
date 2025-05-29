export interface ITransaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    data: Date;
    type: "income" | "outcome";
}

export interface ITotal {
    totalIncome: number 
    totalOutcome: number
    total: number
  }
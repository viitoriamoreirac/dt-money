export interface ITransaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    data: Date;
    type: "INCOME" | "OUTCOME";
}

export type ITotal = {
    income: number;
    outcome: number;
    total: number;
}
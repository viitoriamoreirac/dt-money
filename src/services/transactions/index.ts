import { ITransaction } from "@/types/transaction";
import { api } from "../api"
import { toast } from "react-toastify";

export interface IPaginationParams {
  skip?: number;
  take?: number;
}

export async function getTransactions(params?: IPaginationParams) {
    try {
      const response = await api.get('/transaction', { 
        params: {
          skip: params?.skip || 0,
          take: params?.take || 10
        }
      }) 
      return response.data; 
    } catch (error) {
        throw new Error("Erro ao buscar transações: " + error);
    }
}

export async function createTransaction(transaction: ITransaction) {
    try {
        const response = await api.post('/transaction', transaction);
        toast.success("Transação adicionada com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar transação: " + error);
    }
}

export async function updateTransaction(id: string, transaction: ITransaction) {
    try {
        const response = await api.put(`/transaction/${id}`, transaction);
        toast.success("Transação atualizada com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao atualizar transação: " + error);
    }
}

export async function deleteTransaction(id: string) {
    try {
        await api.delete(`/transaction/${id}`);
        toast.success("Transação excluída com sucesso!")
        return true;
    } catch (error) {
        throw new Error("Erro ao excluir transação: " + error);
    }
}
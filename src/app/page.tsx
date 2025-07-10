"use client";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { DeleteModal } from "@/components/DeleteModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/Spinner";
import { useTransaction } from "@/hooks/transactions";
import { ITotal, ITransaction } from "@/types/transaction";

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<ITransaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationParams = {
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE
  };

  const { data: transactionsData, isLoading } = useTransaction.ListAll(paginationParams);
  const { mutateAsync: addTransaction, isPending: isCreating } = useTransaction.Create();
  const { mutateAsync: updateTransaction, isPending: isUpdating } = useTransaction.Update();
  const { mutateAsync: deleteTransaction, isPending: isDeleting } = useTransaction.Delete();

  const transactions = useMemo(() => transactionsData?.transactions || [], [transactionsData?.transactions]);
  const totalCount = transactionsData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const openModal = () => {
    setTransactionToEdit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTransactionToEdit(null);
  };

  const handleEditTransaction = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (transaction: ITransaction) => {
    setTransactionToDelete(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTransactionToDelete(null);
  };

  const handleAddModal = (newTransaction: ITransaction) => {
    addTransaction(newTransaction);
  };

  const handleUpdateModal = (id: string, updatedTransaction: ITransaction) => {
    updateTransaction({ id, transaction: updatedTransaction });
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete?.id) {
      deleteTransaction(transactionToDelete.id);
      handleCloseDeleteModal();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalTransactions: ITotal = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { totalIncome: 0, totalOutcome: 0, total: 0 };
    }
  
    return transactions.reduce(
      (acc: ITotal, { type, price }: ITransaction) => {
        if (type === 'INCOME') {
          acc.totalIncome += price;
          acc.total += price;
        } else if (type === 'OUTCOME') {
          acc.totalOutcome += price;
          acc.total -= price;
        }
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0, total: 0 }
    );
  }, [transactions]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <ToastContainer />
      <Header openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totalTransactions} />
        <Table 
          data={transactions} 
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
        {isModalOpen && (
          <FormModal 
            closeModal={handleCloseModal} 
            formTitle={transactionToEdit ? "Editar Transação" : "Adicionar Transação"}
            addTransaction={handleAddModal}
            updateTransaction={handleUpdateModal}
            transactionToEdit={transactionToEdit}
            isLoading={isCreating || isUpdating}
          />
        )}
        {isDeleteModalOpen && transactionToDelete && (
          <DeleteModal
            transaction={transactionToDelete}
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
            isLoading={isDeleting}
          />
        )}
      </BodyContainer>
    </div>
  );
}

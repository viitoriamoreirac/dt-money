"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { Table } from "@/components/Table";
import { useTransaction } from "@/hooks/transactions";
import { ITotal, ITransaction } from "@/types/transaction";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  //const [transactions, setTransactions] = useState<ITransaction[]>([])
  const { data: transactions, isLoading } = useTransaction.ListAll();
  const { mutate: createTransaction } = useTransaction.Create();
  const [isModalOpen, setIsModalOpen] = useState(false);
  /*const [totals, setTotals] = useState<ITotal>({
    income: 0,
    outcome: 0,
    total:0
  })*/

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleAddTransaction = async (transaction: ITransaction) => {
    await createTransaction(transaction);
  }

  const totalTransactions: ITotal = useMemo(() => {
    if (transactions?.length === 0 || !transactions) {
      return { total: 0, income: 0, outcome: 0 };
    }

    return transactions?.reduce((acc: ITotal, {price, type}: ITransaction) => {
      if (type === "INCOME") {
        acc.income += price;
        acc.total += price;
      } else if (type==="OUTCOME") {
        acc.outcome += price;
        acc.total -= price;
      }
      return acc;
    },{ total: 0, income: 0, outcome: 0 });

  },[transactions])
  //if (isLoading) return <Spinner />;
  return (
    <div>
      <ToastContainer />
      <Header newTransactionClick={handleOpenModal} />
      <BodyContainer>
        {<CardContainer totals={totalTransactions} />}
        {!isLoading && <Table data={transactions} /> }       
        {isLoading && <Spinner />}
      </BodyContainer>
      { isModalOpen  && <FormModal 
        formTitle="Cadastro de Transação" 
        closeModal={handleCloseModal}
        addTransaction={handleAddTransaction}
      /> }
    </div>
  );
}

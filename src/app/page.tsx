"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ITotal, ITransaction } from "@/types/transaction";
import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const defaultTransactions: ITransaction[] = [
  {
    title: "Desenvolvimento de site",
    price: 12000,
    category: "Venda",
    type: "income",
    data: new Date("2023-10-01"),
    id: '1'    
  },
  {
    title: "Aluguel do apartamento",
    price: 1200,
    category: "Casa",
    type: "outcome",
    data: new Date("2023-10-05"),
  },
  {
    title: "Despesas do carro",
    price: 600,
    category: "Transporte",
    type: "outcome",
    data: new Date("2023-10-10"),
  },
  {
    title: "Salário mensal",
    price: 5000,
    category: "Renda",
    type: "income",
    data: new Date("2023-10-15"),
  },
  {
    title: "Compra de livros",
    price: 200,
    category: "Educação",
    type: "outcome",
    data: new Date("2023-10-20"),
  },
  {
    title: "Venda de produtos online",
    price: 8000,
    category: "Venda",
    type: "income",
    data: new Date("2023-10-25"),
  },
  {
    title: "Jantar fora com amigos",
    price: 150,
    category: "Lazer",
    type: "outcome",
    data: new Date("2023-10-30"),
  }
]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>(defaultTransactions);
  //const [totalTransactions, setTotalTransactions] = useState<ITotal>({totalIncome: 0, totalOutcome: 0, total: 0})

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleAddModal = (newTransaction: ITransaction) => {
    setTransactions([...transactions, newTransaction]);
    toast.success("Transação adicionada com sucesso!");
  }

/*  useEffect(() => {
    const totals = transactions?.reduce((acc: ITotal, { type, price }: ITransaction) => {
      if (type === 'income') {
        acc.totalIncome += price;
        acc.total += price;
      } else if (type === 'outcome') {
        acc.totalOutcome += price;
        acc.total -= price;
      }
      return acc;
    }, { totalIncome: 0, totalOutcome: 0, total: 0 });
    setTotalTransactions(totals || { totalIncome: 0, totalOutcome: 0, total: 0 });
   
  },[transactions] ) */


  const totalTransactions: ITotal = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { totalIncome: 0, totalOutcome: 0, total: 0 };
    }
  
    return transactions.reduce(
      (acc: ITotal, { type, price }: ITransaction) => {
        if (type === 'income') {
          acc.totalIncome += price;
          acc.total += price;
        } else if (type === 'outcome') {
          acc.totalOutcome += price;
          acc.total -= price;
        }
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0, total: 0 }
    );
  }, [transactions]);

  return (
    <div>
      <ToastContainer />
      <Header handleNewTransaction={handleOpenModal}/>
      <BodyContainer>
        <CardContainer totals={totalTransactions}  />
        <Table data={transactions ?? []} />
        {isModalOpen && <FormModal closeModal={handleCloseModal} formTitle="Adicionar Transação" AddTransaction={handleAddModal} /> }
      </BodyContainer>      
    </div>
  );
}

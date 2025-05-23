"use client";
import { useState } from "react";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { CustomTable, Finance } from "@/components/Table";

const financesMock: Finance[] = [
  {
    title: "Desenvolvimento de site",
    price: 1200.0,
    category: "Venda",
    date: "2025-04-13",
  },
  {
    title: "Hamburguer",
    price: -59.0,
    category: "Alimentação",
    date: "2025-04-10",
  },
  {
    title: "Aluguel do apartamento",
    price: -1200.0,
    category: "Casa",
    date: "2025-03-27",
  },
  {
    title: "Computador",
    price: 5400.0,
    category: "Venda",
    date: "2025-03-15",
  },
];

export default function Home() {
  const [finances, setFinances] = useState<Finance[]>(financesMock);
  const [open, setOpen] = useState(false);

  const handleAddFinance = (finance: Finance) => {
    setFinances((prev) => [finance, ...prev]);
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Header open={open} onOpenChange={setOpen} onAddFinance={handleAddFinance} />
      <BodyContainer>
        <CardContainer finances={finances} />
        <CustomTable finances={finances} />
      </BodyContainer>
    </div>
  );
}
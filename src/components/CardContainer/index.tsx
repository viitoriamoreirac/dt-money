import { ITotal } from "@/types/transaction";
import { Card } from "../Card";


export interface ICardContainerProps {
  totals: ITotal
}

export function CardContainer({totals}: ICardContainerProps) {
    const { income, outcome, total } = totals;
    return (
        <div className="flex justify-between">
          <Card title="Entradas" value={income} type="income" />
          <Card title="Saídas" value={outcome} type="outcome" />
          <Card title="Total" value={total} type="total" />
        </div>
    )
}
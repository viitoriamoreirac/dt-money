import { Card } from "../Card";

export function CardContainer(){
    return (
        <div className="flex justify-between">
          <Card title="Entradas" value={100} type="income" />
          <Card title="Entradas" value={100} type="outcome" />
          <Card title="Entradas" value={100} type="total" />
        </div>
    )
}
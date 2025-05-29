import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";

export interface ITableProps {
    data: ITransaction[]
}

export function Table({data}: ITableProps) {   

    return (  
        <>     
        <table className="w-full mt-16 border-0 border-separate border-spacing-y-2 ">
        <thead>
            <tr>
                <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Data</th>                                   
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index} className="bg-white h-16 rounded-lg">
                    <td className="px-4 py-4 whitespace-nowrap text-title">{item.title}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-right ${item.type === 'income'? "text-income" : "text-outcome"}`}>{formatCurrency(item.price)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-table">{item.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-table">{item.data ? formatDate(new Date(item.data)) : ''}</td>                             
                </tr>
            ))}
        </tbody>
    </table>    
    </> 
    )
}
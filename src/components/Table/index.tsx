import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";

export interface ITableProps {
    data: ITransaction[];
    onEdit?: (transaction: ITransaction) => void;
    onDelete?: (transaction: ITransaction) => void;
}

export function Table({ data, onEdit, onDelete }: ITableProps) {   

    return (  
        <>     
        <table className="w-full mt-16 border-0 border-separate border-spacing-y-2 ">
        <thead>
            <tr>
                <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
                {(onEdit || onDelete) && (
                    <th className="px-4 text-left text-table-header text-base font-medium">Ações</th>
                )}
            </tr>
        </thead>
        <tbody>
            {data.map((transaction, index) => (
                <tr key={transaction.id || index} className="bg-white h-16 rounded-lg">
                    <td className="px-4 py-4 whitespace-nowrap text-title">{transaction.title}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-right ${transaction.type === 'INCOME'? "text-income" : "text-outcome"}`}>{formatCurrency(transaction.price)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-table">{transaction.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-table">{transaction.data ? formatDate(new Date(transaction.data)) : ''}</td>
                    {(onEdit || onDelete) && (
                        <td className="px-4 py-4 whitespace-nowrap text-table">
                            <div className="flex gap-2">
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(transaction)}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                        title="Editar transação"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(transaction)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                        title="Excluir transação"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    </table>    
    </> 
    )
}
import DataTable from "react-data-table-component"
import { TriangleAlert } from "lucide-react"
import { Tooltip } from "react-tooltip"
import { calculateProductStock } from "../../utils/calculateStock/calculateProductStock"
import styles from "./ProductListSales.module.css"

import { useGeneralContext } from "../../context/GeneralContext"
import { useEffect, useState } from "react"

interface ItemSale {
    id: string
    description: string
    quantity: number
    price: number
}

interface Stock {
    [id: string]: {
        stock: number
        description: string
    }
}

interface Props {
    productsData: Array<ItemSale>
    handleIncludeItem: (id: string) => void
    handleReduceItem: (id: string) => void
}

export const ProductListSales = ({ productsData, handleIncludeItem, handleReduceItem }: Props) => {

    const { getLots } = useGeneralContext()!

    const [stocks, setStocks] = useState<Stock>({})

    const columns = [
        {
            name: 'Producto',
            selector: (row: ItemSale) => row.id
        },
        {
            name: 'Descripción',
            selector: (row: ItemSale) => row.description
        },
        {
            name: 'Cantidad',
            cell: (row: ItemSale) => (
                <div className={styles["quantity-container"]}>
                    <button onClick={() => handleReduceItem(row.id)}>-</button>
                    <span>{row.quantity}</span>
                    <button onClick={() => handleIncludeItem(row.id)}>+</button>
                    {
                        stocks[row.id] && stocks[row.id].stock < row.quantity && (
                            <>
                                <TriangleAlert 
                                    color="orange"
                                    data-tooltip-id="stockWarning"
                                />
                                <Tooltip id="stockWarning" place="top">
                                    No hay suficiente stock
                                </Tooltip>
                            </>
                        )
                    }
                </div>
            )
        },
        {
            name: 'Precio unitario',
            selector: (row: ItemSale) => row.price
        },
        {
            name: 'Subtotal',
            selector: (row: ItemSale) => row.quantity * row.price
        },
    ]

    useEffect(() => {
        if (productsData.length > 0) {
            const newStocks: Stock = {}
            productsData.forEach(({ id, description }) => newStocks[id] = {
                description,
                stock: calculateProductStock(id, getLots())
            })
            setStocks(newStocks)
        }
    }, [productsData])

    return (
        <div className={styles["product-list-sales-container"]}>
            <DataTable 
                pagination
                columns={columns}
                data={productsData}
            />
        </div>
    )
}
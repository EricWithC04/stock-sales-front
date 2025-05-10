import DataTable from "react-data-table-component"
import styles from "./ProductListSales.module.css"

interface ItemSale {
    id: string
    description: string
    quantity: number
    price: number
}

export const ProductListSales = ({ productsData }: { productsData: Array<ItemSale> }) => {

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
            selector: (row: ItemSale) => row.quantity
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
import DataTable from "react-data-table-component"
import styles from "./ProductsEntryList.module.css"
import { customStylesWithPagination } from "../../styles/customStylesTables"
import { SquarePen, /* Trash2 */ } from "lucide-react"

interface Lot {
    id: number,
    productId: string
    quantity: number,
    expiresDate: string | null
}

interface Props {
    entriesData: Array<Lot>
}

export const ProductsEntryList = ({ entriesData }: Props) => {

    const columns = [
        {
            name: 'Producto',
            selector: (row: Lot) => row.productId,
        },
        {
            name: 'Cantidad',
            selector: (row: Lot) => row.quantity,
        },
        {
            name: 'Vencimiento',
            selector: (row: Lot) => row.expiresDate ? row.expiresDate : "", 
        },
        {
            name: 'Acciones',
            cell: (_row: Lot) => (
                <div className={styles["buttons-container"]}>
                    <div className={styles["edit"]}>
                        <SquarePen color="#000" />
                    </div>
                    {/* <div className={styles["delete"]}>
                        <Trash2 color="#fff" />
                    </div> */}
                </div>
            )
        }
    ]

    return (
        <div className={styles["products-entry-list-container"]}>
            <h1>Lotes Ingresados</h1>
            <DataTable 
                columns={columns}
                data={entriesData}
                pagination
                noDataComponent="Ningún lote ingresado"
                customStyles={customStylesWithPagination}
            />
        </div>
    )
}
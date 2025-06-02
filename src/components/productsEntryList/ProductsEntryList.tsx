import DataTable from "react-data-table-component"
import styles from "./ProductsEntryList.module.css"
import { customStylesWithPagination } from "../../styles/customStylesTables"

interface Props {
    entriesData: Array<any>
}

export const ProductsEntryList = ({ entriesData }: Props) => {

    const columns = [
        {
            name: 'Producto',
            selector: (row: any) => row.productId,
        },
        {
            name: 'Cantidad',
            selector: (row: any) => row.quantity,
        },
        {
            name: 'Vencimiento',
            selector: (row: any) => row.expiresDate, 
        },
        {
            name: 'Eliminar',
            selector: (row: any) => row.expiresDate,
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
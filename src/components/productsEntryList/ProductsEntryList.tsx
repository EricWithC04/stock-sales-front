import DataTable from "react-data-table-component"
import styles from "./ProductsEntryList.module.css"

interface Props {
    entriesData: Array<any>
}

export const ProductsEntryList = ({ entriesData }: Props) => {

    const columns = [
        {
            name: 'Producto',
            selector: (row: any) => row.id,
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
            <h1>Lotes a Ingresar</h1>
            <DataTable 
                columns={columns}
                data={entriesData}
            />
        </div>
    )
}
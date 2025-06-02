import { ChevronRight, SquarePen, Trash2, ShoppingCart } from "lucide-react"
import styles from "./TablesList.module.css"
import DataTable from "react-data-table-component"
import { customStylesWithPagination } from "../../styles/customStylesTables"

interface Order {
    id: number
    status: boolean
    client: string
    products: Array<{ id: string, name: string, price: number, quantity: number }>
}

interface Props {
    selectOrderToChange: (order: Order) => void
    changeTableStatus: (id: number) => void
    removeTable: (id: number) => void
    tables: Array<Order>
}

export const TablesList = ({ selectOrderToChange, changeTableStatus, removeTable, tables }: Props) => {

    const columns = [
        {
            name: "Mesa",
            selector: (row: Order) => row.id
        },
        {
            name: "Estado",
            cell: (row: Order) => (
                <div
                    onClick={() => changeTableStatus(row.id)}
                    className={`${styles["status-container"]} ${row.status ? styles["free"] : styles["occupied"]}`}
                >
                    <span>{row.status ? "Libre" : "Ocupada"}</span>
                </div>
            )
        },
        {
            name: "Cliente",
            cell: (row: Order) => row.status ? (<span className={styles["secondary"]}>-</span>) : row.client
        },
        {
            name: "Productos",
            cell: (row: Order) => (
                <>
                    {
                        row.status ? (<span className={styles["secondary"]}>Sin productos</span>) : (
                            <div className={styles["products-container"]} onClick={() => alert("Funcionalidad en desarrollo")}>
                                <span>{row.products.reduce((acc, product) => acc + product.quantity, 0)} productos</span>
                                <ChevronRight/>
                            </div>
                        )
                    }
                </>
            )
        },
        {
            name: "Total",
            selector: (row: Order) => `$${row.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}`
        },
        {
            name: "Acciones",
            grow: 2,
            cell: (row: Order) => (
                <div className={styles["button-container"]}>
                    <button 
                        className={`${row.status ? styles["unabled"] : ""}`} 
                        onClick={() => selectOrderToChange(row)}
                    >
                        <SquarePen color="#000" size={18}/> Editar
                    </button>
                    <button 
                        className={`${styles["sale"]} ${row.status ? styles["unabled"] : ""}`}
                    >
                        <ShoppingCart color="#fff" size={18}/> Vender
                    </button>
                    <button 
                        onClick={() => removeTable(row.id)}
                        className={`${styles["remove"]} ${row.status ? "" : styles["unabled"]}`}
                    >
                        <Trash2 color="#fff" size={18}/> Quitar
                    </button>
                </div>
            )
        },
    ]

    return (
        <div className={styles["table-list-container"]}>
            <DataTable
                columns={columns}
                data={tables}
                customStyles={customStylesWithPagination}
            />
        </div>
    )
}
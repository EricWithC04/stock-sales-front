import DataTable from "react-data-table-component"
import styles from "./SalesListPage.module.css"
import { ChevronDown } from "lucide-react"
import { useState } from "react";

import { useGeneralContext } from "../../context/GeneralContext";

interface Sale {
    id: number
    date: string,
    client: string,
    payMethod: string,
    products: Array<{ id: string, quantity: number }>,
    total: number
}

interface ProductInfo {
    product: string
    quantity: number
    price: number
}

const ExpandedComponent = ({ data }: { data: Sale }) => {

    const { getProductById } = useGeneralContext()!

    const columns = [
        {
            name: "Producto",
            selector: (row: ProductInfo) => row.product
        },
        {
            name: "Cantidad",
            selector: (row: ProductInfo) => row.quantity
        },
        {
            name: "Precio",
            selector: (row: ProductInfo) => row.price
        }
    ]

    const formatInfoProducts = (products: Array<{ id: string, quantity: number }>) => {
        const infoProducts: Array<ProductInfo> = []
        products.forEach(p => {
            const product: any = getProductById(p.id)
            if (product !== "Código Invalido") infoProducts.push({
                product: product.type === "Bebida" ? product.description : product.name,
                quantity: p.quantity,
                price: product.price
            })
        })
        return infoProducts
    }

    return (
        <div className={styles["info-sale"]}>
            <p>Información de la venta</p>
            <div className={styles["info-sale-header"]}>
                <div>
                    <h3>Metodo de pago:</h3>
                    <p>{data.payMethod}</p>
                </div>
                <div>
                    <h3>Fecha:</h3>
                    <p>{data.date}</p>
                </div>
                <hr />
            </div>
            <p>Productos</p>
            <DataTable 
                columns={columns}
                data={formatInfoProducts(data.products)}
            />
        </div>
    )
};

export const SalesListPage = () => {

    const [expandedRow, setExpandedRow] = useState<number | null>(null)

    const handleExpandedRow = (id: number) => {
        if (expandedRow && expandedRow === id) {
            setExpandedRow(null); // cerrar si ya está abierta
        } else {
            setExpandedRow(id); // abrir nueva
        }
    }

    const columns = [
        {
            name: "Fecha",
            selector: (row: Sale) => row.date
        },
        {
            name: "Cliente",
            selector: (row: Sale) => row.client
        },
        {
            name: "Total",
            selector: (row: Sale) => row.total
        },
        {
            name: "Detalle",
            cell: (row: Sale) => (
                <div onClick={() => handleExpandedRow(row.id)}>
                    <ChevronDown />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        },
    ]

    const data = [
        {
            id: 1,
            date: "2025/05/16",
            client: "Juán Pérez",
            payMethod: "Efectivo",
            products: [
                {
                    id: "2",
                    quantity: 1
                },
                {
                    id: "7790895005916",
                    quantity: 1
                }
            ],
            total: 7900
        },
        {
            id: 2,
            date: "2025/05/16",
            client: "María Lezcano",
            payMethod: "Transferencia",
            products: [
                {
                    id: "1002",
                    quantity: 1
                },
                {
                    id: "7790895000447",
                    quantity: 1
                }
            ],
            total: 6900
        }
    ]

    return (
        <div className={styles["sales-list-page-container"]}>
            <div className="sales-list-header">
                <input type="text" />
                <div className="actions-container">
                    <button>Imprimir</button>
                    <button>Exportar</button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data}
                expandableRows
                expandableRowsHideExpander={true}
                expandableRowsComponent={ExpandedComponent}
                expandableRowExpanded={row => expandedRow === row.id}
            />
        </div>
    )
}

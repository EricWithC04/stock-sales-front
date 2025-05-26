import { forwardRef, useEffect, useState } from "react"
import styles from "./SalesResumeModal.module.css"
import { CreditCard } from "lucide-react"

import { useGeneralContext } from "../../context/GeneralContext"
import { calculatePercent } from "../../utils/calculatePercentDiscount"

interface Sale {
    id?: number
    client: string
    products: Array<{ id: string, quantity: number }>
    total: number
    date: string
    payMethod: "Efectivo" | "Transferencia"
}

interface Props {
    closeModal: () => void
}

export const SalesResumeModal = forwardRef<HTMLDialogElement, Props> (({ closeModal }, ref) => {

    const { getSales } = useGeneralContext()!

    const [sales, setSales] = useState<Array<Sale>>([])

    const [filter, setFilter] = useState<number>(4)

    const filters = [
        "Últimos 7 dias",
        "Últimos 30 dias",
        "Últimos 90 dias",
        "Limpiar Filtros",
    ]

    useEffect(() => {
        setSales(getSales())
    }, [])

    const getSalesTransfer = (s: Array<Sale>) => {
        return s.filter((sale) => sale.payMethod === "Transferencia")
    }

    const getSalesCash = (s: Array<Sale>) => {
        return s.filter((sale) => sale.payMethod === "Efectivo")
    }

    const getTotal = (s: Array<Sale>): number => {
        return s.reduce((acc, sale) => acc + sale.total, 0)
    }

    return (
        <dialog ref={ref} className={styles["sales-resume-modal-container"]}>
            <div className={styles["data-container"]}>
                <h2>Resumen de Ingresos</h2>
                <div className={styles["filter-container"]}>
                    <h2>Filtros</h2>
                    <div className={styles["filter"]}>
                        {
                            filters.map((f, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setFilter(index+1)}
                                    className={`${filter === index+1 && index !== filters.length-1 ? styles["selected-filter"] : ""}`}
                                >{f}</button>
                            ))
                        }
                    </div>
                </div>
                <div className={styles["totals"]}>
                    <div className={styles["one-total"]}>
                        <h4>Ingresos Totales</h4>
                        <h2>$ {getTotal(sales)}</h2>
                    </div>
                    <div className={styles["one-total"]}>
                        <h4>Total de ventas</h4>
                        <h2>{sales.length}</h2>
                    </div>
                </div>
                <div className={styles["total-per-method"]}>
                    <div className={styles["title"]}>
                        <CreditCard />
                        <h2>Ingresos por Metodo de pago</h2>
                    </div>
                    <div className={styles["methods-container"]}>
                        <div className={styles["method"]}>
                            <div className={styles["method-row-up"]}>
                                <span>Transferencia</span>
                                <span className={styles["money"]}>${getTotal(getSalesTransfer(sales))}</span>
                            </div>
                            <div className={styles["method-row-down"]}>
                                <span>{getSalesTransfer(sales).length} ventas</span>
                                <span>{calculatePercent(getTotal(sales), getTotal(getSalesTransfer(sales)))}%</span>
                            </div>
                        </div>
                        <div className={styles["method"]}>
                            <div className={styles["method-row-up"]}>
                                <span>Efectivo</span>
                                <span className={styles["money"]}>${getTotal(getSalesCash(sales))}</span>
                            </div>
                            <div className={styles["method-row-down"]}>
                                <span>{getSalesCash(sales).length} Ventas</span>
                                <span>{calculatePercent(getTotal(sales), getTotal(getSalesCash(sales)))}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["buttons-container"]}>
                    <button onClick={closeModal}>Cerrar</button>
                </div>
            </div>
        </dialog>
    )
})
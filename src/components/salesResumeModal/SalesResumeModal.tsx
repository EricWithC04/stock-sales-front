import { forwardRef, useState } from "react"
import styles from "./SalesResumeModal.module.css"
import { CreditCard } from "lucide-react"

interface Props {
    closeModal: () => void
}

export const SalesResumeModal = forwardRef<HTMLDialogElement, Props> (({ closeModal }, ref) => {

    const [filter, setFilter] = useState<number>(4)

    const filters = [
        "Últimos 7 dias",
        "Últimos 30 dias",
        "Últimos 90 dias",
        "Limpiar Filtros",
    ]

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
                        <h2>$ 12700</h2>
                    </div>
                    <div className={styles["one-total"]}>
                        <h4>Total de ventas</h4>
                        <h2>4</h2>
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
                                <span className={styles["money"]}>$8000</span>
                            </div>
                            <div className={styles["method-row-down"]}>
                                <span>2 ventas</span>
                                <span>62.99%</span>
                            </div>
                        </div>
                        <div className={styles["method"]}>
                            <div className={styles["method-row-up"]}>
                                <span>Efectivo</span>
                                <span className={styles["money"]}>$4700</span>
                            </div>
                            <div className={styles["method-row-down"]}>
                                <span>2 Ventas</span>
                                <span>37.01%</span>
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
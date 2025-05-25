import { forwardRef, useState } from "react"
import styles from "./SalesResumeModal.module.css"

interface Props {
    closeModal: () => void
}

export const SalesResumeModal = forwardRef<HTMLDialogElement, Props> (({ closeModal }, ref) => {

    const [filter, setFilter] = useState<number>(4)

    const filters = [
        "Ultimos 7 dias",
        "Ultimos 30 dias",
        "Ultimos 90 dias",
        "Limpiar Filtros",
    ]

    return (
        <dialog ref={ref} className={styles["sales-resume-modal-container"]}>
            <div className={styles["data-container"]}>
                <h2>Resumen de Ingresos</h2>
                <div className={styles["filter"]}>
                    {
                        filters.map((f, index) => (
                            <button 
                                key={index}
                                onClick={() => setFilter(index+1)}
                                className={`${filter === index+1 ? styles["selected-filter"] : ""}`}
                            >{f}</button>
                        ))
                    }
                </div>
                <div className={styles["totals"]}>
                    <div className={styles["one-total"]}>
                        <h4>Ingresos Totales</h4>
                    </div>
                    <div className={styles["one-total"]}>
                        <h4>Total de ventas</h4>
                    </div>
                </div>
                <div className={styles["total-per-method"]}>
                    <h2>Ingresos por Metodo de pago</h2>
                </div>
                <div className={styles["buttons-container"]}>
                    <button onClick={closeModal}>Cerrar</button>
                </div>
            </div>
        </dialog>
    )
})
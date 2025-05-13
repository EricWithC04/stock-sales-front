import DataTable from "react-data-table-component"
import styles from "./NewOfferForm.module.css"
import { useState } from "react"

interface Product {
    id: string
    description: string
    price: number
}

export const NewOfferForm = () => {

    const [newOfferData, setNewOfferData] = useState<any>({})
    const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])

    const [errors, setErrors] = useState<Array<any>>([])
    const [errorsActive, setErrorsActive] = useState<boolean>(false)

    return (
        <form className={styles["new-offer-form-container"]}>
            <h1>Nueva Oferta</h1>
            <p>Crea una nueva oferta seleccionando los productos y el precio.</p>
            <div className={styles["fields-container"]}>
                <label>Nombre de la oferta</label>
                <input type="text" />
            </div>
            <div className={styles["fields-container"]}>
                <label>Buscar y agregar productos</label>
                <input type="text" />
            </div>
            <DataTable 
                columns={[]}
                data={[]}
            />
            <div className={styles["fields-container"]}>
                <label>Precio de la oferta</label>
                <input type="number" />
            </div>
            <div className={styles["buttons-container"]}>
                <button>Cancelar</button>
                <button>Guardar</button>
            </div>
        </form>
    )
}

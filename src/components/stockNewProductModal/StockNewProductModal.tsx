import { forwardRef, useState } from "react"
import styles from "./StockNewProductModal.module.css"

interface Props {
    closeModal: () => void
}

interface NewProductData {
    id: string
    description: string
    price: number
}

export const StockNewProductModal = forwardRef<HTMLDialogElement, Props> (({ closeModal }, ref) => {

    const [newProductData, setNewProductData] = useState<NewProductData>({
        id: "",
        description: "",
        price: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductData({
            ...newProductData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    }

    return (
        <dialog ref={ref} className={styles["stock-new-product-modal"]}>
            <form className={styles["form-container"]} onSubmit={handleSubmit}>
                <h2>Agregar nuevo producto</h2>
                <p>Complete la información del nuevo producto para agregarlo al sistema.</p>
                <div className={styles["fields-container"]}>
                    <div className={styles["form-field"]}>
                        <label>Código de barra</label>
                        <input name="id" onChange={handleChange} type="text" />
                    </div>
                    <div className={styles["form-field"]}>
                        <label>Descripción</label>
                        <input name="description" onChange={handleChange} type="text" />
                    </div>
                    <div className={styles["form-field"]}>
                        <label>Precio</label>
                        <input name="price" onChange={handleChange} type="number" />
                    </div>
                </div>
                <div className={styles["buttons-container"]}>
                    <button className={styles["cancel-button"]} onClick={closeModal}>Cancelar</button>
                    <button type="submit" className={styles["submit-button"]} onClick={closeModal}>Guardar</button>
                </div>
            </form>
        </dialog>
    )
})
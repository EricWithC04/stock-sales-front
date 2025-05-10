import { forwardRef, useState } from "react"
import styles from "./StockNewProductModal.module.css"

import { useGeneralContext } from "../../context/GeneralContext"

interface Props {
    closeModal: () => void
    notifyNewProduct?: () => void
}

interface NewProductData {
    id: string
    description: string
    price: number
}

interface NewProductDataErrors {
    id: string
    description: string
    price: string
}

export const StockNewProductModal = forwardRef<HTMLDialogElement, Props> (({ closeModal, notifyNewProduct }, ref) => {

    const { getProducts, uploadNewProduct } = useGeneralContext()!

    const [newProductData, setNewProductData] = useState<NewProductData>({
        id: "",
        description: "",
        price: 0
    })
    const [errors, setErrors] = useState<NewProductDataErrors>({
        id: "",
        description: "",
        price: ""
    })
    const [errorsActive, setErrorsActive] = useState<boolean>(false) 

    const validateErrors = (data: NewProductData) => {
        const currentErrors: NewProductDataErrors = { id: "", description: "", price: "" }

        if (!data.id.length) currentErrors.id = "Debes cargar el codigo del producto"
        else if (getProducts().find(product => product.id === data.id)) currentErrors.id = "Ya hay un producto con este codigo"
        if (!data.description.length) currentErrors.description = "Debes cargar la descripción del producto"
        if (!data.price) currentErrors.price = "Debes cargar el precio del producto"
        else if (data.price <= 0) currentErrors.price = "El precio debe ser mayor a 0"

        setErrors(currentErrors)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProduct: NewProductData = {
            ...newProductData,
            [e.target.name]: e.target.value
        }
        validateErrors(newProduct)
        setNewProductData(newProduct)
    }

    const handleSubmit = () => {
        setErrorsActive(true)

        if (!errors.id.length && !errors.description.length && !errors.price.length) {
            uploadNewProduct({ ...newProductData, stock: 0 })
            setNewProductData({ id: "", description: "", price: 0 })
            setErrorsActive(false)
            notifyNewProduct!()
            closeModal()
        }
    }

    return (
        <dialog ref={ref} className={styles["stock-new-product-modal"]}>
            <form className={styles["form-container"]}>
                <h2>Agregar nuevo producto</h2>
                <p>Complete la información del nuevo producto para agregarlo al sistema.</p>
                <div className={styles["fields-container"]}>
                    <div className={styles["form-field"]}>
                        <label>Código de barra</label>
                        <input name="id" onChange={handleChange} type="text" value={newProductData.id} />
                    </div>
                    { errorsActive && errors.id.length ? <span className={styles["error-message"]}>{errors.id}</span> : null }
                    <div className={styles["form-field"]}>
                        <label>Descripción</label>
                        <input name="description" onChange={handleChange} type="text" value={newProductData.description} />
                    </div>
                    { errorsActive && errors.description.length ? <span className={styles["error-message"]}>{errors.description}</span> : null }
                    <div className={styles["form-field"]}>
                        <label>Precio</label>
                        <input name="price" onChange={handleChange} type="number" value={newProductData.price} />
                    </div>
                    { errorsActive && errors.price.length ? <span className={styles["error-message"]}>{errors.price}</span> : null }
                </div>
                <div className={styles["buttons-container"]}>
                    <button type="button" className={styles["cancel-button"]} onClick={closeModal}>Cancelar</button>
                    <button type="button" className={styles["submit-button"]} onClick={handleSubmit}>Guardar</button>
                </div>
            </form>
        </dialog>
    )
})
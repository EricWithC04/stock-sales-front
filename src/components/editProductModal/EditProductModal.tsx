import { forwardRef, useEffect, useState } from "react"
import styles from "./EditProductModal.module.css"

import { useGeneralContext } from "../../context/GeneralContext"

interface ProductData {
    id: string
    description: string
    price?: number
    category: "Bebida" | "Ingrediente"
}

interface NewProductDataErrors {
    id: string
    description: string
    price: string
}

interface Props {
    closeModal: () => void
    notifyNewProduct?: () => void
    productToEdit: ProductData | null
}

export const EditProductModal = forwardRef<HTMLDialogElement, Props> (({ closeModal, notifyNewProduct, productToEdit }, ref) => {

    const { updateProduct, updateIngredient } = useGeneralContext()!

    const [editProductData, setEditProductData] = useState<ProductData | null>(null)
    const [errors, setErrors] = useState<NewProductDataErrors>({
        id: "",
        description: "",
        price: ""
    })
    const [errorsActive, setErrorsActive] = useState<boolean>(false)
    
    useEffect(() => {
        setEditProductData(productToEdit)
    }, [productToEdit])

    const validateErrors = (data: ProductData) => {
        const currentErrors: NewProductDataErrors = { id: "", description: "", price: "" }

        if (!data.id.length) currentErrors.id = "Debes cargar el codigo del producto"
        if (!data.description.length) currentErrors.description = "Debes cargar la descripción del producto"
        if (!data.price) currentErrors.price = "Debes cargar el precio del producto"
        else if (data.price <= 0) currentErrors.price = "El precio debe ser mayor a 0"

        setErrors(currentErrors)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProduct: ProductData = {
            ...editProductData!,
            [e.target.name]: e.target.value
        }
        validateErrors(newProduct)
        setEditProductData(newProduct)
    }

    const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProduct: ProductData = {
            ...editProductData!,
            category: e.target.value as "Bebida" | "Ingrediente"
        }
        setEditProductData(newProduct)
    }

    const handleSubmit = () => {
        setErrorsActive(true)

        if (!errors.id.length && !errors.description.length && !errors.price.length) {
            if (editProductData!.category === "Bebida") {
                updateProduct(productToEdit!.id, { 
                    id: editProductData!.id, 
                    description: editProductData!.description, 
                    type: editProductData!.category,
                    price: editProductData!.price!, 
                    stock: 0 
                })
            } else {
                updateIngredient(productToEdit!.id, { 
                    id: editProductData!.id, 
                    description: editProductData!.description,
                    type: editProductData!.category
                })
            }
            // setEditProductData(null)
            setErrorsActive(false)
            notifyNewProduct!()
            closeModal()
        }
    }

    return (
        <dialog ref={ref} className={styles["stock-new-product-modal"]}>
            {
                editProductData ? (
                    <form className={styles["form-container"]}>
                        <h2>Agregar nuevo producto</h2>
                        <p>Complete la información del nuevo producto para agregarlo al sistema.</p>
                        <div className={styles["fields-container"]}>
                            <div className={styles["form-field"]}>
                                <label>Código de barra</label>
                                <input name="id" onChange={handleChange} type="text" value={editProductData.id} />
                            </div>
                            { errorsActive && errors.id.length ? <span className={styles["error-message"]}>{errors.id}</span> : null }
                            <div className={styles["form-field"]}>
                                <label>Descripción</label>
                                <input name="description" onChange={handleChange} type="text" value={editProductData.description} />
                            </div>
                            { errorsActive && errors.description.length ? <span className={styles["error-message"]}>{errors.description}</span> : null }
                            <div className={styles["form-field"]}>
                                <label>Tipo: </label>
                                {/* <input name="price" onChange={handleChange} type="number" value={newProductData.price} /> */}
                                <select name="category" id="" defaultValue={"Bebida"} onChange={handleSelectCategory}>
                                    <option value="Bebida">Bebida</option>
                                    <option value="Ingrediente">Ingrediente</option>
                                </select>
                            </div>
                            { errorsActive && errors.price.length ? <span className={styles["error-message"]}>{errors.price}</span> : null }
                            {
                                editProductData.category === "Bebida" ? (
                                    <>
                                        <div className={styles["form-field"]}>
                                            <label>Precio</label>
                                            <input name="price" onChange={handleChange} type="number" value={editProductData.price} />
                                        </div>
                                        { errorsActive && errors.price.length ? <span className={styles["error-message"]}>{errors.price}</span> : null }
                                    </>
                                    ) : null
                            }
                        </div>
                        <div className={styles["buttons-container"]}>
                            <button type="button" className={styles["cancel-button"]} onClick={closeModal}>Cancelar</button>
                            <button type="button" className={styles["submit-button"]} onClick={handleSubmit}>Guardar</button>
                        </div>
                    </form>
                ) : <></>
            }
        </dialog>
    )
})
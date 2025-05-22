import React, { forwardRef, useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { Plus } from "lucide-react"
import styles from "./NewOfferForm.module.css"

import { useGeneralContext } from "../../context/GeneralContext"
import { Trash2 } from "lucide-react"

interface Product {
    id: string
    description: string
    price: number
    quantity: number
}

interface Drink {
    id: string
    description: string
    type?: string
    stock: number
    price: number
}

interface Food {
    id: string
    name: string
    description: string
    type?: string
    category: string
    ingredients: Array<{ id: string, quantity: number }>
    price: number
}

interface Offer {
    id: string
    name: string
    products: Array<Product>
    price: number
}

interface OfferErrors {
    name: string
    products: string
    price: string
}

interface Props {
    closeModal: () => void
    updateOffers: () => void
}

export const NewOfferForm = forwardRef<HTMLDialogElement, Props> (({ closeModal, updateOffers }, ref) => {

    const { getProductById, getOffers, uploadNewOffer } = useGeneralContext()!

    const [newOfferData, setNewOfferData] = useState<Offer>({
        id: (getOffers().length + 1001).toString(),
        name: "",
        products: [],
        price: 0
    })
    const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])

    const [productId, setProductId] = useState<string>("")

    const [errors, setErrors] = useState<OfferErrors>({
        name: "",
        products: "",
        price: "",
    })
    const [errorsActive, setErrorsActive] = useState<boolean>(false)

    const changeQuantity = (id: string, op: string) => {
        const newSelectedProducts = selectedProducts.map(p => {
            if (p.id === id) {
                return { ...p, quantity: op === "+" ? p.quantity + 1 : p.quantity > 1 ? p.quantity - 1 : 1 }
            } else return p
        })
        setSelectedProducts(newSelectedProducts)
    }

    const handleDeleteProduct = (id: string) => {
        const newSelectedProducts: Array<Product> = [] 
        selectedProducts.forEach(product => {
            if (product.id !== id) newSelectedProducts.push(product)
        })
        setSelectedProducts(newSelectedProducts)
    }

    const columns = [
        {
            name: "Producto",
            selector: (row: Product) => row.description
        },
        {
            name: "Precio",
            selector: (row: Product) => row.price
        },
        {
            name: "Cantidad",
            cell: (row: Product) => (
                <div className={styles["quantity-container"]}>
                    <button type="button" onClick={() => changeQuantity(row.id, "-")}>-</button>
                    <span>{row.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(row.id, "+")}>+</button>
                </div>
            )
        },
        {
            name: "Subtotal",
            selector: (row: Product) => row.price * row.quantity
        },
        {
            name: "",
            cell: (row: Product) => (
                <div onClick={() => handleDeleteProduct(row.id)}>
                    <Trash2 
                        color={"red"}
                    />
                </div>
            )
        },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewOfferData({
            ...newOfferData, 
            [e.target.name]: e.target.value
        })
    }

    const includeProduct = () => {
        const product = getProductById(productId) as Drink | Food | "Código Invalido"
            if (product !== "Código Invalido") {
                setProductId("")
                if (selectedProducts.find(p => p.id === product.id)) {
                    const newSelectedProducts = selectedProducts.map(p => {
                        if (p.id === product.id) return { ...p, quantity: p.quantity + 1 }
                        else return p
                    })
                    setSelectedProducts(newSelectedProducts)
                } else {
                    setSelectedProducts([
                        ...selectedProducts, 
                        { 
                            id: product.id, 
                            description: product.type === "Bebida" ? product.description : (product as Food).name, 
                            price: product.price, 
                            quantity: 1 
                        }
                    ])
                }
            } else {
                alert(product)
            }
    }

    const handleEnterProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            includeProduct()
        }
    }

    const validateErrors = (data: { products: Array<Product>, fields: { name: string, price: number } }) => {
        const currentErrors: OfferErrors = { name: "", products: "", price: "" }
        if (!data.fields.name) currentErrors.name = "El nombre de la oferta es obligatorio"
        if (!data.fields.price) currentErrors.price = "El precio de la oferta es obligatorio"
        else if (data.fields.price <= 0) currentErrors.price = "El precio debe ser mayor a 0"
        if (!data.products.length) currentErrors.products = "Debes seleccionar al menos un producto"
        return currentErrors
    }

    const handleSubmit = () => {
        const currentErrors = validateErrors({ products: selectedProducts, fields: newOfferData })
        if (currentErrors.name.length || currentErrors.products.length || currentErrors.price.length) {
            setErrorsActive(true)
            return
        }
        const newOffer = { ...newOfferData }
        const newOfferRegularPrice = selectedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0)
        const newOfferProducts: Array<{ id: string }> = []
        selectedProducts.forEach(p => {
            if (p.quantity === 1) newOfferProducts.push({ id: p.id })
            else {
                for (let i = 0; i < p.quantity; i++) {
                    newOfferProducts.push({ id: p.id })
                }
            }
        })
        const newOfferFinal = { 
            ...newOffer,
            regularPrice: newOfferRegularPrice, 
            products: newOfferProducts, 
            available: true 
        }

        uploadNewOffer(newOfferFinal)
        setNewOfferData({
            id: (getOffers().length + 1001).toString(),
            name: "",
            products: [],
            price: 0
        })
        setErrorsActive(false)
        closeModal()
        updateOffers()
    }

    useEffect(() => {
        const currentErrors = validateErrors({ products: selectedProducts, fields: newOfferData })
        setErrors(currentErrors)
    }, [newOfferData, selectedProducts])

    return (
        <dialog ref={ref} className={styles["new-offer-form-container"]}>
            <form className={styles["new-offer-form"]}>
                <h1>Nueva Oferta</h1>
                <p>Crea una nueva oferta seleccionando los productos y el precio.</p>
                <div className={styles["fields-container"]}>
                    <label>Nombre de la oferta</label>
                    <input type="text" name="name" onChange={handleChange} autoComplete="off" />
                </div>
                { errorsActive && errors.name.length ? (<div className={styles["error-message"]}>{errors.name}</div>) : null }
                <div className={styles["fields-container"]}>
                    <label>Buscar y agregar productos</label>
                    <div className={styles["search-container"]}>
                        <input 
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            onKeyDown={handleEnterProduct} 
                        />
                        <button type="button" className={styles["add-item-button"]} onClick={includeProduct}>
                            <Plus 
                                color="#fff"
                                size={22}
                            />
                        </button>
                    </div>
                </div>
                <DataTable 
                    columns={columns}
                    data={selectedProducts}
                    noDataComponent="Ningun producto seleccionado"
                />
                { errorsActive && errors.products.length ? (<div className={styles["error-message"]}>{errors.products}</div>) : null }
                <div className={styles["fields-container"]}>
                    <label>Precio de la oferta</label>
                    <input type="number" name="price" onChange={handleChange} />
                </div>
                { errorsActive && errors.price.length ? (<div className={styles["error-message"]}>{errors.price}</div>) : null }
                <div className={styles["buttons-container"]}>
                    <button type="button" onClick={closeModal} className={styles["cancel-button"]}>Cancelar</button>
                    <button type="button" onClick={handleSubmit} className={styles["submit-button"]}>Guardar</button>
                </div>
            </form>
        </dialog>
    )
})

import React, { forwardRef, useState } from "react"
import DataTable from "react-data-table-component"
import styles from "./NewOfferForm.module.css"

import { useGeneralContext } from "../../context/GeneralContext"
import { Trash2 } from "lucide-react"

interface Product {
    id: string
    description: string
    price: number
    quantity: number
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
}

export const NewOfferForm = forwardRef<HTMLDialogElement, Props> (({ closeModal }, ref) => {

    const { getProductById, getOffers, uploadNewOffer } = useGeneralContext()!

    const [newOfferData, setNewOfferData] = useState<Offer>({
        id: (getOffers().length + 1).toString(),
        name: "",
        products: [],
        price: 0
    })
    const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])

    const [productId, setProductId] = useState<string>("")

    const [errors, setErrors] = useState<Array<OfferErrors>>([])
    const [errorsActive, setErrorsActive] = useState<boolean>(false)

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
            selector: (row: Product) => row.quantity
        },
        {
            name: "Subtotal",
            selector: (row: Product) => row.price * row.quantity
        },
        {
            name: "",
            cell: (_row: Product) => (
                <div>
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

    const handleEnterProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const product = getProductById(productId)
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
                            description: product.description, 
                            price: product.price, 
                            quantity: 1 
                        }
                    ])
                }
            } else {
                alert(product)
            }
        }
    }

    const handleSubmit = () => {
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
            id: getOffers().length.toString(),
            name: "",
            products: [],
            price: 0
        })
        closeModal()
    }

    return (
        <dialog ref={ref} className={styles["new-offer-form-container"]}>
            <form className={styles["new-offer-form"]}>
                <h1>Nueva Oferta</h1>
                <p>Crea una nueva oferta seleccionando los productos y el precio.</p>
                <div className={styles["fields-container"]}>
                    <label>Nombre de la oferta</label>
                    <input type="text" name="name" onChange={handleChange} />
                </div>
                <div className={styles["fields-container"]}>
                    <label>Buscar y agregar productos</label>
                    <input 
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        onKeyDown={handleEnterProduct} 
                    />
                </div>
                <DataTable 
                    columns={columns}
                    data={selectedProducts}
                />
                <div className={styles["fields-container"]}>
                    <label>Precio de la oferta</label>
                    <input type="number" name="price" onChange={handleChange} />
                </div>
                <div className={styles["buttons-container"]}>
                    <button type="button" onClick={closeModal} >Cancelar</button>
                    <button type="button" onClick={handleSubmit}>Guardar</button>
                </div>
            </form>
        </dialog>
    )
})

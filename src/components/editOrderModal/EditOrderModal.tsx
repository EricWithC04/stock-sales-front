import { forwardRef, useState } from "react"
import styles from "./EditOrderModal.module.css"
import { Trash2 } from "lucide-react"
import { ProductBrowserSales } from "../productsBrowserSales/ProductBrowserSales"

interface Order {
    id: number
    status: boolean
    client: string
    products: Array<{ id: string, name: string, price: number, quantity: number }>
}

interface Props {
    closeModal: () => void
    selectedOrder: Order | null
    addProductOrder: (order: Order, productId: string, quantity?: number) => void
}

export const EditOrderModal = forwardRef<HTMLDialogElement, Props>(({ closeModal, selectedOrder, addProductOrder }, ref) => {

    const [quantity, setQuantity] = useState<number>(1)

    const handleIncludeItem = (productId: string) => {
        addProductOrder(selectedOrder!, productId, quantity)
        setQuantity(1)
    }

    const changeQuantity = (q: string) => {
        setQuantity(parseInt(q))
    }

    return (
        <dialog ref={ref} className={styles["edit-order-modal-container"]}>
            {
                selectedOrder ? (
                    <div className={styles["data-container"]}>
                        <h2>Editar datos de la orden - Mesa {selectedOrder.id}</h2>
                        <h3>Productos de la orden: </h3>
                        <div className={styles["products-container"]}>
                            {
                                selectedOrder.products.map((order) => (
                                    <div className={styles["product-item-container"]}>
                                        <div className={styles["item-name"]}>
                                            <h3>{order.name}</h3>
                                            <h3 className={styles["secondary"]}>x{order.quantity} - ${order.price * order.quantity}</h3>
                                        </div>
                                        <div className={styles["remove"]}>
                                            <Trash2 color="#fff" size={18} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <hr />
                        <h3>Agregar Producto:</h3>
                        <div className={styles["add-product"]}>
                            <div className={styles["product"]}>
                                <label>Producto</label>
                                <ProductBrowserSales 
                                    handleIncludeItem={handleIncludeItem} 
                                    completeWidth
                                />
                            </div>
                            <div className={styles["quantity"]}>
                                <label>Cantidad</label>
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={(e) => changeQuantity(e.target.value)} 
                                />
                            </div>
                            <button className={styles["submit-button"]}>+ Agregar</button>
                        </div>
                        <hr />
                        <div className={styles["total"]}>
                            <h2>Total:</h2>
                            <h2>${selectedOrder.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}</h2>
                        </div>
                        <div className={styles["buttons-container"]}>
                            <button className={styles["cancel-button"]} onClick={closeModal}>Cancelar</button>
                            <button className={styles["submit-button"]}>Guardar</button>
                        </div> 
                    </div>
                ) : (
                    <div></div>
                )
            }
        </dialog>
    )
})
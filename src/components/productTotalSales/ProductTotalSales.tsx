import styles from "./ProductTotalSales.module.css"

interface ItemSale {
    id: string
    description: string
    quantity: number
    price: number
}

interface Props {
    itemSales: Array<ItemSale>
    insufficientStock: boolean
    openInsufficientModal: () => void
    openSuccessModal: () => void
}

export const ProductTotalSales = ({ 
    itemSales, 
    insufficientStock, 
    openInsufficientModal, 
    openSuccessModal }: Props) => {

    const calculateTotal = (): number => {
        let total = 0
        itemSales.forEach(item => {
            total += item.quantity * item.price
        })
        return total
    }

    const handleSubmitSale = () => {
        if (insufficientStock) openInsufficientModal()
        else openSuccessModal()
    }

    return (
        <div className={styles["product-total-sales-container"]}>
            <h1>Total: {calculateTotal()}</h1>
            <button onClick={handleSubmitSale}>Registrar Venta</button>
        </div>
    )
}

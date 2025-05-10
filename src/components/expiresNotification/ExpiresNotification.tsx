import { CircleAlert } from "lucide-react"
import styles from "./ExpiresNotification.module.css"
import { getProductNameById } from "../../utils/getProductNameById"

interface Props {
    productId: string,
    quantity: number,
    expiresDate: string
}

export const ExpiresNotification = ({ productId, quantity, expiresDate }: Props) => {
    return (
        <div className={styles["notification-container"]}>
            <CircleAlert />
            <div className={styles["info"]}>
                <h3>Vencimiento Próximo</h3>
                <p>Hay un lote con {quantity} unidades de {getProductNameById(productId)} proximo a vencer!</p>
                <p>Fecha de vencimiento: {expiresDate}</p>
            </div>
        </div>
    )
}

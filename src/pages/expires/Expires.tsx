import { useEffect, useState } from "react"
import { ExpiresNotification } from "../../components/expiresNotification/ExpiresNotification"
import styles from "./Expires.module.css"
import { LoadingSpinner } from "../../components/loadingSpinner/LoadingSpinner"
import { useGeneralContext } from "../../context/GeneralContext"

interface ExpiresLot {
    product: string,
    quantity: number,
    expiresDate: string
}

export const ExpiresPage = () => {

    const { getExpiresDates } = useGeneralContext()!

    const [expiresLots, setExpiresLots] = useState<Array<ExpiresLot>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setExpiresLots(getExpiresDates())
        setLoading(false)
    }, [])

    return (
        <div className={styles["expires-container"]}>
            <h1>Proximos lotes a Vencer</h1>
            {
                loading &&
                <LoadingSpinner />
            }
            {
                !loading && expiresLots.length > 0 ? expiresLots.map(({ product, quantity, expiresDate }) => (
                    <ExpiresNotification 
                        key={product}
                        productId={product}
                        quantity={quantity}
                        expiresDate={expiresDate}
                    />
                )) : !loading && <h3>No hay ningún lote proximo a vencer!</h3>
            }
        </div>
    )
}
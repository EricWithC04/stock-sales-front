import { ClipLoader } from "react-spinners"
import styles from "./LoadingSpinner.module.css"

export const LoadingSpinner = () => {
    return (
        <div className={styles["spinner-container"]}>
            <ClipLoader 
                color={"#FF2107"}
                size={100}
            />
            <span>Cargando...</span>
        </div>
    )
}

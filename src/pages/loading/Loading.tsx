import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation"
import styles from "./Loading.module.css"

export const Loading = () => {
    return (
        <div className={styles["container"]}>
            <LoadingAnimation />
        </div>
    )
}

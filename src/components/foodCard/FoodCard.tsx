import { SquarePen, Trash2 } from "lucide-react"
import styles from "./FoodCard.module.css"

interface Props {
    name: string
    price: number
    description: string
}

export const FoodCard = ({ name, price, description }: Props) => {

    return (
        <div className={styles["food-card"]}>
            <img src="" alt="" />
            <h2>{name}</h2>
            <p>{description}</p>
            <h2>${price}</h2>
            <div className={styles["actions-container"]}>
                <div className={styles["action"]}>
                    <SquarePen 
                        color={"#000"}
                    />
                </div>
                <div className={styles["action"]}>
                    <Trash2 
                        color={"red"}
                    />
                </div>
            </div>
        </div>
    )
}
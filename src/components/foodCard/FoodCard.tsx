import { SquarePen, Trash2 } from "lucide-react"
import styles from "./FoodCard.module.css"
import defaultImage from "../../assets/defaults/defaultBurguer.png"

interface Props {
    name: string
    price: number
    description: string
    image?: string
}

export const FoodCard = ({ name, price, description, image }: Props) => {

    return (
        <div className={styles["food-card"]}>
            <div className={styles["img-container"]}>
                <img src={image ? image : defaultImage} alt={name} />
            </div>
            <div className={styles["data-container"]}>
                <h3>{name}</h3>
                <p>{description}</p>
                <h3>${price}</h3>
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
        </div>
    )
}
import styles from "./FoodList.module.css"
import { FoodCard } from "../foodCard/FoodCard"
import { useState } from "react"

export const FoodList = () => {

    const [foods, setFoods] = useState([
        {},
        {},
        {},
    ])

    return (
        <div className={styles["food-list"]}>
            <FoodCard />
            <FoodCard />
            <FoodCard />
        </div>
    )
}
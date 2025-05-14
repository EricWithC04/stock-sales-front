import styles from "./FoodList.module.css"
import { FoodCard } from "../foodCard/FoodCard"
import { useState } from "react"

export const FoodList = () => {

    const [foods, setFoods] = useState([
        {
            id: 1,
            name: "Pancho",
            description: "Salchica y Mayonesa",
            category: "Pancho",
            ingredients: [
                {
                    id: "100",
                    quantity: 1
                },
                {
                    id: "101",
                    quantity: 1
                },
                {
                    id: "110",
                    quantity: 1
                }
            ],
            price: 1500
        },
        {
            id: 2,
            name: "Super Pancho",
            description: "2 Salchicas, Mayonesa, Papas",
            category: "Pancho",
            ingredients: [
                {
                    id: "100",
                    quantity: 2
                },
                {
                    id: "101",
                    quantity: 2
                },
                {
                    id: "110",
                    quantity: 1
                }
            ],
            price: 3000
        },
        {
            id: 3,
            name: "Super Pancho Gratinado",
            description: "Super Pancho Gratinado",
            category: "Pancho",
            ingredients: [
                {
                    id: "100",
                    quantity: 2
                },
                {
                    id: "101",
                    quantity: 2
                },
                {
                    id: "105",
                    quantity: 3
                },
                {
                    id: "110",
                    quantity: 1
                }
            ],
            price: 4000
        }
    ])

    return (
        <div className={styles["food-list"]}>
            {
                foods.map(food => (
                    <FoodCard 
                        name={food.name}
                        description={food.description}
                        price={food.price}  
                    />
                ))
            }
        </div>
    )
}
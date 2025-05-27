import { useEffect, useState } from "react"
import styles from "./CategoryList.module.css"
import { CategoryCard } from "../categoryCard/CategoryCard"

import { useGeneralContext } from "../../context/GeneralContext"

import All from "../../assets/food/all.png"
import HotDog from "../../assets/food/hot-dog.png"
import Burguer from "../../assets/food/hamburger.png"
import FriedPotatoes from "../../assets/food/fried-potatoes.png"

type CategoryName = 'Todo' | 'Panchos' | 'Hamburguesas' | 'Papas Fritas';

interface Category {
    id: number
    name: string
}

interface CategoryCard {
    id: number
    name: string
    icon: string | null
    selected: boolean
}

export const CategoryList = () => {

    const { getCategories } = useGeneralContext()!

    const icons = {
        "Todo": All,
        "Panchos": HotDog,
        "Hamburguesas": Burguer,
        "Papas Fritas": FriedPotatoes
    }

    const [categories, setCategories] = useState<Array<CategoryCard>>([
        { id: 0, name: "Todo", icon: All, selected: true },
    ])

    useEffect(() => {
        const categoriesCards = getCategories().map(category => ({
            id: category.id,
            name: category.name,
            icon: icons[category.name as CategoryName],
            selected: false
        }))
        setCategories((prev) => [...prev, ...categoriesCards])
    }, [])

    const handleSelectCategory = (id: number) => {
        const newCategories = categories.map(category => {
            if (category.id === id) {
                return { ...category, selected: true }
            } else {
                return { ...category, selected: false }
            }
        })
        setCategories(newCategories)
    }

    return (
        <div className={styles["categories-list"]}>
            {
                categories.length > 0 ? categories.slice(0, 7).map(category => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        icon={category.icon}
                        selected={category.selected}
                        onClick={() => handleSelectCategory(category.id)}
                    />
                )) : null
            }
        </div>
    )
}
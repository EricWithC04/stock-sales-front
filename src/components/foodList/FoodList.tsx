import styles from "./FoodList.module.css"
import { FoodCard } from "../foodCard/FoodCard"
import { useEffect, useState } from "react"

import { useGeneralContext } from "../../context/GeneralContext"
import { FoodListPagination } from "../foodListPagination/FoodListPagination"
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner"

interface Food {
    id: string
    name: string
    description: string
    category: string
    ingredients: Array<{ id: string, quantity: number }>
    price: number
}

interface Props {
    selectedCategory: string
    categoryFlag: boolean
}

export const FoodList = ({ selectedCategory, categoryFlag }: Props) => {

    const { getFoods } = useGeneralContext()!

    const [allFoods, setAllFoods] = useState<Array<Food>>([])
    const [foods, setFoods] = useState<Array<Food>>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 6

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    
    useEffect(() => {
        setAllFoods(getFoods())
    }, [])

    useEffect(() => {
        if (allFoods.length) {
            if (selectedCategory.length) {
                const filteredFoods = allFoods.filter(f => f.category === selectedCategory)
                setFoods(filteredFoods)
            } else {
                setFoods(allFoods)
            }
        }
    }, [allFoods, selectedCategory])

    useEffect(() => {
        setCurrentPage(1)
    }, [categoryFlag])

    const handleSelectPage = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className={styles["food-list"]}>
                {
                    foods.length ? foods.slice(firstItem, lastItem).map(food => (
                        <FoodCard
                            name={food.name}
                            description={food.description}
                            price={food.price}
                        />
                    )) : <LoadingSpinner />
                }
            </div>
            <FoodListPagination 
                pagesQuantity={Math.ceil(foods.length / itemsPerPage)}
                handleSelectPage={handleSelectPage}
                currentPage={currentPage}
            />
        </>
    )
}
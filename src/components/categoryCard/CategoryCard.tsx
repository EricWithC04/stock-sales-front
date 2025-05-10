import defaultImage from "../../assets/defaults/food-default-image.png"
import styles from "./CategoryCard.module.css"

interface CategoryCardProps {
    icon: string | null
    name: string
    selected: boolean
    onClick: () => void
}

export const CategoryCard = ({ icon, name, selected, onClick }: CategoryCardProps) => {
    return (
        <div className={`${styles["category-card-container"]} ${selected ? styles["selected"] : ""}`} onClick={onClick}>
            <img src={icon ? icon : defaultImage} alt="imagen-categoria" />
            <h4>{name}</h4>
        </div>
    )
}
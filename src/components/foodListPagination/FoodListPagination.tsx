import styles from "./FoodListPagination.module.css"

interface Props {
    pagesQuantity: number
    handleSelectPage: (page: number) => void
    currentPage: number
}

export const FoodListPagination = ({ pagesQuantity, handleSelectPage, currentPage }: Props) => {

    const generatePages = (numberPages: number) => {
        const pages = []
        for (let i = 1; i <= numberPages; i++) {
            pages.push(i)
        }
        return pages
    }

    const prevPage = () => handleSelectPage(currentPage - 1)
    const nextPage = () => handleSelectPage(currentPage + 1)

    return (
        <div className={styles["pagination-container"]}>
            <button 
                className={ currentPage === 1 ? styles["disabled-button"] : "" } 
                onClick={prevPage}
            >Anterior</button>
                {
                    generatePages(pagesQuantity).map(page => (
                        <button 
                            key={page} 
                            onClick={() => handleSelectPage(page)}
                            className={ page === currentPage ? styles["selected-button"] : "" }
                        >{page}</button>
                    ))
                }
            <button 
                className={ currentPage === pagesQuantity ? styles["disabled-button"] : "" } 
                onClick={nextPage}
            >Siguiente</button>
        </div>
    )
}
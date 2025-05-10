import React, { useState } from 'react'
import styles from "./StockSearchBar.module.css"

interface Props {
    setFilter: (filter: string) => void
}

export const StockSearchBar = ({ setFilter }: Props) => {

    const [idOrName, setIdOrName] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdOrName(e.target.value)
        setFilter(idOrName)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFilter("")
        setIdOrName("")
    }

    return (
        <div className={styles["stock-search-bar-container"]}>
            <form onSubmit={handleSubmit} className={styles["stock-search-bar"]}>
                <input
                    type="text" 
                    placeholder="Buscar por nombre o código..." 
                    value={idOrName}
                    onChange={handleChange} 
                />
            </form>
        </div>
    )
}

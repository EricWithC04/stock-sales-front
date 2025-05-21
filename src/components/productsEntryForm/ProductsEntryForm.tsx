import { useState } from "react"
import DatePicker from "react-datepicker"
import styles from "./ProductsEntryForm.module.css"
import "react-datepicker/dist/react-datepicker.css";
import { getDateString } from "../../utils/getDateString";
import { useGeneralContext } from "../../context/GeneralContext";

interface LotData {
    product: string,
    quantity: number,
    expiresDate: string | null
}

interface Errors {
    product: string,
    quantity: string,
    expiresDate: string
}

interface Props {
    entryProducts: (entriesData: any) => void
    openModal: () => void
}

export const ProductsEntryForm = ({ entryProducts, openModal }: Props) => {

    const { getProducts, uploadNewLot } = useGeneralContext()!

    const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const [lotData, setLotData] = useState<LotData>({
        product: "",
        quantity: 1,
        expiresDate: null
    })
    const [errors, setErrors] = useState<Errors>({
        product: "",
        quantity: "",
        expiresDate: ""
    }) 
    const [errorsActive, setErrorsActive] = useState<boolean>(false)

    const validateIdExists = (id: string) => {
        const product = getProducts().find((product) => product.id === id)
        if (product) return true
        else return false
    }

    const validateFormErrors = (data: LotData) => {
        const currentErrors = { product: "", quantity: "", expiresDate: "" }

        if (!data.product) currentErrors.product = "Debes colocar el codigo del producto"
        if (!data.quantity) currentErrors.quantity = "Debes colocar la cantidad"
        else if (data.quantity <= 0) currentErrors.quantity = "La cantidad debe ser mayor a 0"
        if (!data.expiresDate) {
            currentErrors.expiresDate = "El campo es requerido"
            console.log(data.expiresDate);
            
        }
        else {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const selectedDate = new Date(data.expiresDate)
            selectedDate.setHours(0, 0, 0, 0)

            if (selectedDate <= today) {
                currentErrors.expiresDate = "La fecha debe ser mayor a la actual"
            }
        }
        
        setErrors(currentErrors)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLotData = {
            ...lotData,
            [e.target.name]: e.target.value
        }
        validateFormErrors(newLotData)
        setLotData(newLotData)
    }

    const handleDateChange = (date: Date | null) => {
        const newLotData = { ...lotData, expiresDate: date?.toString() ? date.toString() : null }
        validateFormErrors(newLotData)
        setLotData(newLotData)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const entryProduct = {
            id: lotData.product,
            quantity: +lotData.quantity,
            expiresDate: lotData.expiresDate
        }
        
        if (validateIdExists(entryProduct.id)) {
            setErrorsActive(true)
            if (!errors.product.length && !errors.quantity.length && !errors.expiresDate.length) {
                entryProducts(entryProduct)
                uploadNewLot({ ...entryProduct, id: Date.now(), productId: entryProduct.id })
        
                setLotData({
                    product: "",
                    quantity: 1,
                    expiresDate: null
                })
            }
        } else {
            openModal()
        }
    }

    return (
        <form className={styles["products-entry-form"]} onSubmit={handleSubmit}>
            <h1>Registro de Ingresos</h1>
            <span>Lotes que ingresan al inventario con su cantidad y fecha de vencimiento.</span>
            <div className={styles["form-container"]}>
                <div className={styles["form-field"]}>
                    <label htmlFor="product">Producto</label>
                    <input
                        name="product"
                        type="text"
                        onChange={handleChange}
                        value={lotData.product}
                        placeholder="Ingrese el código del producto"
                    />
                    { errorsActive && errors.product.length ? <span className={styles["error"]}>{errors.product}</span> : null }
                </div>
                <div className={styles["form-field"]}>
                    <label htmlFor="quantity">Cantidad</label>
                    <input name="quantity" type="number" onChange={handleChange} value={lotData.quantity} />
                    { errorsActive && errors.quantity.length ? <span className={styles["error"]}>{errors.quantity}</span> : null }
                </div>
                <div className={styles["form-field"]}>
                    <label htmlFor="expiresDate">Fecha de Vencimiento</label>
                    <DatePicker
                        showIcon
                        dateFormat="yyyy/MM/dd"
                        className={styles["date-picker"]}
                        renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth
                        }) => (
                            <div
                                style={{
                                    margin: 10,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                }}
                            >
                                <select
                                    value={date.getFullYear()}
                                    onChange={({ target: { value } }) => changeYear(parseInt(value))}
                                >
                                    {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={months[date.getMonth()]}
                                    onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                    }
                                >
                                    {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        name="expiresDate"
                        showYearDropdown
                        selected={new Date()}
                        minDate={new Date()}
                        value={lotData.expiresDate === null ? undefined : `${getDateString(new Date(lotData.expiresDate))}`}
                        placeholderText="Indica la fecha de vencimiento"
                        onChange={handleDateChange} />
                    { errorsActive && errors.expiresDate.length ? <span className={styles["error"]}>{errors.expiresDate}</span> : null }
                </div>
            </div>
            <button className={styles["submit-button"]}>Agregar Producto</button>
        </form>
    )
}

import ReceiptSvg from "../../../assets/icons/receipt.svg"

export const ReceiptIcon = ({ size = 24 }: { size: number }) => {
    return <img src={ReceiptSvg} alt="Ventas" height={size} width={size} />
}
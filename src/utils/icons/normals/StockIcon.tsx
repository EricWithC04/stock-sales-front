import StockSvg from "../../../assets/icons/inbox.svg"

export const StockIcon = ({ size = 24 }: { size: number }) => {
    return <img src={StockSvg} alt="Inventario" height={size} width={size} />
}
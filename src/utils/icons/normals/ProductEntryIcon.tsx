import ProductEntrySvg from "../../../assets/icons/archive-restore.svg"

export const ProductEntryIcon = ({ size = 24 }: { size: number }) => {
    return <img src={ProductEntrySvg} alt="Estadísticas" height={size} width={size} />
}
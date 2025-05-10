import ExpiresSvg from "../../../assets/icons/circle-alert.svg"

export const ExpiresIcon = ({ size = 24 }: { size: number }) => {
    return <img src={ExpiresSvg} alt="Estadísticas" height={size} width={size} />
}
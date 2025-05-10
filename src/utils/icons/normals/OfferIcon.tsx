import OfferSvg from "../../../assets/icons/badge-percent.svg"

export const OfferIcon = ({ size = 24 }: { size: number }) => {
    return <img src={OfferSvg} alt="Ofertas" height={size} width={size} />
}
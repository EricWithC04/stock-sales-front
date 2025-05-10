import { getDateString } from "../getDateString";

interface Lot {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
}

interface ExpiresLot {
    product: string
    quantity: number
    expiresDate: string
}

// Función para obtener suma de cantidades por producto para lotes que vencen dentro de cierto tiempo
export const calculateExpiresDates = (lots: Array<Lot>, days: number): Array<ExpiresLot> => {
    const now = new Date();

    // Definimos la cantidad de dias para el rango de fechas a considerar
    const limitDate = new Date();
    limitDate.setDate(now.getDate() + days);

    const expiresLots: Array<ExpiresLot> = [];

    lots.forEach(lot => {
        const expiresDate = new Date(lot.expiresDate!);

        if (expiresDate >= now && expiresDate <= limitDate) {
            const expiresLot: ExpiresLot | undefined = expiresLots.find(lotExpire => lotExpire.product === lot.productId && lotExpire.expiresDate === getDateString(expiresDate));
            if (!expiresLot) {
                expiresLots.push({ product: lot.productId, quantity: +lot.quantity, expiresDate: getDateString(expiresDate) });
            } else {
                expiresLot.quantity += +lot.quantity;
            }
        }
    });

    return expiresLots;
}
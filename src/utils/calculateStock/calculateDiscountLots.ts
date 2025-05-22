interface Lot {
    id: number
    productId: string
    quantity: number
    expiresDate: string | null
}

interface DiscountLot {
    id: number
    quantity: number
}

export const calculateDiscountLots = (productId: string, quantity: number, lots: Array<Lot>): Array<DiscountLot> => {
    const sortedLots = lots
        .filter(lot => lot.productId === productId)
        .sort((a, b) => new Date(a.expiresDate!).getTime() - new Date(b.expiresDate!).getTime());

    let remaining = quantity;
    const result: Array<{ id: number, quantity: number }> = [];

    for (const lot of sortedLots) {
        if (remaining <= 0) break;

        const discountedQuantity = Math.min(lot.quantity, remaining);
        result.push({ id: lot.id, quantity: discountedQuantity });
        remaining -= discountedQuantity;
    }

    return result;
};

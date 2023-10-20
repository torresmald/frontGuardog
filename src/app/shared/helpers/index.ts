export const formatCurrency = (price: Number) => {
    return Number(price).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}
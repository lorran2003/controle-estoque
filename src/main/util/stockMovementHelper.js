export const adjustStock = (currentStock, type, quantity) => {
    const operations = {
        'INPUT': (stock, qty) => stock + qty,
        'OUTPUT': (stock, qty) => stock - qty,
    }

    const adjust = operations[type]
    return adjust ? adjust(currentStock, quantity) : currentStock
}
export const getOrderId = () => {
    const timeNow = Date.now() % 10**9

    return `R${timeNow}`
}

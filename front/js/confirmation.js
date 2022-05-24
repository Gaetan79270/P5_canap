const getOrderId = () => {
    const queryString = window.location.search 
    const urlParams = new URLSearchParams(queryString) // pour récupérer l'id
    return urlParams.get("orderId");
} 

const displayOrderId = (orderId) => {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
    console.log(orderId)
}

const clearCache = () => {
    const cache = window.localStorage
    cache.clear()
}
const orderId = getOrderId()
displayOrderId(orderId)
clearCache()
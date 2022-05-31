const getOrderId = () => {
    const queryString = window.location.search 
    const urlParams = new URLSearchParams(queryString) // pour récupérer l'id
    return urlParams.get("orderId");  //on prend l'order id (le numéro de la commande)
} 

const displayOrderId = (orderId) => { //on a la valeur ligne 16 donc la premiére fonction
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

const clearCache = () => {
    const cache = window.localStorage
    cache.clear()
}
const orderId = getOrderId()
displayOrderId(orderId)
clearCache()
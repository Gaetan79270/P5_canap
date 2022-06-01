fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((json) => cartData(json))

const cart = []   //ligne 26
const cartData = (json) => {
    let objData = localStorage.getItem("obj");
    let data = JSON.parse(objData); //parse = transformation en objet != stringify
    const numberOfItems = data.length

    for (let i = 0; i < numberOfItems; i++) { //ici on ajoute les élément que nous n'avons pas dans le local storage
        const item = data[i]
        const id = item.id
        let product
        let name, images, price, alt
        for (let j = 0; j < json.length; j++) {
            if (id === json[j]._id) {
                product = json[j]
                name = product.name
                images = product.imageUrl
                price = product.price
                alt = product.altTxt
            }
        }
        const itemComplet = { ...item, name, images, price, alt }   
        cart.push(itemComplet) 
        displayItem(itemComplet)
    }
    const { totalPrice, totalQuantity } = totalPriceTotalQuantity()  
    displayTotalQuantity(totalQuantity)
    displayTotalPrice(totalPrice)

}

const displayItem = (item) => {
    const article = makeArticle(item)
    displayArticle(article)
    const image = makeImage(item)
    displayImage(article, image)
    const cartItem = makeCartItemContent(item)
    displayCartItemContent(article, cartItem)
}
const section = document.querySelector("#cart__items")

const displayArticle = (article) => {
    section.appendChild(article)
}

const displayImage = (article, div) => {
    article.appendChild(div)
}

const displayCartItemContent = (article, cartItemContent) => {
    article.appendChild(cartItemContent)
}

const totalPriceTotalQuantity = () => {
    let totalQuantity = 0
    let totalPrice = 0
    for (let i = 0; i < cart.length; i++) {
        totalQuantity += cart[i].quantity
        totalPrice += (cart[i].price * cart[i].quantity)
    }
    return { totalPrice, totalQuantity }
}
const displayTotalQuantity = (totalQuantity) => {
    const totalQuantitySelect = document.querySelector("#totalQuantity")
    totalQuantitySelect.textContent = totalQuantity
}

const displayTotalPrice = (totalPrice) => {
    const totalPriceSelect = document.querySelector("#totalPrice")
    totalPriceSelect.textContent = totalPrice
}

const makeArticle = (item) => {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}


const makeImage = (item) => {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.images 
    image.alt = item.alt
    div.appendChild(image)
    return div
}

const makeCartItemContent = (item) => {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")
    const description = makeDescription(item)
    const settings = makeSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

const makeDescription = (item) => {

    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name;
    const p = document.createElement("p")
    p.textContent = item.color;
    const p2 = document.createElement("p")
    p2.textContent = item.price + "€";
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

const makeSettings = (item) => {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

const addQuantityToSettings = (settings, item) => {  //on prend la valeur de makeSettings (avec le return) ligne 122
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuatity(item.id, input.value,)) 
    settings.appendChild(quantity)
    quantity.appendChild(input)

}


const addDeleteToSettings = (settings, item) => {
    const deleteElement = document.createElement("div")
    deleteElement.classList.add("cart__item__content__settings__delete")
    deleteElement.addEventListener("click", () => deleteProduct(item))
    const p = document.createElement("p")
    p.classList.add("deleteItem")
    p.textContent = "Supprimer"
    deleteElement.appendChild(p)
    settings.appendChild(deleteElement)
}

const deleteProduct = (item) => {
    const itemToDelete = cart.findIndex(product => product.id === item.id && item.color)
    cart.splice(itemToDelete, 1)
    const { totalPrice, totalQuantity } = totalPriceTotalQuantity()
    displayTotalPrice(totalPrice)
    displayTotalQuantity(totalQuantity)
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
}

const deleteDataFromCache = (item) => {
    const storage = localStorage.getItem("obj")
    let storageParse = JSON.parse(storage);
    const key = item.id
    const colorKey = item.color
    const index = storageParse.findIndex(s => s.id == key && s.color == colorKey)
    storageParse.splice(index, 1)
    let storageStringify = JSON.stringify(storageParse)
    localStorage.setItem("obj", storageStringify)
    localStorage.removeItem(key)
}

const deleteArticleFromPage = (item) => {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`  //on veut aussi la couleur de canap
    )
    articleToDelete.remove()
}

const updatePriceAndQuatity = (id, newValue) => { //on récupére l'id + la value qui change avec  l'event ligne 153
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue) 
    const { totalPrice, totalQuantity } = totalPriceTotalQuantity()
    displayTotalPrice(totalPrice)
    displayTotalQuantity(totalQuantity)
}

// partie Validation

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitValidation(e))

const submitValidation = (e) => {
    e.preventDefault() //Sert a annuler le refresh de la page
    if (cart.length === 0) {
        alert("Aucun produit sélectionné")
        return
    }
    if (ifTheFormIsNotValidated()) return
    if (isEmailIsNotValidated()) return
    const validation = document.querySelector(".cart__order__form")
    const body = makeElementBody(validation)
    fetch("http://localhost:3000/api/products/order", { 
        method: "POST",
        body: JSON.stringify(body), 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId //orderId dans l'API
            window.location.href = "confirmation.html" + "?orderId=" + orderId
            return
        })
}

const makeElementBody = (validation) => {  //Champs demandé sur la fiche technique
    const firstName = validation.elements.firstName.value  
    const lastName = validation.elements.lastName.value
    const address = validation.elements.address.value
    const city = validation.elements.city.value
    const email = validation.elements.email.value
    const body = {
        contact: {  
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache() 
    }
    return body
}

const getIdsFromCache = () => {
    const numberOfProducts = localStorage.getItem("obj")
    let data = JSON.parse(numberOfProducts);
    const ids = data.map(e => e.id) // .map nous sert a récupérer l'id  du localstorage
    return ids
}

const ifTheFormIsNotValidated = () => {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    const inputArray = Array.from(inputs) 
    const validation = inputArray.some((input) => { // .some test les élément du tableau, elle renvoie un Booléen
        if (input.value === "") {
            return true
        }
        return false
    })
    if (validation) {
        alert("Remplissez le formulaire svp")
    }
}

const isEmailIsNotValidated = () => {
    const email = document.querySelector("#email").value
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (regex.test(email) === false) {
        alert("S'il vous plait, entrez un email correct")
        return true
    }
    return false
}
fetch(`http://localhost:3000/api/products`)
.then((res) => res.json())
.then((json) => cartData(json))


const cartData = (json) => {
    let objData = localStorage.getItem("obj");
    let data = JSON.parse(objData); //parse = transformation en objet != stringify
    //console.log({localStorage})
    //console.log({data})
    const numberOfItems = data.length
    //console.log({numberOfItems})
    const cart = []  //on fait un array pour avoir tout les ajouts du localStorage (le panier)
    cart.forEach((item) => displayItem(item)) //forEach permet d'exécuter une fonction donnée sur chaque élement du tableau
    console.log(cart)
    //const { name, images, price, alt } = product 
    
    for (let i = 0 ; i <numberOfItems; i++) {
        const item = data[i]
        cart.push(item) //.push méthode qui ajoute des élément aux tableau et retourne une nouvelle taille de tableau
        console.log("objet à la position ", i, "est", item)
        const id = item.id
        let product
        let name , images , price , alt
        for (let j = 0 ; j <json.length ; j++){
            if (id === json[j]._id){
            product = json[j]
            //console.log({product})
            name = product.name 
            images = product.imageUrl
            price = product.price
            alt = product.altTxt
            //console.log({image})
            }
        }
    }
}
const section = document.querySelector("#cart__items")

displayItem = (item) => {
    const article = makeArticle(item)
    displayArticle(article)
    console.log(article)
}

const displayArticle = (article) => {
section.appendChild(article)
//console.log(article)
}



const makeArticle = (item) =>{
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}


const makeImage = (item) => {
    const div = document.createElement("div")
    div.classList.add(cart__item__img)
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    //console.log({})
    div.appendChild(image)
    return div
}

const makeCartItemContent = () =>{
    const div = document.createElement("div")
    div.classList.add("cart__item__content")

    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
}

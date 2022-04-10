const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log("l'id de la page", id) //Pourquoi je n'ai pas de donné sur mon id "null"

for (let p of urlParams){  //c'est juste pour voir sur la console? *voir avec Guillaume*
    console.log(p)
}

fetch(`http://localhost:3000/api/products/${id}`) //string interpolation
.then((res) => res.json())
.then((json) => handleData(json))
//.then((json) => console.log(json))

const handleData = (product) => {
    console.log("voici les détails du produit" , {product})
    const { altTxt, colors, description, imageUrl, name, price} =product
    console.log(colors)
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

const makeImage = (imageUrl, altTxt) => {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent) parent.appendChild(image)
}

const makeTitle = (name) => {
    const h1 = document.querySelector("#title")
    if (h1) h1.textcontent = name
}

const makePrice = (price) => {
    const span = document.querySelector("#price")
    if (span) span.textContent = price
}

const makeDescription = (description) => {
    const p = document.querySelector("#description")
    if (p) p.textContent = description
}

const makeColors = (colors) => {
    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        const select = document.querySelector("#colors")
        select.appendChild(option)
    });
}


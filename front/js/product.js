const queryString = window.location.search; //.search nous donne l'id
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`) //string interpolation
.then((res) => res.json())
.then((json) => handleData(json))

const handleData = (product) => {
    const { altTxt, colors, description, imageUrl, name, price} =product
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
    if (parent) parent.appendChild(image) // if parent = != null
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

const button = document.querySelector("#addToCart")
if (button) {
button.addEventListener("click", function(){ //ajout d'un événement quand on clique sur ajouter au panier
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (!color || !quantity){
    alert("S'il vous plait choisissez une couleur et une quantité")
    return ;
    }

    const data = {
        id : id,
        color : color,
        quantity : Number(quantity)//la quantité était en string
    }
    const obj = localStorage.getItem("obj")
    const storage = obj!=undefined?JSON.parse(obj):"" //if else sur un ligne
    let dataArray //prend la couleur, quantité, et l'id
      if (!Array.isArray(storage)){
        dataArray = [data]
      }
      else if (storage.some(canap => canap.id == id && canap.color == color)){
        let index = storage.findIndex(canap => canap.id == id && canap.color == color);
        storage[index].quantity += data.quantity
        dataArray = [...storage]
      }
      else {
        dataArray = [...storage,data]
      }
    let objData = JSON.stringify(dataArray); //sert a passer les objet en string pour le localStorage
    localStorage.setItem("obj", objData)
    window.location.href = "cart.html" //nous renvoie a la page 'cart' (commande)
})
}
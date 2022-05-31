const url = "http://localhost:3000/api/products"

fetch(url)
.then(res => res.json())//on transforme la responce en .json et nous renvoie une nouvelle promesse
.then((json) => addProducts(json)) //On récupére les données de la promesse

const addProducts = (data) => { 
    const id = data[0]._id
    const items = document.getElementById("items");
    for (let i = 0 ; i<data.length; i++){
        const ids = data[i]._id
        const src = data[i].imageUrl
        const altTxt = data[i].altTxt
        const h3 = data[i].name
        const p = data[i].description
        const anchor = document.createElement("a")/*on crée une balise anchor <a><a/>*/
        anchor.href = "./product.html?id=" +ids 
        const article = makeArticle(src, altTxt,h3 ,p)
        anchor.appendChild(article)
        items.appendChild(anchor) /*appenChild method qui donne un enfant a items (anchor)*/
    }
};

const makeArticle = (src, altTxt, h3, p) => {
    const article = document.createElement("article")
    const image = makeImage(src, altTxt)
    article.appendChild(image)
    const productName = makeH3(h3)
    article.appendChild(productName)
    const productDescription = makeParagraphe(p)
    article.appendChild(productDescription)
    return article 
}

const makeImage = (src, altTxt) => {
    const img = document.createElement("img")
    img.src = src
    img.alt = altTxt
    return img 
}

const makeH3 = (text) => {
    const h3 = document.createElement("h3")
    h3.innerText = text
    h3.classList.add("productName")
    return h3
}

const makeParagraphe = (littleText) => {
    const p = document.createElement("p")
    p.innerText = littleText
    p.classList.add("productDescription")
    return p  
}


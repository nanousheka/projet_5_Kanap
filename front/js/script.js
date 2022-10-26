//Envoyer une requête Get au server pour récupérer la liste des articles
fetch("http://localhost:3000/api/products")
.then(res =>{
    if (res.ok) {
      return res.json();
    }
})
.then(serverList => {
    console.log(serverList)
    createNewProductCard(serverList);
})
.catch(error => {
    alert('Une erreur est survenue');
})

function createNewProductCard(serverList){
    for (i = 0; i < serverList.length ; i++){
        let newProduct = document.getElementById('items')
        newProduct.innerHTML +=
            `<a href="./product.html?id=${serverList[i]._id}">
                <article>
                    <img src="${serverList[i].imageUrl}" alt="${serverList[i].altTxt}">
                    <h3 class="productName">${serverList[i].name}</h3>
                    <p class="productDescription">${serverList[i].description}</p>
                </article>
            </a>`
    }
}

//get all items from 'cart' localStorage in a variable
let cart = JSON.parse(localStorage.getItem('cart'));

//Create DOM elements
const cartContainer = document.getElementById('cart__items');

//Display the items in the DOM.
for(i= 0; i< cart.length; i++){
    productId = cart[i].id;
    fetch("http://localhost:3000/api/products/" + productId)
    .then(res =>{
        if (res.ok) {
        return res.json();
        }
    })
    .then(productData =>{
        //Create and send product from server to localStorage.
        let product = {
            id: productId,
            image : productData.imageUrl,
            altTxt : productData.altTxt,
            price: productData.price,
            name: productData.name
        }
        productLinea = JSON.stringify(product);
        localStorage.setItem('product',productLinea);
    })
    .catch(error => {
        console.log('Une erreur est survenue');
    })

    let product = JSON.parse(localStorage.getItem('product'));

    const productEl = document.createElement('article');
    
    productEl.classList.add('cart__item');
    productEl.setAttribute('data-id',`${product.id}`);
    productEl.setAttribute('data-color',`${cart[i].color}`);
    cartContainer.appendChild(productEl);

        const cartItemImg = document.createElement('div');
        cartItemImg.classList.add('cart__item__img');
        productEl.appendChild(cartItemImg);

            const productImg = document.createElement('img');
            productImg.setAttribute('src',`${product.image}`);
            productImg.setAttribute('alt',`${product.altTxt}`);
            cartItemImg.appendChild(productImg);

        const cartItemContent = document.createElement('div');
        cartItemContent.classList.add('cart__item__content');
        productEl.appendChild(cartItemContent);
        

            const cartItemContentDescription = document.createElement('div');
            cartItemContentDescription.classList.add('cart__item__content__description');
            cartItemContent.appendChild(cartItemContentDescription);

                const cartItemContentDescriptionH2 = document.createElement('h2');
                cartItemContentDescriptionH2.textContent = product.name;
                cartItemContentDescription.appendChild(cartItemContentDescriptionH2);

                const cartItemContentDescriptionP1 = document.createElement('p');
                cartItemContentDescriptionP1.textContent = `Couleur : ${cart[i].color}`;
                cartItemContentDescription.appendChild(cartItemContentDescriptionP1);

                const cartItemContentDescriptionP2 = document.createElement('p');
                cartItemContentDescriptionP2.textContent ='Prix : ' + product.price + '€';
                cartItemContentDescription.appendChild(cartItemContentDescriptionP2);

            const cartItemContentSettings = document.createElement('div');
            cartItemContentSettings.classList.add('cart__item__content__settings');
            cartItemContent.appendChild(cartItemContentSettings);
            
                const cartItemContentSettingsQuantity = document.createElement('div');
                cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
                cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
                console.log(cartItemContentSettingsQuantity);
                    const cartItemContentSettingsQuantityP = document.createElement('p');
                    cartItemContentSettingsQuantityP.textContent = 'Qté : '
                    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityP);

                    const cartItemContentSettingsQuantityInput = document.createElement('input');
                    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityInput);


                const cartItemContentSettingsDelete = document.createElement('div');
                cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
                    const cartItemContentSettingsDeleteP = document.createElement('p');
                    cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteP);
    
    /*function displayProductData(productData){
        productImage = document.getElementById('product__img');
        productImage.setAttribute('src',`${productData.imageUrl}`);
        productImage.setAttribute('alt',`${productData.altTxt}`);
    }*/
}
/*<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>*/

//Display the items in the DOM.

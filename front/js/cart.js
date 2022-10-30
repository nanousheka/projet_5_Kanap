//get all items from 'cart' localStorage in a variable
let cart = JSON.parse(localStorage.getItem('cart'));



console.log(cart);

//Create DOM elements
const cartContainer = document.getElementById('cart__items');

//Display the items in the DOM.
for(i= 0; i< cart.length; i++){

    if(cart[i].quantity > 0){
        fetch("http://localhost:3000/api/products/" + cart[i].id)
        
        .then(res =>{
            if (res.ok) {
            return res.json();
            }
        })
        .then(productData =>{
            //Create and send product from server to localStorage.
            displayProductData(productData)
        })
        .catch(error => {
            console.log('Une erreur est survenue');
        })

        
            const productEl = document.createElement('article');
            
            productEl.classList.add('cart__item');
            productEl.setAttribute('data-id',`${cart[i].id}`);
            productEl.setAttribute('data-color',`${cart[i].color}`);
            cartContainer.appendChild(productEl);

            const cartItemImg = document.createElement('div');
            cartItemImg.classList.add('cart__item__img');
            productEl.appendChild(cartItemImg);

                const productImg = document.createElement('img');
                cartItemImg.appendChild(productImg);

            const cartItemContent = document.createElement('div');
            cartItemContent.classList.add('cart__item__content');
            productEl.appendChild(cartItemContent);
            

                const cartItemContentDescription = document.createElement('div');
                cartItemContentDescription.classList.add('cart__item__content__description');
                cartItemContent.appendChild(cartItemContentDescription);

                    const cartItemContentDescriptionH2 = document.createElement('h2');
                    cartItemContentDescription.appendChild(cartItemContentDescriptionH2);

                    const cartItemContentDescriptionP1 = document.createElement('p');
                    cartItemContentDescriptionP1.textContent = `Couleur : ${cart[i].color}`;
                    cartItemContentDescription.appendChild(cartItemContentDescriptionP1);

                    const cartItemContentDescriptionP2 = document.createElement('p');
                    cartItemContentDescription.appendChild(cartItemContentDescriptionP2);

                const cartItemContentSettings = document.createElement('div');
                cartItemContentSettings.classList.add('cart__item__content__settings');
                cartItemContent.appendChild(cartItemContentSettings);
                
                    const cartItemContentSettingsQuantity = document.createElement('div');
                    cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
                    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
                    
                        const cartItemContentSettingsQuantityP = document.createElement('p');
                        cartItemContentSettingsQuantityP.textContent = 'Qté : '
                        cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityP);

                        const cartItemContentSettingsQuantityInput = document.createElement('input');
                        cartItemContentSettingsQuantityInput.classList.add('itemQuantity');
                        cartItemContentSettingsQuantityInput.setAttribute('name','itemQuantity');
                        cartItemContentSettingsQuantityInput.setAttribute('type','number');
                        cartItemContentSettingsQuantityInput.setAttribute('min','1');
                        cartItemContentSettingsQuantityInput.setAttribute('max','100');
                        cartItemContentSettingsQuantityInput.setAttribute('value',`${cart[i].quantity}`);
                        cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityInput);


                    const cartItemContentSettingsDelete = document.createElement('div');
                    cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
                    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
                    
                        const cartItemContentSettingsDeleteP = document.createElement('p');
                        cartItemContentSettingsDeleteP.setAttribute('id','delete' + i)
                        cartItemContentSettingsDeleteP.textContent = 'Supprimer';
                        cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteP);

        //Caught other data from server and add to DOM.
        function displayProductData(productData){
            productImg.setAttribute('src',productData.imageUrl);
            productImg.setAttribute('alt',productData.altTxt);
            cartItemContentDescriptionH2.textContent = productData.name;
            cartItemContentDescriptionP2.textContent ='Prix : ' + productData.price + '€';
        }

        cartItemContentSettingsDeleteP.addEventListener('click',(e) => {
            cart[i].quantity = 0;
            let cartLinea = JSON.stringify(cart);
            localStorage.setItem('cart', cartLinea);
        })
        console.log(cart[i].quantity)
    }
}
/*let  cartProductId = cart[i].id;
let cartProductColor = cart[i].color;
let cartProductQuantity = cart[i].quantity;
let indexOfCartProduct = cart.indexOf(cart[i]);
console.log(cartProductId)*/

//Delete cart product
/*-Parcourir le cart
-Si le produit dans le cart a la même couleur et le même I
-Retirer le produit de l'array du cart.*/
 
//let productIndex = cart.indexOf(cart[i])
/*If()
For (let ii = 0;ii<cart.length;ii++){
    if(cart[i].includes(productId) && cart[i].includes(cart[i].color)){
        productIndex = cart.indexOf(cart[i])
        cart.splice(productIndex,1);
        let cartLinea = JSON.stringify(cart);
        localStorage.setItem('cart',cartLinea);
    }
} 
//console.log(cart)
//console.log(localStorage.getItem('cart'))*/
//====================================DISPLAY CART=====================================
//get all items from 'cart' localStorage in a variable
let cart = JSON.parse(localStorage.getItem('cart'));;
let productCount =  0;
let productTotalPrice = 0;
let orderTotalPrice = 0;
let productPrice;

function updateLocalStorage(){
    let cartLinea = JSON.stringify(cart);
    localStorage.setItem('cart', cartLinea);
}

//Create DOM elements
const cartContainer = document.getElementById('cart__items');
let cartItemContentSettingsDeleteP;
let cartItemContentSettingsQuantityInput;

//============================Display the products in the DOM================================================
console.log(cart);

//If cart is empty
if(cartContainer.length == 0 || !cart || cart.length == 0){
    const emptyCartEl = document.createElement('p');
    emptyCartEl.textContent = 'Votre panier est vide';
    emptyCartEl.style.textAlign = 'center';
    cartContainer.appendChild(emptyCartEl);
}

//If not empty
for(i= 0; i< cart.length; i++){

    fetch("http://localhost:3000/api/products/" + cart[i].id)
    
    .then(res =>{
        if (res.ok) {
        return res.json();
        }
    })
    .then(productData =>{
        displayProductData(productData);
        getProductPrice(productData)
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

                cartItemContentSettingsQuantityInput = document.createElement('input');
                cartItemContentSettingsQuantityInput.classList.add('itemQuantity');
                cartItemContentSettingsQuantityInput.setAttribute('name','itemQuantity');
                cartItemContentSettingsQuantityInput.setAttribute('type','number');
                cartItemContentSettingsQuantityInput.setAttribute('min','1');
                cartItemContentSettingsQuantityInput.setAttribute('max','100');
                cartItemContentSettingsQuantityInput.setAttribute('onkeyup','if(this.value<0){this.value= this.value * -1}')
                cartItemContentSettingsQuantityInput.setAttribute('value',`${cart[i].quantity}`);
                cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityInput);


            const cartItemContentSettingsDelete = document.createElement('div');
            cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

                cartItemContentSettingsDeleteP= document.createElement('p');
                cartItemContentSettingsDeleteP.textContent = 'Supprimer';
                cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteP);

    //Caught other data from server and add to DOM.
    function displayProductData(productData){
        productImg.setAttribute('src',productData.imageUrl);
        productImg.setAttribute('alt',productData.altTxt);
        cartItemContentDescriptionH2.textContent = productData.name;
        cartItemContentDescriptionP2.textContent ='Prix : ' + productData.price + '€';
    }

    //Remove product from cart and localStorage
    function removeProduct(product){
        cartItemContentSettingsDeleteP.addEventListener('click',(e) => {
            cart = cart.filter(e => e != product)
        updateLocalStorage()
        location.reload()
    })
    }
    removeProduct(cart[i])

    //Change product quantity
    function changeQuantity(product){
        cartItemContentSettingsQuantityInput.addEventListener('change', (event) =>{
            product.quantity = event.target.value;
            updateLocalStorage()
            location.reload()
        })
        
    }
    changeQuantity(cart[i])

    //Define product count.
    let productQuantity = parseInt(cart[i].quantity);
    productCount += productQuantity

    //Define totalPrice
    function getProductPrice(productData){
        productPrice = parseInt(productData.price);
        productTotalPrice = productPrice * productQuantity;
        defineOrderAmount(productTotalPrice)
    }
    
    function defineOrderAmount(productTotalPrice){
        orderTotalPrice += productTotalPrice;
        getOrderAmount(orderTotalPrice)
    }

    function addProductTotalPriceToCart(productTotalPrice){
        cart[i].productTotalPrice = productTotalPrice;
        console.log(cart[i].productTotalPrice);
    }
}

//Display productCount
document.getElementById('totalQuantity').textContent = productCount;

//Display totalPrice
function getOrderAmount(orderTotalPrice){
    document.getElementById('totalPrice').textContent = orderTotalPrice;
}



//==============================ORDER========================================
// User Form
let cartOrderForm = document.getElementsByClassName('cart__order__form')[0];

const orderBtn = document.getElementById('order');

//Create products Id's loop for product array
let cartIds = [];
for(i = 0 ; i< cart.length ; i++){
    cartIds.push(cart[i].id)
}

//Product, contact and validation variables.
let contact;
let newOrder;
let globalErrorMessage;
let invalidFormMessage;
let invalidCartMessage;
function displayGlobalErrorMessage(error, message){
    if(!error){
        globalErrorMessage = document.createElement('p');
        globalErrorMessage.textContent = message;
        globalErrorMessage.style.color = 'red';
        cartOrderForm.appendChild(globalErrorMessage);
    }
}

//RegExp patterns.
const namesRegExp = (value)=>{
    return /[A-ZÀ-ÿ][-,a-z. ']+[ ]*/gm.test(value);
};
let firstNameIsValid = false;
let lastNameIsValid = false;

let addressIsValid = false;
let addressRegExp = new RegExp("[A-Za-z0-9'\.\-\s\,]",'g');
let cityIsValid = false;
let cityRegExp = new RegExp("[A-Za-z0-9'\.\-\s\,]",'gm');
let emailIsValid = false;
let emailRegExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",'g');

//Inputs validation.
let firstNameErrorMessage = document.getElementById('firstNameErrorMsg');
let lastNameErrorMessage = document.getElementById('lastNameErrorMsg');
let addressErrorMessage = document.getElementById('addressErrorMsg');
let cityErrorMessage = document.getElementById('cityErrorMsg');
let emailErrorMessage = document.getElementById('emailErrorMsg');

cartOrderForm.firstName.addEventListener('change',e =>{
    if(e.target.value.length > 0 && namesRegExp(e.target.value)){
        console.log(namesRegExp(e.target.value))
        firstNameErrorMessage.textContent = "";
        firstNameIsValid = true;
    } else{
        firstNameErrorMessage.textContent = "Prénom invalide";
        console.log(namesRegExp(e.target.value))
    }
})
cartOrderForm.lastName.addEventListener('change',e =>{
    if(e.target.value.length > 0 && namesRegExp(e.target.value)){
        console.log(namesRegExp(e.target.value))
        lastNameErrorMessage.textContent = "";
        lastNameIsValid = true;
    }else {
        lastNameErrorMessage.textContent = "Nom invalide";
    }
})
cartOrderForm.address.addEventListener('change',e =>{
    if(e.target.value.length > 0 && addressRegExp.test(e.target.value)){
        addressErrorMessage.textContent = "";
        addressIsValid = true;
    } else{
        addressErrorMessage.textContent = "Adresse invalide";
    }
})
cartOrderForm.city.addEventListener('change',e =>{
    if(e.target.value.length > 0 && cityRegExp.test(e.target.value)){
        cityErrorMessage.textContent = "";
        cityIsValid = true;
    }else {
        cityErrorMessage.textContent = "Ville invalide";
    }
})
cartOrderForm.email.addEventListener('change',e =>{
    if(e.target.value.length > 0 && emailRegExp.test(e.target.value)){
        emailErrorMessage.textContent = "";
        emailIsValid = true;
    }else{
        emailErrorMessage.textContent = "Email invalide";
    }
})

let formIsValid = false;
let cartIsValid = false;

orderBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    if(firstNameIsValid && lastNameIsValid && addressIsValid && cityIsValid && emailIsValid){
        formIsValid = true;
        invalidFormMessage.remove();
    }else{
        invalidFormMessage = document.createElement('p');
        invalidFormMessage.textContent = 'Veuillez modifier le formulaire';
        invalidFormMessage.style.color = 'red';
        cartOrderForm.appendChild(invalidFormMessage);
    }

    if(cart.length > 0){
        cartIsValid = true;
    }

    //If form is valid, create order object and send it to localhost.
    if(formIsValid  && cartIsValid){
        contact = {
            firstName : cartOrderForm.firstName.value, 
            lastName : cartOrderForm.lastName.value, 
            address : cartOrderForm.address.value, 
            city : cartOrderForm.city.value, 
            email : cartOrderForm.email.value
        }
        console.log(contact)

        newOrder = {
            contact: contact,
            products: cartIds
        }
        fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: { 
              'Content-Type': 'application/json',
            }
          }
        ).then(res =>{
            if (res.ok) {
            return res.json();
            }
        })
        .then(orderDetails =>{
            document.location.href = 'confirmation.html?orderId='+ orderDetails.orderId;
            localStorage.clear();
        })
        .catch(error => {
            console.log('Une erreur est survenue')
        });
    //Warnings
    }else{
        globalErrorMessage = document.createElement('p');
        globalErrorMessage.textContent = 'Votre commande n\'a pas été réalisée';
        globalErrorMessage.style.color = 'red';
        cartOrderForm.appendChild(globalErrorMessage);
    }

    
})

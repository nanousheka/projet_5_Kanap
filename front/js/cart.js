//get all items from 'cart' localStorage in a variable
let cart;
let productCount =  0;
let productTotalPrice = 0;
let orderTotalPrice = 0;
let productPrice;

function getLocalStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));
}

function updateLocalStorage(){
    let cartLinea = JSON.stringify(cart);
    localStorage.setItem('cart', cartLinea);
}

//Create DOM elements
const cartContainer = document.getElementById('cart__items');
let cartItemContentSettingsDeleteP;
let cartItemContentSettingsQuantityInput;

//Display the products in the DOM.
getLocalStorage()
console.log(cart);

for(i= 0; i< cart.length; i++){

    fetch("http://localhost:3000/api/products/" + cart[i].id)
    
    .then(res =>{
        if (res.ok) {
        return res.json();
        }
    })
    .then(productData =>{
        //Create and send product from server to localStorage.
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
        console.log(product)
        console.log(cart)
    })
    }
    removeProduct(cart[i])

    //Change product quantity
    function changeQuantity(product){
        cartItemContentSettingsQuantityInput.addEventListener('change', (event) =>{
            product.quantity = event.target.value;
            updateLocalStorage()
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
let firstNameIsValid = false;
let firstNameRegExp;
let lastNameIsValid = false;
let lastNameRegExp;
let addressIsValid = false;
let addressRegExp;
let cityIsValid = false;
let cityRegExp;
let emailIsValid = false;
let emailRegExp;
let formIsValid = false;


orderBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    //Inputs validation.
    cartOrderForm.firstName.addEventListener('change',e =>{
        firstNameRegExp = new RegExp("([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+",'gm');
        if(e.target.value.length > 0 && firstNameRegExp.test(e.target.value)){
            document.getElementById('firstNameErrorMsg').textContent = "";
            firstNameIsValid = true;
        } 
    })
    cartOrderForm.lastName.addEventListener('change',e =>{
        lastNameRegExp = new RegExp("([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+",'gm');
        if(e.target.value.length > 0 && lastNameRegExp.test(e.target.value)){
            document.getElementById('lastNameErrorMsg').textContent = "";
            lastNameIsValid = true;
        }
    })
    cartOrderForm.address.addEventListener('change',e =>{
        addressRegExp = new RegExp("[A-Za-z0-9'\.\-\s\,]",'g');
        if(e.target.value.length > 0 && addressRegExp.test(e.target.value)){
            document.getElementById('addressErrorMsg').textContent = "";
            addressIsValid = true;
        }
    })
    cartOrderForm.city.addEventListener('change',e =>{
        cityRegExp = new RegExp("[A-Za-z0-9'\.\-\s\,]",'gm');
        if(e.target.value.length > 0 && cityRegExp.test(e.target.value)){
            document.getElementById('cityErrorMsg').textContent = "";
            cityIsValid = true;
        }
    })
    cartOrderForm.email.addEventListener('change',e =>{
        emailRegExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",'g');
        if(e.target.value.length > 0 && emailRegExp.test(e.target.value)){
            document.getElementById('emailErrorMsg').textContent = "";
            emailIsValid = true;
        }
    })

    if(firstNameIsValid && lastNameIsValid && addressIsValid && cityIsValid && emailIsValid){
        formIsValid = true;
    }
    //If form is valid, create order object and send it to localhost.
    if(formIsValid){
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
        //
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
        console.log(newOrder);
    } else{
        globalErrorMessage = document.createElement('p');
        globalErrorMessage.textContent = 'Veuillez modifier le formulaire.';
        globalErrorMessage.style.color = '#fbbcbc';
        cartOrderForm.appendChild(globalErrorMessage);
    }

    if(email.value.length == 0 && emailIsValid == false){
        document.getElementById('emailErrorMsg').textContent = 'Email invalide';
    } 
    if(firstName.value.length == 0 && firstNameIsValid == false){
        document.getElementById('firstNameErrorMsg').textContent = 'Prénom invalide';
    } 
    if(lastName.value.length == 0 && lastNameIsValid == false){
        document.getElementById('lastNameErrorMsg').textContent = 'Nom invalide';
    } 
    if(address.value.length == 0 && addressIsValid == false){
        document.getElementById('addressErrorMsg').textContent = 'Adresse invalide';
    } 
    if(city.value.length == 0 && cityIsValid == false){
        document.getElementById('cityErrorMsg').textContent = 'Ville invalide';
    } 
})

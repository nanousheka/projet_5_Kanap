//if there is no cart in localStorage, create it before adding any product.
let cart = [];
if(!localStorage.getItem('cart')){
  cartLinea = JSON.stringify(cart)
  localStorage.setItem('cart',cartLinea)  
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

//Get product ID from URL
const url = new URL(window.location.href);
const productId = url.searchParams.get("id");

//Get product details from server
fetch("http://localhost:3000/api/products/"+ productId)
.then(res =>{
    if (res.ok) {
      return res.json();
    }
})
.then(productData =>{
    displayProductData(productData)
})
.catch(error => {
    console.log('Une erreur est survenue');
})

//Display productData in the DOM
function displayProductData(productData){
    document.getElementsByClassName('item__img')[0].innerHTML=`<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById('title').textContent = productData.name;
    document.getElementById('price').textContent = productData.price;
    document.getElementById('description').textContent = productData.description;
    for(i = 0 ; i< productData.colors.length ; i++){
        document.getElementById('colors').innerHTML += `
            <option value="${productData.colors[i]}">${productData.colors[i]}</option>`;
    }
}
let globalErrorMessage;

//User set color
let colorEl = document.getElementById('colors');
let selectedColor;
let colorIsValid = false;

colorEl.addEventListener('change',function(e){
    selectedColor = e.target.value;
    if(selectedColor != ''){
        colorIsValid = true;
        colorEl.style.borderColor = 'transparent';
        if(globalErrorMessage){
            globalErrorMessage.remove();
        }
        console.log('color is valid')}
    if(selectedColor == '' || selectedColor == '--SVP, choisissez une couleur --'){
        colorIsValid = false;
    }
})

//User set quantity
const quantityEl = document.getElementById('quantity');
let selectedQuantity;
let quantityIsValid = false;

quantityEl.addEventListener('change',function(e){
    selectedQuantity = quantityEl.value;
    if(selectedQuantity <= 100 && selectedQuantity > 0){
        quantityIsValid = true;
        quantityEl.style.borderColor = 'transparent';
        if(globalErrorMessage){
            globalErrorMessage.remove();
        }
        
        console.log('quantity is valid')
    }
});

//Quantity and color error message.
function requiredElement(domElement){
    domElement.setAttribute('required', '');
    domElement.style.borderColor = 'red';
}

//Create product object and User send object to localStorage by pressing button addToCart
const addToCart = document.getElementById('addToCart');
let product;

addToCart.addEventListener('click', (e) => {
    e.preventDefault();
    if(!quantityIsValid){
        requiredElement(quantityEl)
    }

    if(!colorIsValid){
        requiredElement(colorEl)
    }

    if(quantityIsValid && colorIsValid){
        createProduct();
        addProductToCart();
        addCartToLocalStorage();
        console.log('In the cart :' + cart);
    } else {
        let formEl = document.getElementsByClassName('item__content')[0];
        globalErrorMessage = document.createElement('p')
        globalErrorMessage.setAttribute('id','globalErrorMessage')
        globalErrorMessage.textContent = 'Veuillez modifier les champs en rouge.';
        formEl.appendChild(globalErrorMessage).style.color = 'red';
    }
    
})

function createProduct(){
    product = {
        id: productId,
        color: selectedColor,
        quantity: selectedQuantity;
        price : ,
        description: ,
    }
}

//This function check if product is already in cart. If true, adjust quantity otherwise push product to cart.
function addProductToCart(){
    if(cart.length >= 1 && cart.find(cartElement => cartElement.id === productId) && cart.find(cartElement => cartElement.color === selectedColor)){
        for(i = 0 ; i < cart.length ; i++){
            if(cart[i].id === productId && cart[i].color === selectedColor){
                let newCount = parseInt(cart[i].quantity) + parseInt(product.quantity);
                cart[i].quantity = newCount.toString();
            }
        }
    } else {
        cart.push(product);
    }
}

function addCartToLocalStorage() {
    const cartLinea = JSON.stringify(cart);
    localStorage.setItem('cart', cartLinea);
}
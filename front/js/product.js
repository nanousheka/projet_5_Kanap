//if there is no cart in localStorage, create it.
let cart = [];
if(!localStorage.getItem('cart')){
  cartLinea = JSON.stringify(cart)
  localStorage.setItem('cart',cartLinea)  
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}
console.log('What was in the localStorage = cart : ' + localStorage.getItem('cart'))

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
    diplayProductData(productData);
})
.catch(error => {
    console.log('Une erreur est survenue');
})

//Display productData in the DOM
function diplayProductData(productData){
    document.getElementsByClassName('item__img')[0].innerHTML=`<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById('title').textContent = productData.name;
    document.getElementById('price').textContent = productData.price;
    document.getElementById('description').textContent = productData.description;
    for(i = 0 ; i< productData.colors.length ; i++){
        document.getElementById('colors').innerHTML += `
            <option value="${productData.colors[i]}">${productData.colors[i]}</option>`;
    }
}

//User set color and quantity
let colorEl = document.getElementById('colors');
let selectedColor;
colorEl.addEventListener('change',function(e){
    selectedColor = e.target.value;
})

const quantityEl = document.getElementById('quantity');
let selectedQuantity;
quantityEl.addEventListener('change',function(e){
    selectedQuantity = e.target.value;
});

//Create product object and User send object to localStorage by pressing button addToCart
const addToCart = document.getElementById('addToCart');
let product;

addToCart.addEventListener('click', (e) => {
    e.preventDefault();

    createProduct();
    addProductToCart();
    addCartToLocalStorage();
    console.log('In the cart :' + cart);
})

function createProduct(){
    product = {
        id: productId,
        color: selectedColor,
        quantity: selectedQuantity
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
    console.log(cart);
}

function addCartToLocalStorage() {
    const cartLinea = JSON.stringify(cart);
    localStorage.setItem('cart', cartLinea);
}
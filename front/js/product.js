let cart = [];

//if there is no cart in localStorage, create it before adding any product.
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
    //Display productData in the DOM
    displayProductData(productData)
})
.catch(error => {
    console.log('Une erreur est survenue');
})

function displayProductData(productData){
    document.getElementsByClassName('item__img')[0].innerHTML=`<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById('title').textContent = productData.name;
    document.getElementById('price').textContent = productData.price;
    document.getElementById('description').textContent = productData.description;
    for(i = 0 ; i< productData.colors.length ; i++){
        let colorOption = document.createElement('option');
        colorOption.setAttribute('value',productData.colors[i]);
        colorOption.textContent = productData.colors[i];
        document.getElementById('colors').appendChild(colorOption)
    }
}
/*On submit button, this message is displayed under button
if both or one of color or quantity selection is invalid.*/
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

//Quantity or color error message displayed under input.
function requiredElement(domElement){
    domElement.setAttribute('required', '');
    domElement.style.borderColor = 'red';
}

//Create product object and User send object to localStorage by pressing button addToCart

const addToCart = document.getElementById('addToCart');
let itemContent = document.getElementsByClassName('item__content')[0];
let addToCartMessageEl;
function addToCartValidationMessage(){
    addToCartMessageEl = document.createElement('p')
    addToCartMessageEl.textContent = 'Votre produit a été ajouté avec succès au panier';
    addToCartMessageEl.style.color = '#fbbcbc',
    itemContent.appendChild(addToCartMessageEl)
    quantityEl.addEventListener('change', function(e){
        e.preventDefault();
        addToCartMessageEl.textContent = '';
    })
    colorEl.addEventListener('change', function(e){
        e.preventDefault();
        addToCartMessageEl.textContent = '';
    })

}


addToCart.addEventListener('click', (e) => {
    e.preventDefault();

    if(!quantityIsValid){
        requiredElement(quantityEl)
    }

    if(!colorIsValid){
        requiredElement(colorEl)
    }

    if(quantityIsValid && colorIsValid){
        let product = {
            id : productId,
            color : selectedColor,
            quantity : selectedQuantity
        }

        if (cart.length <= 0){
            cart.push(product);
            addToCartValidationMessage()
            
        }else { 
            if(cart.find(e => e.id == productId) && cart.find(e => e.color == selectedColor)){
                for(i = 0 ; i < cart.length ; i++){
                    if(cart[i].id == productId && cart[i].color == selectedColor){
                        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(selectedQuantity)
                    }
                    if(addToCartMessageEl){
                        addToCartMessageEl.remove()
                    };
                    addToCartValidationMessage()
                }
            } else {
                cart.push(product);
                addToCartValidationMessage();}  
        }
        
        addCartToLocalStorage();
        console.log(product);
        console.log(cart);
        
    } else {
        let formEl = document.getElementsByClassName('item__content')[0];
        globalErrorMessage = document.createElement('p')
        globalErrorMessage.setAttribute('id','globalErrorMessage')
        globalErrorMessage.textContent = 'Veuillez modifier les champs en rouge.';
        formEl.appendChild(globalErrorMessage).style.color = 'red';
    }
})

function addCartToLocalStorage() {
    const cartLinea = JSON.stringify(cart);
    localStorage.setItem('cart', cartLinea);
}
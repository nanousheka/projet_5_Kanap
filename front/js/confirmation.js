//Get orderId from l'URL.
const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");

//Display orderId in the DOM.
const orderIdEl = document.getElementById('orderId');
orderIdEl.textContent = orderId;
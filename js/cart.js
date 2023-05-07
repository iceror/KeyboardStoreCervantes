import { getProducts } from "./products.js";
async function getProduct(id) {
  const keyboards = await getProducts();
  return keyboards.find(keyboard => keyboard.id === Number(id));
}

function calculatePrice(selectedProduct) {
  let price = selectedProduct.price;
  return selectedProduct.discount ? price * .90 : price;
}

async function addToCart(id) {
  let cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([await getProduct(id)]));
  } else {
    let addedProducts = JSON.parse(cart);
    addedProducts.push(await getProduct(id));
    localStorage.setItem("cart", JSON.stringify(addedProducts));
  }
  updateTotals();
}

function updateTotals() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  document.getElementById("count").textContent = cart.length;

  let total = 0;
  for (const product of cart) {
    total += calculatePrice(product);
  }
  document.getElementById("sum").textContent = total;
  document.getElementById("total").textContent = 'Total: ' + total;
}

updateTotals();

function parseCart() {
  const cart = localStorage.getItem('cart');
  return JSON.parse(cart);
}

function filterDuplicates(a) {
  const duplicate = {};
  console.log(a);
  a.forEach(function (keyboard) { duplicate[keyboard.id] = (duplicate[keyboard.id] || 0) + 1; });
  return duplicate;
}


function showCartItems() {
  const parsedCart = parseCart();
  //console.log(parsedCart);
  const newArrayDuplicates = filterDuplicates(parsedCart);
  console.log(newArrayDuplicates);
  Object.keys(newArrayDuplicates).forEach(async function(key) {
    console.log('Id : ' + key + ', Quantity : ' + newArrayDuplicates[key])
    let currentKeyboard = await getProduct(key);
    console.log(currentKeyboard);
    const listElement = document.createElement('div');
    listElement.innerHTML = `
  <img src='../${currentKeyboard.image}'>
  <h3>${currentKeyboard.brand} </h3>
  <h3>$${calculatePrice(currentKeyboard)} </h3>
  <p> Cantidad: ${newArrayDuplicates[key]} </p> 
  `
  
    document.querySelector(`#product-list`).appendChild(listElement);
  })

};

showCartItems();


export { calculatePrice, addToCart, updateTotals, getProduct }
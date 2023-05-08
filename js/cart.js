async function createProductCards(container) {
  let keyboards = await getProducts();
  if (container == 'discounts') {
    keyboards = keyboards.filter(keyboard => keyboard.discount == true);
  }

  keyboards.forEach(keyboard => {
    const card = document.createElement('div');
    card.innerHTML = `
  <img src='${keyboard.image}'>
  <h3>${keyboard.brand}</h3>
  <h3>$${calculatePrice(keyboard)}</h3> 
  
  <button  class='add-button'>Agregar al carrito</button>
  `

    card.addEventListener('click', function () {
      addToCart(keyboard.id)
    });

    document.querySelector(`#${container}-container`).appendChild(card);

  });
}

// onclick=${`addToCart(${keyboard.id})`}

async function addToCart(id) {
  let cart = localStorage.getItem("cart");
  if (!cart) {
    let arr = [];
    arr.push(await getProduct(id))
    localStorage.setItem("cart", JSON.stringify(arr));
  } else {
    let addedProducts = JSON.parse(cart);
    addedProducts.push(await getProduct(id));
    localStorage.setItem("cart", JSON.stringify(addedProducts));
  }
  updateTotals();
}

async function getProducts() {
  const response = await fetch('../json/products.json');
  const json = await response.json();
  return json;
}


async function getProduct(id) {
  const keyboards = await getProducts();
  return keyboards.find(keyboard => keyboard.id === Number(id));
}

function calculatePrice(selectedProduct) {
  let price = selectedProduct.price;
  return selectedProduct.discount ? price * .90 : price;
}

function updateTotals() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  document.getElementById("count").textContent = cart.length;

  if (cart.length > 0) {
    let total = 0;
    for (const product of cart) {
      total += calculatePrice(product);
    }
    document.getElementById("sum").textContent = total;
    document.getElementById("total").textContent = 'Total: ' + total;
  }
}


//CART
function parseCart() {
  const cart = localStorage.getItem('cart');
  return JSON.parse(cart);
}

function filterDuplicates(a) {
  const duplicate = {};
  a.forEach(function (keyboard) { duplicate[keyboard.id] = (duplicate[keyboard.id] || 0) + 1; });
  return duplicate;
}


function showCartItems() {
  const parsedCart = parseCart();
  const newArrayDuplicates = filterDuplicates(parsedCart);
  Object.keys(newArrayDuplicates).forEach(async function (key) {
    //console.log('Id : ' + key + ', Quantity : ' + newArrayDuplicates[key])
    let currentKeyboard = await getProduct(key);
    //console.log(currentKeyboard);
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


if (window.location.pathname === '/') {

  //INDEX
  createProductCards('products');
  createProductCards('discounts');
} else {
  //CART
  showCartItems();
}

//BOTH
updateTotals();
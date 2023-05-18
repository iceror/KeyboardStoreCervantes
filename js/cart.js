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
  <h3 style = 'text-decoration: line-through'>${keyboard.discount ? '$' + keyboard.price : '<br/>'}</h3>
  
  <h3>$${keyboard.discount ? keyboard.price * .90 : keyboard.price}</h3> 
  
  <button  class='add-button'>Agregar al carrito</button>
  `

    card.addEventListener('click', function () {
      addToCart(keyboard.id);
    });

    document.querySelector(`#${container}-container`).appendChild(card);

  });
}

async function addToCart(id) {
  let cart = localStorage.getItem("cart");
  let productToAdd = await getProduct(id)

  if (!cart) {
    let arr = [];
    productToAdd.quantity = 1
    arr.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(arr));
    console.log('added first item! :DD');
  } else {

    let currentProductsArray = JSON.parse(cart);

    //If product already exists then quantity++
    if (currentProductsArray.filter(element => element.id === id).length > 0) {
      let foundIndex = currentProductsArray.findIndex(x => x.id === id);
      currentProductsArray[foundIndex].quantity++
    } else {
      //else add product for the first time 
      productToAdd.quantity = 1
      currentProductsArray.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(currentProductsArray));
  }

  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Agregado al carrito',
    showConfirmButton: false,
    timer: 1200
  })

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

function calculatePrice(keyboard) {
  let price = keyboard.price * keyboard.quantity;
  return keyboard.discount ? price * .90 : price;
}

function updateTotals() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);
  document.getElementById("count").textContent = cart.length;

  if (cart.length > 0) {
    let total = 0;
    for (const product of cart) {
      total += calculatePrice(product);
    }
    document.getElementById("sum").textContent = total;
    // cart.html total
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

  parsedCart.forEach(singleProduct => {
    const listElement = document.createElement('div');
    listElement.innerHTML = `
    <img src='../${singleProduct.image}' class="cart-item">
    <h3>${singleProduct.brand} </h3>
    <h3>$${calculatePrice(singleProduct)} </h3>
    <p> Cantidad: ${singleProduct.quantity} </p> 
    <img src='../img/x-cross.png' class="delete-item" id='${singleProduct.id}'>
    `

    document.querySelector(`#product-list`).appendChild(listElement);

    const deleteSymbol = document.getElementById(`${singleProduct.id}`);
    deleteSymbol.addEventListener('click', function () { deleteItems(singleProduct.id); });
  });

};

function deleteItems(id) {
  let cart = localStorage.getItem("cart");
  let addedProducts = JSON.parse(cart);

    addedProducts = addedProducts.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(addedProducts));
  
  
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: 'Eliminado del carrito',
    showConfirmButton: false,
    timer: 1200
  })
  
  setTimeout(() => { location.reload(); }, 1300);
}


if (window.location.pathname.includes('cart')) {
  //CART
  showCartItems();
} else {
  //INDEX
  createProductCards('products');
  createProductCards('discounts');
}

//BOTH
updateTotals();


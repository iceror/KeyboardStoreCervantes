async function getProducts() {
  const response = await fetch('../json/products.json');
  const json = await response.json();
  return json;
}

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
    
    <button onclick=${`addToCart(${keyboard.id})`} class='add-button'>Agregar al carrito</button>
    `

    document.querySelector(`#${container}-container`).appendChild(card);
  });

}

createProductCards('products');
createProductCards('discounts');


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
}

updateTotals();

const keyboards = [
  {
    id: 1,
    brand: 'Yamaha',
    price: 2500,
    discount: true,
    image: 'img/yamaha1.jpeg'
  },
  {
    id: 2,
    brand: 'Casio',
    price: 3000,
    discount: true,
    image: './img/casio1.avif'
  },
  {
    id: 3,
    brand: 'Roland',
    price: 2000,
    discount: false,
    image: './img/roland1.jpg'
  },
  {
    id: 4,
    brand: 'Roland',
    price: 3500,
    discount: true,
    
  }
]

function createProductCards(products, container){
  products.forEach(keyboard => {
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

createProductCards(keyboards, 'products');

function getDiscountedProducts() {
  const discountedProducts = keyboards.filter(keyboard => keyboard.discount == true);
  createProductCards(discountedProducts, 'discounts');

}

function getProduct(id) {
  return keyboards.find(keyboard => keyboard.id === Number(id));
}

function calculatePrice(selectedProduct) {
  let price = selectedProduct.price;

  if (selectedProduct.discount == true) {
    return (price * .90);
  } else {
    return (price);
  }
}

getDiscountedProducts();

function addToCart(id) {
  let cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([getProduct(id)]));
  } else {
    let addedProducts = JSON.parse(cart);
    addedProducts.push(getProduct(id));
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

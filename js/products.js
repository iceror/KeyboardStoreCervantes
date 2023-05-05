import {calculatePrice} from './cart.js';

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

export {getProducts, createProductCards}
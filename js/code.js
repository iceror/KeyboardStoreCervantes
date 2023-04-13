//ARRAY PRODUCTOS

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

const productCards = document.querySelector('#products');

keyboards.forEach(keyboard => {
  const card = document.createElement('div');
  card.innerHTML = `
  <img src='${keyboard.image}'>
  <h3>${keyboard.brand}</h3>
  <h3>$${keyboard.price}</h3>

  <button id=${keyboard.id} class='add-button'>Agregar al carrito</button>
  `
  products.appendChild(card);
}
)

function productList() {
  let product = prompt('¿Qué artículo deseas comprar? \n1-Yamaha Keyboard: $2500 + IVA \n2-Casio Keyboard: $3000 + IVA \n3-Roland Keyboard: $2000 + IVA \n0-Salir \n¡Tenemos 10% de descuento en ciertos artículos!');
  return (product);
}


function price(userInput) {
  let selectedProduct = keyboards.find(keyboard => keyboard.id === Number(userInput));
  let price = calculatePrice(selectedProduct);
  alert('Total = ' + '$ ' + price);
}


function calculatePrice(selectedProduct) {
  let iva = 1.16;
  let price = (selectedProduct.price * iva);

  if (selectedProduct.discount == true) {
    return (price * .90);
  } else {
    return (price);
  }
}

function getDiscountedProducts() {
  const result = keyboards.filter(keyboard => keyboard.discount == true);
  console.log(result);
}

getDiscountedProducts();

do {
  let userInput = productList();
  price(userInput);
} while (userInput != '0');


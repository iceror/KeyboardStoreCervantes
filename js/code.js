//ARRAY PRODUCTOS
const keyboards = [
    {
        id: 1,
        brand: 'Yamaha',
        price: 2500,
        discount: true,
    },
    {
        id: 2,
        brand: 'Casio',
        price: 3000,
        discount: true,
    },
    {
        id: 3,
        brand: 'Roland',
        price: 2000,
        discount: false,
    }
]

function productList() {
    let product = prompt('¿Qué artículo deseas comprar? \n1-Yamaha Keyboard: $2500 + IVA \n2-Casio Keyboard: $3000 + IVA \n3-Roland Keyboard: $2000 + IVA \n0-Salir \n¡Tenemos 10% de descuento en ciertos artículos!');
    return (product);
}

function price(userInput) {
    let selectedProduct = keyboards[userInput - 1];
    let price = calculatePrice(selectedProduct);
    alert('Total = ' + '$ ' + price);
}


function calculatePrice(selectedProduct) {
    let iva = 1.16;
    let price = (selectedProduct.price * iva);

    if (selectedProduct.discount == true) {
        return(price * .90);
    } else {
        return(price);
    }
}


do {
    let userInput = productList();
    price(userInput);

} while (userInput != '0');
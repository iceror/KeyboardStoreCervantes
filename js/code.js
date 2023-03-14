function productList() {
    let product = prompt('¿Qué artículo deseas comprar? \n1-Yamaha Keyboard: $2500 + IVA \n2-Casio Keyboard: $3000 + IVA \n3-Roland Keyboard: $2000 + IVA \n0-Salir');
    return (product);
}

// console.log(productSelection);

function price(productPrice) {
    switch (productPrice) {
        case '1':
            alert('Total = ' + '$ ' + (2500 * 1.16));
            break;
        case '2':
            alert('Total = ' + '$ ' + (3000 * 1.16));
            break;
        case '3':
            alert('Total = ' + '$ ' + (2000 * 1.16));
            break;
        default:
            break;
    }
}


do {
    let productSelection = productList();
    price(productSelection);

} while (productSelection != '0');


/*
let productQuantity = 0;
let totalPrice = 0;

let price = document.getElementById("price1").price1;

document.getElementById("count").innerHTML = productQuantity;
document.getElementById("sum").innerHTML = totalPrice;

document.getElementById("add-product").addEventListener("click", productCount);

function productCount() {
    productQuantity++;
    document.getElementById("count").innerHTML = productQuantity;
}

let value = document.getElementById("price1").innerHTML;

function productPrice() {
    totalPrice;
    document.getElementById("sum").innerHTML = totalPrice;
}

*/

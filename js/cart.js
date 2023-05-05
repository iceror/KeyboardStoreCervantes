import { getProducts} from "./products.js";

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

export {calculatePrice, addToCart, updateTotals, getProduct}
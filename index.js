// cart.js
{
  /* <link rel="stylesheet" href="index.css" />; */
}
// Initialize cart array and cart count
let cart = [];
let cartCount = 0;
let totalOrderAmount;

// Function to update cart count
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = `Your cart (${cartCount})`;
}

// Function to add item to cart
function addToCart(name, price) {
  let existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.total = existingItem.quantity * existingItem.price;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      total: price,
    });
  }
  cartCount += 1;
  updateCartCount(cart);
  renderCart(cart);
}

// Function to render cart items
function renderCart(cart) {
  console.log("cart ", cart);
  let cartContainer = document.getElementById("cart-items-container");
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    let itemElement = document.createElement("div");
    itemElement.classList.add("first-item");
    itemElement.innerHTML = `
      <p class="cart_item_name">${item.name}</p>
      <div class="item_amount">
        <p id="total_item">${item.quantity}x</p>
        <p id="total_amount">@ $${item.price.toFixed(2)}</p>
        <p id="total_bill">$${item.total.toFixed(2)}</p>
      </div>
      <button class="cross_button" onclick="removeItem('${item.name}')">
        <i class="fa-solid fa-delete-left"></i>
      </button>
    `;
    cartContainer.appendChild(itemElement);
  });
  updateTotalOrder(cart);
}

// Function to remove item from cart
function removeItem(name) {
  const index = cart.findIndex((item) => item.name === name);
  console.log(item.name);
  if (index !== -1) {
    cart[index].quantity -= 1;
    cart[index].total = cart[index].quantity * cart[index].price;
    cartCount -= 1;

    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    updateCartCount();
    renderCart(cart);
  }
}

// Function to update total order
function updateTotalOrder(cart) {
  const totalOrderElement = document.getElementById("Total_amount");
  const total = cart.reduce((sum, item) => sum + item.total, 0);
  totalOrderElement.textContent = `$${total.toFixed(2)}`;
  totalOrderAmount = total;
}

let addCart = document.querySelectorAll(".add-to-cart-button");
// console.log(addCart);
addCart.forEach((button) => {
  console.log("button .... ", button);
  button.addEventListener("click", function () {
    const itemDetail = this.closest(".item_detail");
    const name = itemDetail.querySelector(".item_name").textContent;
    const price = parseFloat(
      itemDetail.querySelector(".item_price").textContent.replace("$", "")
    );
    addToCart(name, price);
  });
});

let confirmOrder = document.getElementById("popup");
let inactiveBackground = document.getElementById("mainSection");
function openConfirmationBox() {
  confirmOrder.classList.add("confirmationBoxOpen");
  inactiveBackground.classList.add("main_sectionInactive");
}
function addConfirmedItems() {
  confirmOrder = document.getElementById("confirmedCartItems");
  confirmOrder.innerHTML = "";
  cart.forEach((item) => {
    let itemElement = document.createElement("div");
    itemElement.classList.add("first-item");
    itemElement.innerHTML = `
      <p class="cart_item_name">${item.name}</p>
      <div class="item_amount">
        <p id="total_item">${item.quantity}x</p>
        <p id="total_amount">@ $${item.price.toFixed(2)}</p>
        <p id="total_bill">$${item.total.toFixed(2)}</p>
      </div>
    `;
    const totalOrderElement = document.getElementById("totalBill");
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    totalOrderElement.textContent = `$${total.toFixed(2)}`;
    confirmOrder.appendChild(itemElement);
  });
}

let confirmOrderClose = document.getElementById("popup");

function closeConfirmationBox() {
  console.log("button Clicked");
  confirmOrderClose.classList.remove("confirmationBoxOpen");
}

let cart = [];
let total = 0;

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  updateCart();
}

// UPDATE CART UI
function updateCart() {
  let cartList = document.getElementById("cartItems");
  let totalDisplay = document.getElementById("cartTotal");

  cartList.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ₦${item.price}`;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total;
}

// SEARCH FUNCTION
function searchMenu() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let items = document.querySelectorAll(".food-item");

  items.forEach(item => {
    let text = item.innerText.toLowerCase();

    if (text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// SEND TO WHATSAPP
function sendToWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "Hello, I want to order:%0A";

  cart.forEach(item => {
    message += `- ${item.name} (₦${item.price})%0A`;
  });

  message += `%0ATotal: ₦${total}`;

  let phoneNumber = "2349153792537"; // PUT YOUR NUMBER HERE

  let url = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(url, "_blank");
}

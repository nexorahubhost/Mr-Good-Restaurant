let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCart();
});

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  
  // Visual feedback
  alert(`${name} added to cart!`);
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  let cartList = document.getElementById("cart-items");
  let totalDisplay = document.getElementById("total");
  
  if (!cartList || !totalDisplay) return; // Guard clause if elements don't exist

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty</p>";
  } else {
    cart.forEach((item, index) => {
      let div = document.createElement("div");
      div.className = "cart-item";
      div.style.cssText = "display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;";
      div.innerHTML = `
        <span>${item.name} - ₦${item.price}</span>
        <button onclick="removeFromCart(${index})" style="background:#ff4444;color:white;border:none;padding:2px 8px;border-radius:50%;cursor:pointer;">×</button>
      `;
      cartList.appendChild(div);
    });
  }

  totalDisplay.textContent = `Total: ₦${total}`;
}

function searchMenu() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let items = document.querySelectorAll(".food-item");

  items.forEach(item => {
    let text = item.innerText.toLowerCase();
    if (text.includes(input)) {
      item.style.display = "block";
      let parentDetails = item.closest("details");
      if (parentDetails) parentDetails.open = true;
    } else {
      item.style.display = "none";
    }
  });
}

function sendToWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "Hello Mr Good Restaurant,%0A%0AI want to order:%0A";
  cart.forEach(item => {
    message += `- ${item.name} (₦${item.price})%0A`;
  });
  message += `%0ATotal: ₦${total}`;

  let phoneNumber = "2349153792537";
  let url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}

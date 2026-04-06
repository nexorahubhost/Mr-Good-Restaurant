let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCart();
});

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  
  alert(`${name} added to cart!`);
}

// UPDATE CART UI
function updateCart() {
  let cartList = document.getElementById("cart-items");
  let totalDisplay = document.getElementById("total");
  
  if (!cartList || !totalDisplay) return;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty</p>";
    totalDisplay.textContent = "Total: ₦0";
  } else {
    cart.forEach((item, index) => {
      let div = document.createElement("div");
      div.className = "cart-item";
      
      div.innerHTML = `
        <span>${item.name} - ₦${item.price}</span>
        <button onclick="removeFromCart(${index})" class="remove-btn">×</button>
      `;
      cartList.appendChild(div);
    });
    
    totalDisplay.textContent = `Total: ₦${total}`;
  }
}

// REMOVE ITEM
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// SEND TO WHATSAPP
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

  let phoneNumber = "2349153792539";
  let url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}

// SEARCH SYSTEM (FIXED)
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const items = document.querySelectorAll(".food-item");
  const noResult = document.getElementById("no-result");

  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    let visibleCount = 0;

    items.forEach(item => {
      const fullText = item.textContent.toLowerCase();

      if (fullText.includes(searchValue)) {
        item.style.display = "block";
        visibleCount++;

        let parentDetails = item.closest("details");
        if (parentDetails) parentDetails.open = true;

      } else {
        item.style.display = "none";
      }
    });

    if (noResult) {
      noResult.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
});

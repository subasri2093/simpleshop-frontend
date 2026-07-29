// Get logged-in user
const user = localStorage.getItem("currentUser");

if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

let cart = JSON.parse(localStorage.getItem(user + "_cart")) || [];

// Get HTML elements
const cartItems = document.getElementById("cartItems");
const totalElement = document.getElementById("total");

// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <h2 style="text-align:center;width:100%;">
                Your Cart is Empty
            </h2>
        `;

        totalElement.innerHTML = "0";
        return;
    }

    cart.forEach((product, index) => {

        total += Number(product.price);

        cartItems.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="price">₹${product.price}</p>

            <button onclick="removeItem(${index})">
                Remove
            </button>

        </div>

        `;

    });

    totalElement.innerHTML = total;
}

// Remove Product
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        user + "_cart",
        JSON.stringify(cart)
    );

    displayCart();
}

// Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Remove old Buy Now product
    localStorage.removeItem("buyNowProduct");

    // Save cart products
    localStorage.setItem("checkoutItems", JSON.stringify(cart));

    // Open checkout page
    window.location.href = "checkout.html";
}
// Load cart when page opens
displayCart();
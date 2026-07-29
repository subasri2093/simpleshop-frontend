const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
console.log("Buy Now Product:", buyNowProduct);
const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems"));

const checkout = document.getElementById("checkoutProduct");

if (buyNowProduct) {

    checkout.innerHTML = `
        <img src="${buyNowProduct.image}" width="200">
        <h2>${buyNowProduct.name}</h2>
        <h3>₹${buyNowProduct.price}</h3>
    `;

} else if (checkoutItems && checkoutItems.length > 0) {

    checkout.innerHTML = "";

    checkoutItems.forEach(product => {

        checkout.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" width="150">
                <h3>${product.name}</h3>
                <h3>₹${product.price}</h3>
            </div>
        `;

    });

} else {

    checkout.innerHTML = "<h2>No Product Selected</h2>";

}
async function placeOrder() {

    const user = localStorage.getItem("currentUser");

    if (!user) {

        alert("Please Login First");

        return;

    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (!name || !phone || !address) {
        alert("Please fill all the details.");
        return;
    }

    const order = {

    userEmail: user,   // ✅ changed

    customerName: name,

    phone: phone,

    address: address,

    payment: payment,

   product: buyNowProduct
    ? {
        ...buyNowProduct,
        id: buyNowProduct.id
      }
    : checkoutItems,


    date: new Date().toLocaleString()

};

    try {

        const response = await fetch("http://localhost:5000/order", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(order)

        });

       const data = await response.json();

alert(data.message);

// Save order locally
let orders = JSON.parse(localStorage.getItem(user + "_orders")) || [];

// If Buy Now
if (buyNowProduct) {
    orders.push({
        product: buyNowProduct,
        date: new Date().toLocaleString(),
        status: "Order Placed"
    });
}

// If Cart Checkout
if (checkoutItems) {
    checkoutItems.forEach(item => {
        orders.push({
            product: item,
            date: new Date().toLocaleString(),
            status: "Order Placed"
        });
    });
}

localStorage.setItem(user + "_orders", JSON.stringify(orders));

// Clear temporary data
localStorage.removeItem("buyNowProduct");
localStorage.removeItem("checkoutItems");

// Optional: Clear cart after checkout
localStorage.removeItem(user + "_cart");

window.location.href = "index.html";
    } catch (error) {

        console.log(error);

        alert("Order Failed!");

    }

}


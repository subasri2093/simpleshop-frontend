// ==========================
// Check Login
// ==========================
const user = localStorage.getItem("currentUser");

if (!user) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// ==========================
// Get Orders
// ==========================
let orders = JSON.parse(localStorage.getItem(user + "_orders")) || [];

// ==========================
// Orders Container
// ==========================
const box = document.getElementById("orders");

// ==========================
// Display Orders
// ==========================
function displayOrders() {

    // Reload latest orders
    orders = JSON.parse(localStorage.getItem(user + "_orders")) || [];

    box.innerHTML = "";

    if (orders.length === 0) {

        box.innerHTML = `
            <h2 style="text-align:center;margin-top:40px;">
                📦 No Orders Yet
            </h2>
        `;
        return;
    }

    orders.forEach((order, index) => {

        box.innerHTML += `

        <div class="card">

            <img src="${order.product.image}" alt="${order.product.name}">

            <h3>${order.product.name}</h3>

            <p style="color:green;font-weight:bold;">
                Delivered
            </p>

            <div class="order-buttons">

    <button class="return-btn"
        onclick="returnProduct(${index})">
        Return Product
    </button>

</div>

        </div>

        `;
    });

}

// ==========================
// Load Orders
// ==========================
displayOrders();

// ==========================
// Return Product
// ==========================
function returnProduct(index){

    let orders = JSON.parse(localStorage.getItem(user + "_orders")) || [];

    const order = orders[index];

    if(!order){
        alert("Order not found");
        return;
    }

    // Save product for return page
    localStorage.setItem(
        "returnProduct",
        JSON.stringify(order.product)
    );

    // Save index
    localStorage.setItem(
        "returnOrderIndex",
        index
    );

    // Open Return Page
    window.location.href = "return.html";
}

// ==========================
// Cancel Order
// ==========================

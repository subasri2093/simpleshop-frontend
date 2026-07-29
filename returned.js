// ==============================
// Check Login
// ==============================
const user = localStorage.getItem("currentUser");

if (!user) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// ==============================
// Get Returned Products
// ==============================
let returnedProducts =
JSON.parse(localStorage.getItem(user + "_returned")) || [];

// ==============================
// Returned Items Container
// ==============================
const box = document.getElementById("returnedItems");

// ==============================
// Display Returned Products
// ==============================
function displayReturnedProducts() {

    box.innerHTML = "";

    if (returnedProducts.length === 0) {

        box.innerHTML = `
            <h2 style="text-align:center;margin-top:40px;">
                📦 No Returned Products
            </h2>
        `;

        return;
    }

    returnedProducts.forEach((item) => {

        box.innerHTML += `

        <div class="card">

            <img src="${item.product.image}" alt="${item.product.name}">

            <h3>${item.product.name}</h3>

            <p><strong>Reason:</strong> ${item.reason}</p>

            <p><strong>Comment:</strong> ${item.comment || "No Comment"}</p>

            <p style="color:orange;font-weight:bold;">
                ${item.status}
            </p>

            <p>
                <strong>Date:</strong> ${item.date}
            </p>

        </div>

        `;

    });

}

// ==============================
// Load Returned Products
// ==============================
displayReturnedProducts();
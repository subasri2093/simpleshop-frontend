const user = localStorage.getItem("currentUser");

if (!user) {
    alert("Please Login First");
    window.location.href = "login.html";
}

let wishlist =
JSON.parse(localStorage.getItem(user + "_wishlist")) || [];

const container = document.getElementById("wishlistItems");

function displayWishlist(){

    container.innerHTML="";

    if(wishlist.length===0){

        container.innerHTML="<h2>Your Wishlist is Empty ❤️</h2>";
        return;

    }

    wishlist.forEach((product,index)=>{

        container.innerHTML += `

        <div class="card">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p class="price">₹${product.price}</p>

            <button onclick="moveToCart(${index})">
                Move To Cart
            </button>

            <button class="buy-now"
            onclick="removeWishlist(${index})">
                Remove
            </button>

        </div>

        `;

    });

}

displayWishlist();

function removeWishlist(index){

wishlist.splice(index,1);

localStorage.setItem(
user+"_wishlist",
JSON.stringify(wishlist)
);

displayWishlist();

}

function moveToCart(index){

let cart =
JSON.parse(localStorage.getItem(user+"_cart")) || [];

cart.push(wishlist[index]);

localStorage.setItem(
user+"_cart",
JSON.stringify(cart)
);

wishlist.splice(index,1);

localStorage.setItem(
user+"_wishlist",
JSON.stringify(wishlist)
);

displayWishlist();

}
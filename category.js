
const category = localStorage.getItem("selectedCategory");
function getRating(id){

    const ratings = [4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9];

    return ratings[id % ratings.length];

}
console.log(category);
console.log(products.filter(product => product.category === category));

document.getElementById("categoryTitle").innerText = category;


const filtered = products.filter(product => product.category === category);

const grid = document.getElementById("product-grid");

filtered.forEach(product => {

grid.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="rating">
    ⭐ ${getRating(product.id || index)}
    <span>(${120 + (product.id || index)} Reviews)</span>
</p>

<p class="price">₹${product.price}</p>

<button onclick="addToCart(${product.id})" class="cart-btn">

Add To Cart

</button>

<button onclick="buyNow(${product.id})" class="buy-btn">

Buy Now

</button>

</div>

`;

});

function addToCart(id){

const user = localStorage.getItem("currentUser");

if(!user){

alert("Please Login First");

window.location.href="login.html";

return;

}

const product = products.find(p=>p.id===id);

let cart = JSON.parse(localStorage.getItem(user+"_cart")) || [];

cart.push(product);

localStorage.setItem(user+"_cart",JSON.stringify(cart));

alert(product.name+" Added To Cart");

}

function buyNow(id){

const user = localStorage.getItem("currentUser");

if(!user){

alert("Please Login First");

window.location.href="login.html";

return;

}

const product = products.find(p=>p.id===id);

localStorage.setItem("buyNowProduct",JSON.stringify(product));

window.location.href="checkout.html";

}

function toggleWishlist(index){

    const heart = document.getElementById("heart" + index);

    if(heart.classList.contains("fa-regular")){

        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
        heart.style.color = "red";

        addToWishlist(index);

    }else{

        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
        heart.style.color = "#999";

    }

}

function addToWishlist(index){

    const user = localStorage.getItem("currentUser");

    if(!user){
        alert("Please Login First");
        window.location.href = "login.html";
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem(user + "_wishlist")) || [];

    // Prevent duplicate products
    const alreadyExists = wishlist.find(item => item.name === products[index].name);

    if(alreadyExists){
        return;
    }

    wishlist.push(products[index]);

    localStorage.setItem(user + "_wishlist", JSON.stringify(wishlist));

}
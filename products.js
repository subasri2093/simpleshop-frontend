function openCategory(category){

    localStorage.setItem("selectedCategory", category);

    window.location.href = "category.html";

}
function selectCategory(category) {
    localStorage.setItem("selectedCategory", category);
    window.location.href = "category.html";
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

function buyNow(index){

    const user = localStorage.getItem("currentUser");

    if(!user){
        alert("Please Login First");
        window.location.href = "login.html";
        return;
    }


    localStorage.setItem(
        "buyNowProduct",
        JSON.stringify(products[index])
    );


    window.location.href = "checkout.html";
}
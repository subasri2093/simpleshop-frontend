


// ================= PROFILE =================

const user = localStorage.getItem("currentUser");

if (user) {

    document.getElementById("userEmail").innerText = user;

    document.getElementById("profileIcon").innerText =
        user.charAt(0).toUpperCase();

} else {

    document.getElementById("userEmail").innerText = "No user logged in";

}

const profileIcon = document.getElementById("profileIcon");
const profileBox = document.getElementById("profileBox");

profileIcon.addEventListener("click", function () {

    if (profileBox.style.display === "block") {

        profileBox.style.display = "none";

    } else {

        profileBox.style.display = "block";

    }

});

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}


fetch("navbar.html")
.then(response => response.text())
.then(data => {

    const navbar = document.getElementById("navbar");

    if (navbar) {
        navbar.innerHTML = data;
    }

})
.catch(error => console.log(error));
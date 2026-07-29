const user = localStorage.getItem("currentUser");

function submitReturn() {

    const reason = document.getElementById("reason").value;
    const comment = document.getElementById("comment").value;

    if (reason === "") {
        alert("Please select a return reason.");
        return;
    }

    const returned =
        JSON.parse(localStorage.getItem(user + "_returned")) || [];

    const product =
        JSON.parse(localStorage.getItem("returnProduct"));

    if (!product) {
        alert("No product selected.");
        return;
    }

    returned.push({

        product: product,

        reason: reason,

        comment: comment,

        status: "Return Requested",

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(
        user + "_returned",
        JSON.stringify(returned)
    );

    // Remove from My Orders
    const orderIndex = localStorage.getItem("returnOrderIndex");

    let orders =
        JSON.parse(localStorage.getItem(user + "_orders")) || [];

    if (orderIndex !== null) {

        orders.splice(Number(orderIndex), 1);

        localStorage.setItem(
            user + "_orders",
            JSON.stringify(orders)
        );

        localStorage.removeItem("returnOrderIndex");
    }

    localStorage.removeItem("returnProduct");

    alert("Return request submitted successfully!");

    window.location.href = "returned.html";
}
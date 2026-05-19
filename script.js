// script.js

console.log("Portfolio Loaded Successfully!");
window.addEventListener("load", function(){

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 2000);

});

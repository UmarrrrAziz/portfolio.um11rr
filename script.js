// script.js

console.log("Portfolio Loaded Successfully!");
window.addEventListener("load", function(){

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 2000);

});
/* AI FACE SCAN */

window.addEventListener("load", ()=>{

    const scanner = document.getElementById("scanner");

    const status = document.getElementById("scan-status");

    const messages = [

        "Initializing AI Systems",

        "Scanning Face",

        "Identity Verified",

        "Access Granted",

        "Welcome Umar Bin Abdul Aziz"

    ];

    let i = 0;

    const interval = setInterval(()=>{

        status.innerText = messages[i];

        i++;

        if(i >= messages.length){

            clearInterval(interval);

            setTimeout(()=>{

                scanner.style.opacity = "0";

                scanner.style.visibility = "hidden";

            },1000);

        }

    },1200);

});

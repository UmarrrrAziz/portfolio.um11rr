// =========================
// PORTFOLIO LOADED
// =========================

console.log("Portfolio Loaded Successfully!");


// =========================
// INTRO LOADER
// =========================

window.addEventListener("load", function(){

    const loader =
    document.getElementById("loader");

    if(loader){

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 2000);

    }

});


/* AI FACE SCAN */

window.addEventListener("load", () => {

    const scanner =
    document.getElementById("scanner");

    const status =
    document.getElementById("scan-status");

    // AGAR ELEMENT NA MILE TOH EXIT
    if(!scanner || !status){
        return;
    }

    const messages = [

        "Initializing AI Systems",
        "Scanning Face",
        "Identity Verified",
        "Access Granted",
        "Welcome Umar Bin Abdul Aziz 🚀"

    ];

    let i = 0;

    status.innerText = messages[0];

    const interval = setInterval(() => {

        i++;

        if(i < messages.length){

            status.innerText =
            messages[i];

        }

        else{

            clearInterval(interval);

            setTimeout(() => {

                scanner.style.opacity = "0";

                scanner.style.visibility = "hidden";

            },1000);

        }

    },1200);

});



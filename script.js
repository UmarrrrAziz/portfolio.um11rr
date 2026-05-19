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
function toggleChat(){

    const chat =
    document.getElementById("jarvisChat");

    if(chat.style.display === "block"){

        chat.style.display = "none";

    }else{

        chat.style.display = "block";

    }
}

function sendMessage(){

    const input =
    document.getElementById("userInput");

    const chatBody =
    document.getElementById("chatBody");

    const userText =
    input.value.toLowerCase();

    if(input.value.trim() === "") return;

    const userMessage =
    document.createElement("div");

    userMessage.className =
    "user-message";

    userMessage.textContent =
    input.value;

    chatBody.appendChild(userMessage);

    let reply =
    "I don't understand that yet.";

    if(userText.includes("name")){

        reply =
        "His name is Umar Bin Abdul Aziz 🚀";

    }

    else if(userText.includes("bgmi")){

        reply =
        "BGMI ID: 5113772029 🎮";

    }

    else if(userText.includes("skills")){

        reply =
        "Python, Next.js, HTML, CSS, JavaScript and Gaming.";

    }

    else if(userText.includes("instagram")){

        reply =
        "@um11rr_ 📸";

    }

    else if(userText.includes("telegram")){

        reply =
        "@um11rr ✈️";

    }

    else if(userText.includes("coder")){

        reply =
        "Yes 😎 Umar is passionate about coding and development.";

    }

    const botMessage =
    document.createElement("div");

    botMessage.className =
    "bot-message";

    setTimeout(() => {

        botMessage.textContent =
        reply;

        chatBody.appendChild(botMessage);

        chatBody.scrollTop =
        chatBody.scrollHeight;

    }, 700);

    input.value = "";
}

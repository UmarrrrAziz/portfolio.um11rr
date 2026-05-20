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


// =========================
// AI FACE SCAN
// =========================

window.addEventListener("load", ()=>{

    const scanner =
    document.getElementById("scanner");

    const status =
    document.getElementById("scan-status");

    if(scanner && status){

        const messages = [

            "Initializing AI Systems",

            "Scanning Face",

            "Identity Verified",

            "Access Granted",

            "Welcome Umar Bin Abdul Aziz 🚀"

        ];

        let i = 0;

        const interval = setInterval(()=>{

            status.innerText =
            messages[i];

            i++;

            if(i >= messages.length){

                clearInterval(interval);

                setTimeout(()=>{

                    scanner.style.opacity = "0";

                    scanner.style.visibility = "hidden";

                },1000);

            }

        },1200);

    }

});


// =========================
// JARVIS CHAT TOGGLE
// =========================

function toggleChat(){

    const chat =
    document.getElementById("jarvisChat");

    if(chat.style.display === "block"){

        chat.style.display = "none";

    }

    else{

        chat.style.display = "block";

    }

}


// =========================
// SEND MESSAGE
// =========================

async function sendMessage(){

    const input =
    document.getElementById("userInput");

    const chatBody =
    document.getElementById("chatBody");

    const userText =
    input.value;

    if(userText.trim() === "") return;


    // USER MESSAGE

    const userMessage =
    document.createElement("div");

    userMessage.className =
    "user-message";

    userMessage.textContent =
    userText;

    chatBody.appendChild(userMessage);

    input.value = "";


    // BOT THINKING

    const botMessage =
    document.createElement("div");

    botMessage.className =
    "bot-message";

    botMessage.textContent =
    "Thinking...";

    chatBody.appendChild(botMessage);

    chatBody.scrollTop =
    chatBody.scrollHeight;


    try{

       const response = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
    method:"POST",

    headers:{
        "Content-Type":"application/json",

        "Authorization":
        "Bearer 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"
    },

    body:JSON.stringify({

        model:"llama3-8b-8192",

        messages:[

            {
                role:"system",

                content:
                "You are Umar's futuristic AI assistant."

            },

            {
                role:"user",

                content:userText
            }

        ]

    })

});

const data = await response.json();

console.log(data);

botMessage.textContent =
data.choices[0].message.content;

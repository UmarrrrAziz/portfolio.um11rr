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

async function sendMessage(){

    const input =
    document.getElementById("userInput");

    const chatBody =
    document.getElementById("chatBody");

    const userText =
    input.value;

    if(userText.trim() === "") return;

    const userMessage =
    document.createElement("div");

    userMessage.className =
    "user-message";

    userMessage.textContent =
    userText;

    chatBody.appendChild(userMessage);

    input.value = "";

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
                "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"

            },

            body:JSON.stringify({

                model:"gpt-3.5-turbo",

                messages:[

                    {
                        role:"system",

                        content:
                        "You are Umar's AI assistant."
                    },

                    {
                        role:"user",

                        content:userText
                    }

                ]

            })

        });

        const data =
        await response.json();

        botMessage.textContent =
        data.choices[0].message.content;

    }

    catch(error){

        botMessage.textContent =
        "Error connecting to AI.";

    }

}

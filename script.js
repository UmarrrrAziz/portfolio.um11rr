// =========================
// PORTFOLIO LOADED
// =========================
console.log("SCRIPT RUNNING");
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

            loader.style.display = "none";
            
        }, 2000);

    }

});

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


    // BOT MESSAGE

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

            "/api/chat",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    message:userText

                })

            }

        );

        const data =
        await response.json();

        botMessage.textContent =
        data.reply;

    }

    catch(error){

        botMessage.textContent =
        "AI Server Error 😭";

    }

}
function toggleChat(){

    const chat =
    document.getElementById("jarvisChat");

    if(chat.style.display === "flex"){

        chat.style.display = "none";

    }else{

        chat.style.display = "flex";

    }
}

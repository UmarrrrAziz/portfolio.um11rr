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
/* =========================
   SOLAR SYSTEM
========================= */

const scene = new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(

    75,

    window.innerWidth /
    window.innerHeight,

    0.1,

    1000

);

const renderer =
new THREE.WebGLRenderer({

    canvas:
    document.getElementById("spaceCanvas"),

    antialias:true

});

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

camera.position.z = 40;

/* SUN */

const sunGeometry =
new THREE.SphereGeometry(5,64,64);

const sunMaterial =
new THREE.MeshBasicMaterial({

    color:0xffaa00

});

const sun =
new THREE.Mesh(

    sunGeometry,

    sunMaterial

);

scene.add(sun);

/* EARTH */

const earthGeometry =
new THREE.SphereGeometry(2,64,64);

const earthMaterial =
new THREE.MeshStandardMaterial({

    color:0x2266ff

});

const earth =
new THREE.Mesh(

    earthGeometry,

    earthMaterial

);

earth.position.x = 15;

scene.add(earth);

/* LIGHT */

const light =
new THREE.PointLight(

    0xffffff,

    2

);

scene.add(light);

/* STARS */

const starsGeometry =
new THREE.BufferGeometry();

const starsCount = 10000;

const positions = [];

for(let i=0;i<starsCount;i++){

    positions.push(

        (Math.random()-0.5)*2000,

        (Math.random()-0.5)*2000,

        (Math.random()-0.5)*2000

    );

}

starsGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        positions,

        3

    )

);

const starsMaterial =
new THREE.PointsMaterial({

    color:0xffffff,

    size:0.7

});

const stars =
new THREE.Points(

    starsGeometry,

    starsMaterial

);

scene.add(stars);

/* ANIMATION */

function animate(){

    requestAnimationFrame(animate);

    sun.rotation.y += 0.003;

    earth.rotation.y += 0.01;

    earth.position.x =
    Math.cos(Date.now()*0.0005)*15;

    earth.position.z =
    Math.sin(Date.now()*0.0005)*15;

    renderer.render(

        scene,

        camera

    );

}

animate();

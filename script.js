document.addEventListener("DOMContentLoaded", start);


const idSheet = "1VOJFzxDUXd83bzMEyk91RS-yCpbE2FJQ1e7HotTucYc";
const endpoint = `https://spreadsheets.google.com/feeds/list/${idSheet}/od6/public/values?alt=json`;

let kager = [];
let knapFilter = document.querySelectorAll(".filter");
let filter = "alle";



function start() {
    console.log("load");
    loadData();

    document.querySelector("body").classList.add("fade_in_slide");

    knapFilter.forEach(knap => {
        knap.addEventListener("click", filtrerKager)
    });
}

async function loadData() {
    const response = await fetch(endpoint);
    kager = await response.json();
    console.log(kager);
    visKager();
}

// Tilføj bestemt klasse til den aktive filter knap
function filtrerKager() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt")
    visKager();
}

//Opbyg de kloner af json fil der bruges til grid
function visKager() {

    //Sæt variabler
    let container = document.querySelector(".data_container");
    let template = document.querySelector("template");
    let article = document.querySelector("article");
    container.innerHTML = "";


    kager.feed.entry.forEach(kage => {
        if (kage.gsx$kategori.$t == filter || filter == "alle") {
            let klon = template.cloneNode(true).content;
            klon.querySelector("h2").textContent = kage.gsx$navn.$t;
            klon.querySelector(".billede").src = `../img/${kage.gsx$billede.$t}.jpg`;

            //Bruges til at vide hvornår pop up skal sættes op

            let event = klon.querySelector(".billede");

            event.addEventListener("click", popOp, false);

            event.kage = kage;

            container.appendChild(klon);
        }
    });
}

//Vis pop op skærm for det klikkede billede
function popOp(event) {

    let popOpScreen = document.querySelector(".pop_op");

    //Hent information fra json fil for specifik kage man har trykket på
    let jsonPop = event.currentTarget.kage;

    //Insæt billede med alt og src

    popOpScreen.querySelector(".pop_billede").src = "../img/" + jsonPop.gsx$billede.$t + ".jpg";

    popOpScreen.querySelector(".pop_billede").alt = jsonPop.gsx$navn.$t;

    //Indsæt beskrivelsen
    popOpScreen.querySelector(".beskrivelse").textContent = jsonPop.gsx$beskrivelse.$t;

    //Display popOp

    document.querySelector(".pop_op").style.display = "block";

    //Tilføj eventlistener så man kan trykke væk fra pop op igen

    document.querySelector(".exit").addEventListener("click", popGone)

}


//Fjern pop op skærm og eventlistener
function popGone() {
    document.querySelector(".pop_op").style.display = "none";
    document.querySelector(".exit").removeEventListener("click", popGone)

}

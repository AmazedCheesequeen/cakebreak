document.addEventListener("DOMContentLoaded", start);


const idSheet = "1VOJFzxDUXd83bzMEyk91RS-yCpbE2FJQ1e7HotTucYc";
const endpoint = `https://spreadsheets.google.com/feeds/list/${idSheet}/od6/public/values?alt=json`;

let kager = [];
let knapFilter = document.querySelectorAll(".filter");
let filter = "alle";



function start() {
    console.log("load");
    loadData();

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


function filtrerKager() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt")
    visKager();
}

function visKager() {
    let container = document.querySelector(".data_container");
    let template = document.querySelector("template");
    let article = document.querySelector("article");
    container.innerHTML = "";


    kager.feed.entry.forEach(kage => {
        if (kage.gsx$kategori.$t == filter || filter == "alle") {
            let klon = template.cloneNode(true).content;
            klon.querySelector("h2").textContent = kage.gsx$kategori.$t;
            klon.querySelector("img").src = `img/${kage.gsx$billede.$t}.jpg)`;
            klon.querySelector(".navn").textContent += kage.gsx$navn.$t;
            klon.querySelector(".beskrivelse").textContent += kage.gsx$beskrivelse.$t;

            klon.querySelector(".kage").addEventListener("click", () => {
                location.href = `popup.html?id=${kage.gsx$id.$t}`;
            });

            container.appendChild(klon);
        }
    });
}

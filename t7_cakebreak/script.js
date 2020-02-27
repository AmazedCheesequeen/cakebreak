  document.addEventListener("DOMContentLoaded", start);

  //jSon spreadshit ID
  const idSheet = "1VOJFzxDUXd83bzMEyk91RS-yCpbE2FJQ1e7HotTucYc";
  const endpoint = `https://spreadsheets.google.com/feeds/list/${idSheet}/od6/public/values?alt=json`;


  //variabler
  let kager = [];
  let knapFilter = document.querySelectorAll(".filter");
  let filter = "alle";



  //load-animation
  function start() {
      console.log("load");
      loadData();

      document.querySelector("body").classList.add("fade_in_slide");

      knapFilter.forEach(knap => {
          knap.addEventListener("click", filtrerKager)
      });
  }


  //fetch jSon
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
              klon.querySelector(".billede").src = `img/${kage.gsx$billede.$t}.jpg`;
              klon.querySelector(".billede").alt = kage.gsx$navn.$t;

              //Bruges til at vide hvornår pop up skal sættes op

              klon.querySelector(".kage").addEventListener("click", () => {
                  visPopup(kage);
              });

              container.appendChild(klon);
          }
      });
  }


  function visPopup(kage) {
      popup.classList.remove("skjul");
      popup.querySelector("#tilbage").addEventListener("click", () => {
          popup.classList.add("skjul");
      });

      popup.querySelector("h2").textContent = kage.gsx$navn.$t;
      popup.querySelector("img").src = `img/${kage.gsx$billede.$t}.jpg`;
      popup.querySelector("p").textContent = kage.gsx$beskrivelse.$t;
  }

document.addEventListener("DOMContentLoaded", start);


const idSheet = "13ahAGLQCN5piGwRaCvH8r-V6Xm5LgIraxCeZsWFMIE4";
const endpoint = `https://spreadsheets.google.com/feeds/list/${idSheet}/od6/public/values?alt=json`;


async function loadData() {
    const response = await fetch(endpoint);
    credit = await response.json();
    console.log(credit);
    visCredit();
}

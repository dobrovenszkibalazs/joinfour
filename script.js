let ido = parseInt(document.getElementById("Ido"));

function start() {
    const doboz = document.getElementById("doboz");   
    const x = parseInt(document.getElementById("Sor").value);
    const y = parseInt(document.getElementById("Oszlop").value);
    Megjelenit(doboz, x, y);
}

function RNG() {

}

function WinCheck() {
    
}

function Idozitoupdate() {

}

function game() {

}

function EsesHelySzamito() {

}

function Megjelenit(doboz, x, y) {
    doboz.innerHTML = "";
    const table = document.createElement("table");
    for (let i = 0; i < x; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < y; j++) {
            const td = document.createElement("td");
            td.innerText = "-"
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    doboz.appendChild(table);
}
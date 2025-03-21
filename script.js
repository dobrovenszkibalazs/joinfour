let ido = parseInt(document.getElementById("Ido"));
let jatekos = 1;
const alsok = [];
const matrix = [];
const tabla = [];
let x; 
let y;

function start() {
    const doboz = document.getElementById("doboz");   
    x = parseInt(document.getElementById("sor").value);
    y = parseInt(document.getElementById("oszlop").value);
    feltoltAlsok(x);
    Megjelenit(doboz, x, y);
}

function feltoltAlsok(n) {
    for (let i = 0; i < n; i++) {
        alsok[i] = 0;
    }
    console.log(alsok);
}

function rng(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function winCheck() {
    
}

function idozitoUpdate() {

}

function game() {

}

function frissit() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 0) {
                tabla[i][j].innerHTML = "-";
            } else if (matrix[i][j] == 1) {
                tabla[i][j].innerHTML = "1";
            } else {
                tabla[i][j].innerHTML = "2";
            }
        }
    }
}

function koviJatekos() {
    if (jatekos == 1) {
        jatekos++;
    } else {
        jatekos--;
    }
}

function lerak(j) {
    if (alsok[j] < x) {
        console.log(alsok);
        matrix[y-alsok[j]-1][j] = jatekos;
        alsok[j]++;
        koviJatekos();
        frissit();
    }
}

function kereses(l, v, n) {
    let i = 0;
    while (i < n && l[i] != v) {
        i++;
    }
    return (i < n) ? i : -1;
}

function Megjelenit(doboz, x, y) {
    doboz.innerHTML = "";
    const table = document.createElement("table");
    for (let i = 0; i < x; i++) {
        const tr = document.createElement("tr");
        matrix[i] = [];
        tabla[i] = [];
        for (let j = 0; j < y; j++) {
            const td = document.createElement("td");
            td.innerText = "-"
            tr.appendChild(td);
            td.addEventListener("click", function() {
                lerak(j);
                console.log(j)
            })
            tabla[i][j] = td;
            matrix[i][j] = 0;
        }
        table.appendChild(tr);
    }
    doboz.appendChild(table);
    console.log(matrix);
}
let ido = parseInt(document.getElementById("Ido"));
let jatekos = 1;
const alsok = [];
const matrix = [];
const tabla = [];
let x;
let y;
let kotheto;

function start() {
    const doboz = document.getElementById("doboz");
    x = parseInt(document.getElementById("sor").value);
    y = parseInt(document.getElementById("oszlop").value);
    n = parseInt(document.getElementById("n").value);
    kotheto = (n > max(x,y)) ? min(y): n;
    feltoltAlsok(x);
    Megjelenit(doboz, x, y);
}

function min(x,y) {
    return (x > y) ? y : x;
}

function max(x,y) {
    return (x >= y) ? x : y;
}

function feltoltAlsok(n) {
    for (let i = 0; i < n; i++) {
        alsok[i] = 0;
    }
}

function rng(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function idozitoUpdate() {

}

function game() {

}

function frissit() {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (matrix[i][j] == 0) {
                tabla[i][j].innerHTML = "-";
            } else if (matrix[i][j] == 1) {
                tabla[i][j].innerHTML = "";
                let img = document.createElement("img");
                img.src = "imgs/bule.png";
                img.alt = "O";  
                tabla[i][j].appendChild(img);          
            } else {
                tabla[i][j].innerHTML = "";
                let img = document.createElement("img");
                img.src = "imgs/red.png"; 
                img.alt = "O";
                tabla[i][j].appendChild(img);
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

function winCheck() {
    // Vízszintesen
    for (let i = 0; i < x; i++) {
        combo = 0;
        j = y-1;
        while (j-combo >= kotheto) {
            if (matrix[j][i] == jatekos) {
                combo++;
            } else {
                combo = 0;
            }
            j--;
            if (combo == kotheto) {
                return true;
            }
        }
    }
    //Oszlopban
    for (let i = 0; i < y; i++) {
        combo = 0;
        j = 0;
        while (j-combo <= x-kotheto) {
            if (matrix[i][j] == jatekos) {
                combo++;
            } else {
                combo = 0;
            }
            j++;
            if (combo == kotheto) {
                return true;
            }
        }
    }
    // Jobbra átlósan
    for (let i = y-1; i >= kotheto-1; i--) {
        for (let j = 0; j < x-kotheto+1; j++) {
            combo = 0;
            let k = i;
            let l = j;
            while (l <= x-kotheto+combo && k >= kotheto-1-combo) {
                if (matrix[k][l] == jatekos) {
                    combo++;
                } else {
                    combo = 0;
                }
                k--;
                l++;
                if (combo == kotheto) {
                    return true;
                }
            }
        }
    }
    // Balra átlósan
    for (let i = y-1; i >= kotheto-1; i--) {
        for (let j = kotheto-1; j < x; j++) {
            combo = 0;
            let k = i;
            let l = j;
            while (l >= 0 && k >= kotheto-1-combo) {
                if (matrix[k][l] == jatekos) {
                    combo++;
                } else {
                    combo = 0;
                }
                k--;
                l--;
                if (combo == kotheto) {
                    return true;
                }
            }
        }
    }
    return false;
}

function lerak(j) {
    if (alsok[j] < x) {
        matrix[y-alsok[j]-1][j] = jatekos;
        alsok[j]++;
        frissit();
        console.log(winCheck() ? "NYERT " + jatekos : "Nada");
        koviJatekos();
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
            })
            tabla[i][j] = td;
            matrix[i][j] = 0;
        }
        table.appendChild(tr);
    }
    doboz.appendChild(table);
}
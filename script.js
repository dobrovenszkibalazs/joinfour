let jatekos = 1;
const alsok = [];
const matrix = [];
const tabla = [];
let playerTime = [0, 0];
let idozito = null;
let x;
let y;
let kotheto;
let tictactoe;
let rakhatod;
let animacioId;
let zuhanasIndex;
let lepesek;

function start() {
    
    const doboz = document.getElementById("doboz");
    tictactoe = document.getElementById("tictactoe").checked;
    if (tictactoe) {
        x = 3, y = 3, kotheto = 3, document.getElementById("idok").style.display = "none", document.getElementById("nemidok").style.visibility = "visible";
    } else {
        x = parseInt(document.getElementById("sor").value);
        y = parseInt(document.getElementById("oszlop").value);
        if (isNaN(x) || isNaN(y)) return -1;
        document.getElementById("nemidok").style.display = "none";
        n = parseInt(document.getElementById("n").value);
        kotheto = (n > max(x,y) || isNaN(n)) ? min(x,y): n;
    }
    let ido = parseInt(document.getElementById("ido").value);
    if (isNaN(ido)) {
        ido = 3;
    }
    rakhatod = true
    lepesek = 0;
    Jatekosszoveg()
    feltoltAlsok(x);
    Megjelenit(doboz, x, y);

    playerTime[0] = ido * 60;
    playerTime[1] = ido * 60;
    idozitoUpdate();
    startTimer(jatekos);
}

function Jatekosszoveg() {
    const turnDiv = document.getElementById("jatekosTurn");
    if (jatekos === 1) {
        turnDiv.classList.remove("jatekos-2-jon");
        turnDiv.classList.add("jatekos-1-jon");
    } else {
        turnDiv.classList.remove("jatekos-1-jon");
        turnDiv.classList.add("jatekos-2-jon");
    }
}

function startTimer(player) {
    stop();

    idozito = setInterval(() => {
        const index = player - 1;
        if (playerTime[index] > 0) {
            playerTime[index]--;
            idozitoUpdate();
        } else {
            stop();
            winScreen((jatekos == 1) ? 2 : 1);
        }
    }, 1000);
}

function stop() {
    clearInterval(idozito);
}

function idozitoUpdate() {
    var elsotimer = atalakitas(playerTime[0]);
    var masodiktimer = atalakitas(playerTime[1]);
    document.getElementById("player1Time").innerText = `Játékos 1 ideje: ${elsotimer}`;
    document.getElementById("player2Time").innerText = `Játékos 2 ideje: ${masodiktimer}`;
}

function atalakitas(ms) {
    let min = Math.floor(ms / 60);
    let sec = ms % 60;
    let minS = min.toString();
    let secS = sec.toString();
    if (min < 10) {
        minS = "0" + minS;
    }
    if (sec < 10) {
        secS = "0" + secS;
    }
    return minS + ":" + secS;
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

function frissit() {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (matrix[i][j] == 0) {
                tabla[i][j].innerHTML = "";
            } else if (matrix[i][j] == 1) {
                tabla[i][j].innerHTML = "";
                let img = document.createElement("img");
                img.src = (tictactoe) ? "imgs/O.png" : "imgs/bule.png";
                img.alt = "O";
                if (!tictactoe) {
                    img.classList.add("golyo");
                };
                tabla[i][j].appendChild(img);
            } else {
                tabla[i][j].innerHTML = "";
                let img = document.createElement("img");
                img.src = (tictactoe) ? "imgs/X.png" : "imgs/red.png";
                img.alt = "X";
                if (!tictactoe) {
                    img.classList.add("golyo");
                };
                tabla[i][j].appendChild(img);
            }
        }
    }
}

function koviJatekos() {
    if (jatekos == 1) {
        jatekos++;
        startTimer(jatekos);
    } else {
        jatekos--;
        startTimer(jatekos);
    }
    Jatekosszoveg()
}

function winCheck() {
    if (tictactoe) {
        // Vízszintesen
        for (let i = 0; i < 3; i++) {
            let j = 0;
            while (j < 3 && matrix[i][j] == jatekos) {
                j++;
            }
            if (!(j < 3)) return 1;
        }
        // Oszlopban
        for (let i = 0; i < 3; i++) {
            let j = 0;
            while (j < 3 && matrix[j][i] == jatekos) {
                j++;
            }
            if (!(j < 3)) return 1;
        }
        // Átlósan
        if (matrix[1][1] == jatekos && ((matrix[0][0] == jatekos && matrix[2][2]) || (matrix[2][0] == jatekos && matrix[0][2]))) return 1;
    } else {
        // Oszlopban
        for (let i = 0; i < x; i++) {
            combo = 0;
            j = y-1;
            while (j+combo >= kotheto-1) {
                if (matrix[j][i] == jatekos) {
                    combo++;
                } else {
                    combo = 0;
                }
                j--;
                if (combo == kotheto) {
                    return 1;
                }
            }
        }
        // Vízszintesen
        for (let i = y-1; i >= 0; i--) {
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
                    return 1;
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
                        return 1;
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
                        return 1;
                    }
                }
            }
        }
    }
    if (lepesek == x*y) return 2;
    return 0;
}

function zuhan(j) {
    matrix[zuhanasIndex][j] = 0;
    zuhanasIndex++;
    matrix[zuhanasIndex][j] = jatekos;
    frissit();
    if (y-alsok[j]-1 == zuhanasIndex) {
        clearInterval(animacioId);
        alsok[j]++;
        win = winCheck();
        if (win == 1) {
            winScreen(jatekos);
        } else if (win == 0) {
            rakhatod = true;
            koviJatekos();
        } else {
            winScreen(0);
        }
    }
}

function lerak(i, j) {
    if (tictactoe) {
        if (matrix[i][j] == 0 && rakhatod) {
            rakhatod = false; 
            matrix[i][j] = jatekos;
            frissit();
            lepesek++;
            win = winCheck();
            if (win == 1) {
                winScreen(jatekos);
            } else if (win == 0) {
                koviJatekos();
            } else {
                winScreen(0);
            }
            setTimeout(function() {
                rakhatod = true;
            }, 800);
        }
    } else {
        if (alsok[j] < x && rakhatod) {  
            rakhatod = false;
            lepesek++;
            if (y-i-1 >= alsok[j]+1) {
                zuhanasIndex = i;
                matrix[i][j] = jatekos;
                frissit();
                animacioId = setInterval(zuhan, 200, j);
            } else {
                matrix[y-alsok[j]-1][j] = jatekos;
                alsok[j]++;
                frissit();
                win = winCheck();
                if (win == 1) {
                    winScreen(jatekos);
                } else if (win == 0) {
                    koviJatekos();
                } else {
                    winScreen(0);
                }
                setTimeout(function() {
                    rakhatod = true;
                }, 800);
            }
        }
    }
}

function winScreen(nyertes) {
    stop();
    clearInterval(animacioId);
    const winText = document.getElementById("winText");
    const winScreen = document.getElementById("winScreen");
    if (nyertes == 0) {
        winText.innerText = "Döntetlen!";
    } else {
        winText.innerText = `Játékos ${nyertes} nyert!`;
    }
    winScreen.classList.remove("hidden");
    const replay = document.getElementById("replay");
    replay.onclick = () => {
        location.reload();
    };
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
            td.innerText = ""
            tr.appendChild(td);
            td.addEventListener("click", function() {
                lerak(i, j);
            })
            if (!tictactoe) {
                td.style.backgroundImage = "url('imgs/cella.png')";
            } else {
                td.style.backgroundColor = "white";
                td.style.border = "3px solid black"
            }
            tabla[i][j] = td;
            matrix[i][j] = 0;
        }
        table.appendChild(tr);
    }
    doboz.appendChild(table);
}
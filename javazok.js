var img = document.getElementById("meme");
var counter = document.getElementById("szam");
var count = parseInt(counter.innerHTML, 10);
let ff = false;
let up3 = false;
let nerftime = false;
let jagerreset = false;
let b3 = document.getElementById("boost3");
var matek = Math.floor((Math.round(Math.log10(count) * 2) * (upbg / 15)));
var changecount = 0;
var smallcountbuff = 1;
var upbg = 0;
var kattosido = 200;
var kaido = 19;
document.getElementById("auto1").style.display = "none";
document.getElementById("bc").style.display = "none";
document.getElementById("nerf-message").style.display = "none";
document.getElementById("ides").style.display = "none";
document.getElementById("ides2").style.display = "none";
kepcount = 0;

function incrementalok() {
    if (!ff) {
        let kattido = true;
        img.addEventListener("click", function () {
            if (!kattido) return;
            kattido = false;
            jagerreset = false;
            setTimeout(() => {
                kattido = true;
            }, kattosido);

            if (changecount == 0) {
                count++;
            } else {              
                if (up3) {
                    matek = Math.floor((Math.round(Math.log10(count) * 2) * (upbg / 15)));
                    count += (changecount * matek) * smallcountbuff;
                    b3.innerText = matek;
                }
                else {
                    count += changecount * smallcountbuff;
                }
            }
            counter.innerHTML = Math.floor(Math.round(count));
            if (count >= 10000000) {
                jagerreset = true;
                document.getElementById("ides").style.display = "block";
                document.getElementById("ides2").style.display = "block";
            }
        });
        ff = true;
        designolok()       
    }
}

function designolok() {
    img.addEventListener("mouseup", function () {
        img.classList.remove("ac");
    });

    img.addEventListener("mousedown", function () {
        img.classList.add("ac");
    });
}

function kepcsere() {
    if (kepcount != 1) {
        kepcount++;
    }
    else {
        kepcount--;
    }
    const kepturn = document.getElementById("kepeses");
    if (kepcount === 1) {
        kepturn.classList.remove("darkmode");
        kepturn.classList.add("lightmode");
    }
    else {
        kepturn.classList.remove("lightmode");
        kepturn.classList.add("darkmode");
    }
}

function upgrade1() {
    let arszam = document.getElementById("arszam");
    let booster = document.getElementById("boost");
    if (count >= arszam.innerText)  {
        count -= arszam.innerText;
        upbg += 1;
        if (count <= 100000 && !nerftime) {           
            if (changecount == 0) {
            changecount += 2;
            }
            else {
                changecount *= 2;
            }
        }
        else {
            changecount *= 1.5;
            document.getElementById("nerf-message").style.display = "block";
        } 
        arszam.innerText = Math.floor(Math.round(arszam.innerText * 2.75));
        booster.innerText = changecount;
    }
}

function upgrade2() {
    let arszam2 = document.getElementById("arszam2");
    let boost2 = document.getElementById("boost2");
    if (count >= arszam2.innerText) {
        count -= arszam2.innerText;
        upbg += 1;
        arszam2.innerText = Math.floor(Math.round(arszam2.innerText * 2));
        smallcountbuff *= 1.1;      
    }
    boost2.innerText = smallcountbuff;
}

function upgrade3() {
    let kszam = document.getElementById("kszam");
    if (count >= kszam.innerText)  {
        upbg += 1;
        count -= kszam.innerText;
        kszam.innerText = "Megvéve"
        up3 = true;           
    }
}

function upgrade4() {
    let kszam2 = document.getElementById("karszam2");
    let debuff = document.getElementById("debuff");
    if (count >= kszam2.innerText)  {
        upbg += 1;
        count -= kszam2.innerText;
        Math.floor(Math.round(kszam2.innerText *= 1.5));
        if (kattosido > 0) {
            kattosido -= 10;
            debuff.innerText = "0." + kaido;
            kaido -= 1;
            if (kattosido < 10) {
                kattosido -= 10;
                debuff.innerText = "0.0" + kaido;
                kaido -= 1;
            }
        }
        else {
            debuff.innerText = "0";
        }          
    }
}
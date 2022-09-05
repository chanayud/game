var para = new URLSearchParams(window.location.search);
var userName = para.get("userName");
var pointer = 0;
var life = 3;
let numLength = 0;
let cnt = 0;
let index = new Array();
let flag=true;
let counter = 0;
document.getElementById("start").onclick = function () {
    index = {}; cnt = 0; numLength = 0; pointer = 0;
    counter++;
    life = 3;
    document.getElementById("life").innerHTML = life + " ";
    document.getElementById("points").innerHTML = cnt;
    document.getElementById("start").innerHTML = "התחל מחדש";
    theLoopGameFunction();
};
document.getElementById("redButton").onclick = function () { if (counter != 0) compareFunction(1) };

async function redFunction() {
    let audio = new Audio('red.mp3');
    audio.play();
    console.log("red");
    const btn = document.getElementById('redButton');
    btn.style.backgroundColor = '#ff6666';
    btn.style.color = 'black';
    await new Promise(r => setTimeout(r, 500));
    btn.style.backgroundColor = 'red';
    btn.style.color = 'white';

};

document.getElementById("blueButton").onclick = function () { if (counter != 0) compareFunction(2) };

async function blueFunction() {
    let audio = new Audio('blue.mp3');
    audio.play();
    console.log(" blue");
    const btn = document.getElementById('blueButton');
    btn.style.backgroundColor = '#66ccff';
    btn.style.color = 'black';
    await new Promise(r => setTimeout(r, 500));
    btn.style.backgroundColor = 'blue';
    btn.style.color = 'white';
};

document.getElementById("yellowButton").onclick = function () { if (counter != 0) compareFunction(3) };

async function yellowFunction() {
    let audio = new Audio('yellow.mp3');
    audio.play();
    console.log(" yellow");
    const btn = document.getElementById('yellowButton');
    btn.style.backgroundColor = '#ffff99';
    btn.style.color = 'black';
    await new Promise(r => setTimeout(r, 500));
    btn.style.backgroundColor = 'yellow';
    btn.style.color = 'white';
};

document.getElementById("greenButton").onclick = function () { if (counter != 0) compareFunction(4) };

async function greenFunction() {
    let audio = new Audio('green.mp3');
    audio.play();
    console.log("green")
    const btn = document.getElementById('greenButton');
    btn.style.backgroundColor = '#99ff99';
    btn.style.color = 'black';
    await new Promise(r => setTimeout(r, 500));
    btn.style.backgroundColor = 'green';
    btn.style.color = 'white';

};

async function theLoopGameFunction() {
    await new Promise(r => setTimeout(r, 700));
    let theRandomNumber = Math.floor(Math.random() * 4) + 1;
    console.log(numLength);
    index[numLength] = theRandomNumber;
    console.log(index.length);
    loop();
    
}
async function loop() {
    for (let i = 0; i <= numLength; i++) {
        console.log(index[i]);
        if (index[i] == 1) {
            redFunction();
            await new Promise(r => setTimeout(r, 700));
        }
        if (index[i] == 2) {
            blueFunction();
            await new Promise(r => setTimeout(r, 700));
        }
        if (index[i] == 3) {

            yellowFunction();
            await new Promise(r => setTimeout(r, 700));
        }
        if (index[i] == 4) {
            greenFunction();
            await new Promise(r => setTimeout(r, 700));
        }
    }
}
async function compareFunction(numOfColor) {

    if (numOfColor == 1) {
        redFunction();
        await new Promise(r => setTimeout(r, 500));
    }
    if (numOfColor == 2) {
        blueFunction();
        await new Promise(r => setTimeout(r, 500));
    }
    if (numOfColor == 3) {

        yellowFunction();
        await new Promise(r => setTimeout(r, 500));
    }
    if (numOfColor == 4) {
        greenFunction();
        await new Promise(r => setTimeout(r, 500));
    }
    if (pointer < numLength) {
        if (numOfColor == index[pointer]) {
            pointer++;
        }
        else {
            if (life > 0) {
                life--;
                let audio = new Audio('lost.wav');
                audio.play();
                await new Promise(r => setTimeout(r, 900));
                document.getElementById("life").innerHTML = life + " ";
                pointer = 0;
                console.log("yey")
                loop();
            }
            else {        console.log("hi i'm here");


                let highScoreFromServer = await axios.get('/api/get-high-score', userName);
                if(highScoreFromServer.data < cnt){
                    let obj = {name: userName, highScore: cnt};
                    await axios.post('/api/update-high-score', obj);
                }
                else{
                    cnt = highScoreFromServer.data;
                }
            // var para1 = new URLSearchParams();
            // para1.append("cnt", cnt);
            // var para2 = new URLSearchParams();
          //  let jsarray = [userName , highScore];
          //  sessionStorage.setItem("jsArray", JSON.stringify(jsarray));
          var para = new URLSearchParams();
          para.append("highScore", cnt);
          console.log("bbbbbbbbb"+cnt);
          location.href = "index2.html?" + para.toString();//קישור לדף המשחק  
            }
        }
    }
    else {

        if (numOfColor != index[pointer]) {
                life--;
                flag=false;
                let audio = new Audio('lost.wav');
                audio.play();
                await new Promise(r => setTimeout(r, 900));
                document.getElementById("life").innerHTML = life + " ";
                if (life < 0){
                    let highScoreFromServer = await axios.get('/api/get-high-score', userName);
                    if(highScoreFromServer.data < cnt){
                        let obj = {name: userName, highScore: cnt};
                        await axios.post('/api/update-high-score', obj);
                    }
                    else{
                        cnt = highScoreFromServer.data;
                    }
                // var para1 = new URLSearchParams();
                // para1.append("cnt", cnt);
                // var para2 = new URLSearchParams();
              //  let jsarray = [userName , highScore];
              //  sessionStorage.setItem("jsArray", JSON.stringify(jsarray));
              var para = new URLSearchParams();
              para.append("highScore", cnt);
              console.log("aaaaaaa"+cnt);
              location.href = "index2.html?" + para.toString();//קישור לדף המשחק  
                } 
            }
        else {
            cnt++;
            document.getElementById("points").innerHTML = cnt;  
        }
        pointer = 0;
        if(flag==true){
           numLength++;
           theLoopGameFunction();
        }
        else{
            flag=true;
            loop();
        }
    }
}


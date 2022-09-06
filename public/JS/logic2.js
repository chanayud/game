var para = new URLSearchParams(window.location.search);
var highScore = para.get("highScore");
var canvasColor;
var x, y, radius, color;
var x = 50,
    y = 30
var bubbles = [];
var lastBubble = 0;
var steps = 0,
    burst = 0,
    escaped = 0;
var batonMovement = 200;

//the function of the high-score screen
function startGame() {  
    let audio = new Audio('gameOver.mp3');
    audio.play();
    var r, g, b;
    var canvas, color;
    canvasColor = '#EAEDDC';
    x = 5;
    y = 5;
    radius = 5;
    clearScreen();
  
    counter = 0;
    while (counter < 1000) {
        x = Math.floor(Math.random() * 450)
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        color = 'rgb(' + r + ',' + g + ',' + b + ')';
        bubbles[counter] = new Bubble(x, y, radius, color);
        counter += 1;
    }
    
    setInterval(drawForever, 15);
}
function Bubble(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.active = false;
}
function drawForever() {
    var canvas, pen;
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    steps += 1
    clearScreen();
     var canvas = document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
    ctx.font="30px Comic Sans MS";
    ctx.fillStyle = "aqua";
    ctx.textAlign = "center";
    
    ctx.fillText("השיא שלי :"+ highScore, canvas.width/2, canvas.height/2);
    if (steps % 1 == 0 && lastBubble < 10000) {
        bubbles[lastBubble].active = true;
        lastBubble += 1;
    }
    counter = 0;
    while (counter < 100000) {
        if (bubbles[counter].active == true) {
            pen.fillStyle = bubbles[counter].color;
            pen.beginPath();
            pen.arc(bubbles[counter].x, bubbles[counter].y, bubbles[counter].radius, 0, 2 * Math.PI);
            pen.fill();
            bubbles[counter].y += 2;
        }
        y = bubbles[counter].y;
        x = bubbles[counter].x;
        counter += 1;
    }
   
}
function clearScreen() {
    var canvas, pen;
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    pen.fillStyle = canvasColor;
    pen.fillRect(0, 0, 450, 300);
}







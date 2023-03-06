//DATA FIELDS
var canvas;
var ctx;
var widthCtx;
var heightCtx;
var w;
var mouseX;

//START
window.addEventListener("load", start);
function start()
{
    console.log("Hello World");
    
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    widthCtx = document.getElementById("myCanvas").width;
    heightCtx = document.getElementById("myCanvas").height;
    w = new Witch();
    
    
    canvas.addEventListener("mousemove", mousePosition);
    
    function mousePosition(e) {
        mouseX = e.clientX;
        var coor = "Coordinates: (" + mouseX + ")";
        document.getElementById("demo").innerHTML = coor;
    }

    function clearCoor() {
        document.getElementById("demo").innerHTML = "";
    }
    
    var starsArray = [];
    
    for(var i = 0; i < 10; i++)
    {
        
    }
    
    Animate();
}

//CLASS STAR
function Star() {
    
}

//CLASS WITCH
function Witch() {
    this.posx = mouseX;
    //this.posy = 100;
    //this.width = 100;
    //this.height = 100;
    //var imageWitch = document.getElementById("witch");
    
    this.Draw = function()
    {
        var imageWitch = document.getElementById("witch");
        ctx.beginPath();
        ctx.drawImage(imageWitch, mouseX, 800, 100, 100);
    }
}

//ANIMATE
function Animate() {
    // CLEAR
    ctx.clearRect(0, 0, widthCtx, heightCtx);

    // UPDATE

    //DRAW
    w.Draw();
    setTimeout(Animate, 33);
}
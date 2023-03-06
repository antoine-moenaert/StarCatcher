//DATA FIELDS
var canvas;
var ctx;
var widthCtx;
var heightCtx;
var w;
var mouseX;
var imageWitch;
var starsArray = [];
var totalStars = 5;

//START
window.addEventListener("load", start);
function start()
{
    console.log("Hello World");
    
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    widthCtx = document.getElementById("myCanvas").width;
    heightCtx = document.getElementById("myCanvas").height;
    imageWitch = document.getElementById("witch");
    w = new Witch();
   
    audio = new Audio('insidious.mp3');
    audio.loop = true;
    audio.play();
    
    //MOUSE EVENT
    canvas.addEventListener("mousemove", mousePosition);
    
    function mousePosition(e) {
        mouseX = e.clientX;
        var coor = "Coordinates: (" + mouseX + ")";
        document.getElementById("demo").innerHTML = coor;
    }

    function clearCoor() {
        document.getElementById("demo").innerHTML = "";
    }
    
    //STAR OBJECTS
    for(var i = 0; i < totalStars; i++)
    {
        starsArray.push(new Star());
    }
    
    Animate();
}

//CLASS STAR
function Star(vy) {
    this.posx = (Math.floor(Math.random() * 16) / 15)  * widthCtx;
    this.posy = 0;
    this.vy = Math.floor((Math.random() * 10) + 3) / 6;
    this.width;
    this.height;
    this.isStarted = false;
    var imageStar = document.getElementById("star");
    this.Update = function()
    {
        if(this.isStarted == true)
        {
            //ctx.rotate(this.degrees * Math.PI / 180);
            //this.degrees++;
            this.posy += this.vy;
            if(this.posy > heightCtx)
            {
                this.posy = 0;
                this.posx = (Math.floor(Math.random() * 16) / 15)  * widthCtx;
                this.vy = Math.floor((Math.random() * 10) + 3) / 6;
            }
        }
        else
            this.isStarted = true;
    }
    this.Draw = function()
    {
        ctx.drawImage(imageStar, this.posx, this.posy, 100, 100);
    }
}

//CLASS WITCH
function Witch() {
    this.posx = 1200;
    this.posy = 800;
    this.width = 100;
    this.height = 100;
    //var imageWitch = document.getElementById("witch");
    
    this.Draw = function()
    {
        if(mouseX < this.width / 2)
            this.posx = 0;
        else if(mouseX > widthCtx - this.width / 2)
            this.posx = widthCtx - this.width;
        else if(mouseX != null)
            this.posx = mouseX - this.width / 2;
        ctx.drawImage(imageWitch, this.posx, this.posy, this.width, this.height);
    }
}

//ANIMATE
function Animate() {
    // CLEAR
    ctx.clearRect(0, 0, widthCtx, heightCtx)
    // UPDATE
    for(i = 0; i < totalStars; i++)
    {
        starsArray[i].Update();
    }
    //DRAW
    for(i = 0; i < totalStars; i++)
    {
        starsArray[i].Draw();
    }
    w.Draw();
    setTimeout(Animate, 0);
}
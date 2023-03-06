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
    /*s = new Star();
    s2 = new Star();
    s3 = new Star();
    s4 = new Star();
    s5 = new Star();*/
    
    audio = new Audio('insidious.mp3');
    audio.loop = true;
    audio.play();
    
    
    
    canvas.addEventListener("mousemove", mousePosition);
    
    function mousePosition(e) {
        mouseX = e.clientX;
        var coor = "Coordinates: (" + mouseX + ")";
        document.getElementById("demo").innerHTML = coor;
    }

    function clearCoor() {
        document.getElementById("demo").innerHTML = "";
    }
    
    for(var i = 0; i < totalStars; i++)
    {
        var svy = Math.floor((Math.random() * 10) + 3) / 6;
        starsArray.push(new Star(svy));
    }
    
    Animate();
}

//CLASS STAR
function Star(vy) {
    this.posx = (Math.floor(Math.random() * 16) / 15)  * widthCtx;
    this.posy = 0;
    this.vy = vy;
    this.width;
    this.height;
    this.degrees = 0;
    //this.isDown = false;
    var imageStar = document.getElementById("star");
    this.Draw = function()
    {
        //ctx.rotate(this.degrees * Math.PI / 180);
        ctx.drawImage(imageStar, this.posx, this.posy, 100, 100);
        //this.degrees++;
        this.posy += this.vy;
        if(this.posy > heightCtx)
        {
            this.posy = 0;
            this.posx = (Math.floor(Math.random() * 16) / 15)  * widthCtx;
            //this.isDown = true;
        }
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

    //DRAW
    //var imageStar = document.getElementById("star");
    //ctx.drawImage(imageStar, 300, 300, 100, 100);
    for(i = 0; i < totalStars; i++)
    {
        starsArray[i].Draw();
    }
    w.Draw();
    setTimeout(Animate, 0);
}
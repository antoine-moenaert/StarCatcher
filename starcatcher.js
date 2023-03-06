//DATA FIELDS
var debug = false;
var canvas;
var ctx;
var widthCtx;
var heightCtx;
var witch;
var score = 0;
var maxScore = 30;
var mouseX;
var starsArray = [];
var totalStars = 12;
var onDisplay = totalStars;
var soundEffectStar;
var soundEffectWitch;
var soundWitchPlayed = false;

//START
window.addEventListener("load", start);
function start()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    widthCtx = document.getElementById("myCanvas").width;
    heightCtx = document.getElementById("myCanvas").height;
    witch = new Witch();
   
    soundEffectStar = new Audio('star.wav');
    soundEffectWitch = new Audio('witch.mp3');

    var audio = new Audio('insidious.mp3');
    audio.loop = true;

    canvas.addEventListener("click", mouseClicked, false);
    function mouseClicked() {     
        audio.play();
    }

    //MOUSE EVENT
    canvas.addEventListener("mousemove", mousePosition);
    
    function mousePosition(e) {
        mouseX = e.clientX;
        // var coor = "Coordinates: (" + mouseX + ")";
        // document.getElementById("demo").innerHTML = coor;
    }

    
    //STAR OBJECTS
    for(var i = 0; i < totalStars; i++)
    {
        starsArray.push(new Star());
    }
    
    console.log("Score: " + score);
    Animate();
}

//CLASS STAR
function Star() {
    this.vy = Math.floor((Math.random() * 10) + 6) / 10;
    this.width = 100;
    this.height = 100;
    this.isStarted = false;
    this.isDisplayed = true;
    this.isFinished = false;
    this.offset = Math.PI * Math.random();
    var imageStar = document.getElementById("star");
    this.posx = ((Math.floor(Math.random() * 16) / 15)  * (widthCtx - (2 * 250 + this.width))) + (250 + this.width/2);
    this.posxCenter;
    this.posy = 0;
    
    this.Update = function()
    {
        if(this.isStarted == true)
        {
            this.posy += this.vy;
            if(this.posy > heightCtx)
            {
                this.posy = 0;
                this.isDisplayed = !this.isFinished;
                this.posx = ((Math.floor(Math.random() * 16) / 15)  * (widthCtx - (2 * 250 + this.width))) + (250 + this.width/2);
                this.vy = Math.floor((Math.random() * 10) + 6) / 10;
            }
        }
        else
            this.isStarted = true;
    }
    
    this.Draw = function()
    {
        if(this.isDisplayed && !this.isFinished)
        {
            ctx.save();
            this.posxCenter = this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250;
            ctx.translate(this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250, this.posy);
            ctx.rotate(Math.sin((this.posy / this.vy) / 200 * Math.PI) * Math.PI / 4);
            ctx.drawImage(imageStar, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
            if (debug){
                ctx.beginPath();
                ctx.arc(this.posxCenter, this.posy, 50, 0, Math.PI * 2, false);
                ctx.strokeStyle = "yellow";
                ctx.stroke();
            }
        }
    }
}

//CLASS WITCH
function Witch() {
    this.posx = canvas.width * 0.625;         
    this.posy = canvas.height * 0.85;
    this.width = 100;           
    this.height = 100;
    this.imageWitch = document.getElementById("witch");
    
    this.Draw = function()
    {
        if(mouseX < this.width / 2)
            this.posx = 0;
        else if(mouseX > widthCtx - this.width / 2)
            this.posx = widthCtx - this.width;
        else if(mouseX != null)
            this.posx = mouseX * (canvas.width / window.innerWidth) - this.width / 2;
        ctx.drawImage(this.imageWitch, this.posx, this.posy, this.width, this.height);
        if(debug){
            ctx.beginPath();
            ctx.arc(this.posx + this.width/2, this.posy + this.height/2, 50, 0, Math.PI * 2, false);
            ctx.strokeStyle = "yellow";
            ctx.stroke();
        }
    }
}

//ANIMATE
function Animate() {
    
    // CLEAR
    ctx.clearRect(0, 0, widthCtx, heightCtx)
    
    //END GAME
    Finish();
    
    // UPDATE
    for(i = 0; i < totalStars; i++)
    {
        starsArray[i].Update();
    }
    
    // COLLISION
    for(i = 0; i < totalStars; i++)
    {
        Collision(witch, starsArray[i]);
    }
    
    //DRAW
    for(i = 0; i < totalStars; i++)
    {
        starsArray[i].Draw();
    }
    witch.Draw();
    
    //SCORE
    ctx.font ="30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + this.score,10, 30);
    
    setTimeout(Animate, 0);
}

//COLLISION
function Collision(w, s) {
    if(Math.pow((w.posx + (w.width / 2)) - (s.posxCenter), 2) + Math.pow((w.posy + (w.height / 2)) - (s.posy), 2) <= 10000 && s.isDisplayed && !s.isFinished)
    {
        s.isDisplayed = false;
        s.isFinished = (score >= maxScore - totalStars);
        soundEffectStar.play();
        score++;
        console.log("Score: " + score);
    }
}

//END GAME
function Finish(){
    if(score >= maxScore && soundWitchPlayed == false)
    {
        soundEffectWitch.play();
        soundWitchPlayed = true;
        if(confirm("You catched all the bats! Play again?"))
        {
            window.location.reload(false);
            for (var i; i < totalStars; i++) 
            {
                starsArray[i].isDisplayed = true;
                starsArray[i].isFinished = false;
                starsArray[i].posy = 0;                                                                          
                score = 0;  
            }
        }
    }
}
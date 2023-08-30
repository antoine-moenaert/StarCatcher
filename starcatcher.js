window.onload = start;

function start()
{
    const debug = true;
    const score = { score: 0 };
    const maxScore = 30;
    const starsArray = [];
    const totalStars = 12;
    const mouse = { x: 0 };

    const canvas = document.getElementById("myCanvas");

    canvas.addEventListener("mousemove", e => mouse.x = e.clientX );

    const ctx = canvas.getContext("2d");
    const widthCtx = canvas.width;
    const heightCtx = canvas.height;
    const witch = new Witch(canvas);

    const soundEffectStar = new Audio('./assets/star.wav');
    const soundEffectWitch = new Audio('./assets/witch.mp3');

    const audio = new Audio('./assets/insidious.mp3');
    audio.loop = true;

    canvas.addEventListener("click", () => audio.play(), false);

    // STAR OBJECTS
    for (let i = 0; i < totalStars; i++)
        starsArray.push(new Star(widthCtx));

    const animationContext =
    {
        debug,
        canvas,
        ctx,
        widthCtx,
        heightCtx,
        witch,
        soundEffectStar,
        soundEffectWitch,
        score,
        maxScore,
        starsArray,
        totalStars,
        mouse
    };
    
    Animate(animationContext);
}

function Animate(animationContext) 
{
    // #region constants
    const ctx = animationContext.ctx;
    const widthCtx = animationContext.widthCtx;
    const heightCtx = animationContext.heightCtx;
    const starsArray = animationContext.starsArray;
    const witch = animationContext.witch;
    const mouse = animationContext.mouse;
    const canvas = animationContext.canvas;
    const debug = animationContext.debug;
    const score = animationContext.score;
    const maxScore = animationContext.maxScore;
    const soundEffectWitch = animationContext.soundEffectWitch;
    const totalStars = animationContext.totalStars;
    const soundEffectStar = animationContext.soundEffectStar;
    // #endregion

    // CLEAR
    ctx.clearRect(0, 0, widthCtx, heightCtx)
    
    //END GAME
    Finish(score, maxScore, soundEffectWitch, starsArray);
    
    // UPDATE
    starsArray.forEach(star => star.Update(widthCtx, heightCtx));
    
    // COLLISION
    starsArray.forEach(star => Collision(star, witch, score, maxScore, totalStars, soundEffectStar));
    
    // DRAW
    starsArray.forEach(star => star.Draw(ctx, debug));
    witch.Draw(mouse, widthCtx, canvas, debug, ctx);
    
    // SCORE
    ctx.font ="30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score.score, 10, 30);
    
    setTimeout(() => Animate(animationContext), 0);
}

function Finish(score, maxScore, soundEffectWitch, starsArray)
{
    if (score.score >= maxScore)
    {
        soundEffectWitch.play();
        if (confirm("You catched all the bats! Play again?"))
        {
            window.location.reload(false);
            
            starsArray.forEach(star => 
            {
                star.isDisplayed = true;
                star.isFinished = false;
                star.posy = 0;                                                                          
                score.score = 0;
            });
        }
    }
}

function Collision(star, witch, score, maxScore, totalStars, soundEffectStar) 
{
    const witchCenterX = witch.posx + witch.width / 2;
    const witchCenterY = witch.posy + witch.height / 2;
    const starCenterX = star.posxCenter;
    const starY = star.posy;

    if (Math.pow(witchCenterX - starCenterX, 2) + Math.pow(witchCenterY - starY, 2)
        <= 10000 && star.isDisplayed && !star.isFinished)
    {
        star.isDisplayed = false;
        star.isFinished = (score.score >= maxScore - totalStars);
        soundEffectStar.play();
        score.score++;
    }
}

class Star {
    constructor(widthCtx)
    {
        this.vy = Math.floor((Math.random() * 10) + 6) / 10;
        this.vy = 1;
        this.width = 100;
        this.height = 100;
        this.isStarted = false;
        this.isDisplayed = true;
        this.isFinished = false;
        this.offset = Math.PI * Math.random();
        this.posx = ((Math.floor(Math.random() * 16) / 15)  * (widthCtx - (2 * 250 + this.width))) + (250 + this.width/2);
        this.posxCenter;
        this.posy = 0;
    }
    
    Update(widthCtx, heightCtx) 
    {
        if (!this.isStarted) {
            this.isStarted = true;
            return;
        }
    
        this.posy += this.vy;
    
        if (this.posy > heightCtx) {
            this.posy = 0;
            this.isDisplayed = !this.isFinished;
            this.posx = ((Math.floor(Math.random() * 16) / 15)  * (widthCtx - (2 * 250 + this.width))) + (250 + this.width / 2);
            this.vy = Math.floor((Math.random() * 10) + 6) / 10;
        }
    }

    Draw(ctx, debug)
    {
        if (this.isDisplayed && !this.isFinished)
        {
            ctx.save();

            this.posxCenter = this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250;

            ctx.translate(this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250, this.posy);
            ctx.rotate(Math.sin((this.posy / this.vy) / 200 * Math.PI) * Math.PI / 4);

            const imageStar = document.getElementById("star");
            ctx.drawImage(imageStar, -this.width / 2, -this.height / 2, this.width, this.height);

            ctx.restore();

            if (debug)
            {
                ctx.beginPath();
                ctx.arc(this.posxCenter, this.posy, 50, 0, Math.PI * 2, false);
                ctx.strokeStyle = "yellow";
                ctx.stroke();
            }       
        }
    }
}

class Witch 
{
    constructor(canvas)
    {
        this.posx = canvas.width * 0.625;         
        this.posy = canvas.height * 0.85;
        this.width = 100;           
        this.height = 100;
        this.imageWitch = document.getElementById("witch");
    }
    
    Draw(mouse, widthCtx, canvas, debug, ctx)
    {
        if (mouse.x < this.width / 2)
            this.posx = 0;
        else if (mouse.x > widthCtx - this.width / 2)
            this.posx = widthCtx - this.width;
        else if (mouse.x != null)
            this.posx = mouse.x * (canvas.width / window.innerWidth) - this.width / 2;
        
        ctx.drawImage(this.imageWitch, this.posx, this.posy, this.width, this.height);
        
        
        if (debug)
        {
            const centerX = this.posx + this.width / 2;
            const centerY = this.posy + this.height / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, 50, 0, Math.PI * 2, false);
            ctx.strokeStyle = "yellow";
            ctx.stroke();
        }
    }
}

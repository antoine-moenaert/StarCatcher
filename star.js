class Star {
    constructor(widthCtx) {
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
    
    Update(widthCtx, heightCtx) {
        if(this.isStarted == true)
        {
            this.posy += this.vy;

            // console.log("posy:" + this.posy);

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

Draw(ctx, debug) {
    if(this.isDisplayed && !this.isFinished)
    {
        ctx.save();
        this.posxCenter = this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250;
        ctx.translate(this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250, this.posy);
        ctx.rotate(Math.sin((this.posy / this.vy) / 200 * Math.PI) * Math.PI / 4);
        let imageStar = document.getElementById("star");
        ctx.drawImage(imageStar, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
        if (debug){
            ctx.beginPath();
            ctx.arc(this.posxCenter, this.posy, 50, 0, Math.PI * 2, false);
                ctx.strokeStyle = "yellow";
                ctx.stroke();
            }
        }
        // console.log(this);
    }
}

export { Star };


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//CLASS STAR
// function Star() {
//     this.vy = Math.floor((Math.random() * 10) + 6) / 10;
//     this.width = 100;
//     this.height = 100;
//     this.isStarted = false;
//     this.isDisplayed = true;
//     this.isFinished = false;
//     this.offset = Math.PI * Math.random();
//     var imageStar = document.getElementById("star");
//     this.posx = ((Math.floor(Math.random() * 16) / 15)  * (widthCtx - (2 * 250 + this.width))) + (250 + this.width/2);
//     this.posxCenter;
//     this.posy = 0;
    
//     this.Update = function()
//     {
//         if(this.isStarted == true)
//         {
//             this.posy += this.vy;
//             if(this.posy > heightCtx)
//             {
//                 this.posy = 0;
//                 this.isDisplayed = !this.isFinished;
//                 this.posx = ((Math.floor(Math.random() * 16) / 15)  * (widthCtx - (2 * 250 + this.width))) + (250 + this.width/2);
//                 this.vy = Math.floor((Math.random() * 10) + 6) / 10;
//             }
//         }
//         else
//             this.isStarted = true;
//     }
    
//     this.Draw = function()
//     {
//         if(this.isDisplayed && !this.isFinished)
//         {
//             ctx.save();
//             this.posxCenter = this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250;
//             ctx.translate(this.posx + Math.sin(this.offset + (this.posy / this.vy) / 200 * Math.PI) * -250, this.posy);
//             ctx.rotate(Math.sin((this.posy / this.vy) / 200 * Math.PI) * Math.PI / 4);
//             ctx.drawImage(imageStar, -this.width / 2, -this.height / 2, this.width, this.height);
//             ctx.restore();
//             if (debug){
//                 ctx.beginPath();
//                 ctx.arc(this.posxCenter, this.posy, 50, 0, Math.PI * 2, false);
//                 ctx.strokeStyle = "yellow";
//                 ctx.stroke();
//             }
//         }
//     }
// }
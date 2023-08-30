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
    
    Draw(mouseX, widthCtx, canvas, debug, ctx)
    {
        if(mouseX < this.width / 2)
            this.posx = 0;
        else if(mouseX > widthCtx - this.width / 2)
            this.posx = widthCtx - this.width;
        else if(mouseX != null)
            this.posx = mouseX * (canvas.width / window.innerWidth) - this.width / 2;
        
        ctx.drawImage(this.imageWitch, this.posx, this.posy, this.width, this.height);

        if(debug)
        {
            ctx.beginPath();
            ctx.arc(this.posx + this.width/2, this.posy + this.height/2, 50, 0, Math.PI * 2, false);
            ctx.strokeStyle = "yellow";
            ctx.stroke();
        }
    }
}

export { Witch };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //CLASS WITCH
// function Witch() {
//     this.posx = canvas.width * 0.625;         
//     this.posy = canvas.height * 0.85;
//     this.width = 100;           
//     this.height = 100;
//     this.imageWitch = document.getElementById("witch");
    
//     this.Draw = function()
//     {
//         if(mouseX < this.width / 2)
//             this.posx = 0;
//         else if(mouseX > widthCtx - this.width / 2)
//             this.posx = widthCtx - this.width;
//         else if(mouseX != null)
//             this.posx = mouseX * (canvas.width / window.innerWidth) - this.width / 2;
//         ctx.drawImage(this.imageWitch, this.posx, this.posy, this.width, this.height);
//         if(debug){
//             ctx.beginPath();
//             ctx.arc(this.posx + this.width/2, this.posy + this.height/2, 50, 0, Math.PI * 2, false);
//             ctx.strokeStyle = "yellow";
//             ctx.stroke();
//         }
//     }
// }
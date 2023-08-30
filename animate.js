import Finish from './finish.js';
import Collision from './collision.js';

let mouseX = 0;

//ANIMATE
function Animate(obj) {
    obj.canvas.addEventListener("mousemove", e => mouseX = e.clientX);
    
    // CLEAR
    obj.ctx.clearRect(0, 0, obj.widthCtx, obj.heightCtx)
    
    //END GAME
    Finish(obj.score, obj.maxScore, obj.soundEffectWitch, obj.soundWitchPlayed, obj.starsArray);
    
    // UPDATE
    for(let i = 0; i < obj.totalStars; i++)
    {
        obj.starsArray[i].Update(obj.widthCtx, obj.heightCtx);
    }
    
    // COLLISION
    for(let i = 0; i < obj.totalStars; i++)
    {
        Collision(obj.witch, obj.starsArray[i], obj.score, obj.maxScore, obj.totalStars, obj.soundEffectStar);
    }
    
    //DRAW
    for(let i = 0; i < obj.totalStars; i++)
    {
        obj.starsArray[i].Draw(obj.ctx, obj.debug);
    }

    obj.witch.Draw(mouseX, obj.widthCtx, obj.canvas, obj.debug, obj.ctx);
    
    //SCORE
    obj.ctx.font ="30px Arial";
    obj.ctx.fillStyle = "white";
    obj.ctx.fillText("Score: " + obj.score.score, 10, 30);
    
    setTimeout(() => Animate(obj), 0);
}

export { Animate };
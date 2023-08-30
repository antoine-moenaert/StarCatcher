//COLLISION
function Collision(w, s, score, maxScore, totalStars, soundEffectStar) {
    if(Math.pow((w.posx + (w.width / 2)) - (s.posxCenter), 2) + Math.pow((w.posy + (w.height / 2)) - (s.posy), 2) <= 10000 && s.isDisplayed && !s.isFinished)
    {
        s.isDisplayed = false;
        s.isFinished = (score.score >= maxScore - totalStars);
        soundEffectStar.play();
        score.score++;
        console.log("Score: " + score.score);
    }
}

export default Collision;
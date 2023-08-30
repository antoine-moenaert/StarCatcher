//END GAME
function Finish(score, maxScore, soundEffectWitch, soundWitchPlayed, starsArray){
    if(score.score >= maxScore && soundWitchPlayed == false)
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
                score.score = 0;  
            }
        }
    }
}

export default Finish;
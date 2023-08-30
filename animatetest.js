function start()
{
    canvas = document.getElementById("myCanvas");
    let mouse = { x: 0 };

    canvas.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
    });

    // Other setup logic...

    let obj =
    {
        ctx,
        // Other properties...
        mouse,
        canvas
    };

    Animate(obj);
}

//ANIMATE
function Animate(obj) {
    
     

    
    // CLEAR
    
    // END GAME
    
    // UPDATE
    
    // DRAW
    
    setTimeout(() => Animate(obj), 0);
}

function modifySound(sound) {
    let sound2 = sound;
    sound2 = !sound;
}
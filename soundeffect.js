var x = new Audio("soundeffect/heartbeat.mp3"); 

function play() 
{ 
    x.play();
    x.loop(true); 
}

function stop() 
{ 
    x.stop(); 
}

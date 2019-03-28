function start(){

  var stage = document.getElementById('stage');
  var context = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

  var interval = window.setInterval(game, 100);
  setInterval(color, 1000);

  const velocity = 1;

  var velX = 0; //vel == velocity
  var velY = 0;
  var pointX = 10;
  var pointY = 15;
  var pisize = 20; //pi == pieces
  var pieces = 20;
  var appleX = 15;
  var appleY = 15;
  var color1 = "red";
  var color2 = "yellow";
  var color3 = "blue"; // Apple color

  var trail = [];
  tail = 5;

  function color(){
    if (Math.floor(Math.random()*3) == 0){ // Blue
      r = 44;
      g = 44;
      b = 220;
      color1 = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    if (Math.floor(Math.random()*3) == 1){ // Red
      r = 197;
      g = 20;
      b = 22;
      color1 = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    if (Math.floor(Math.random()*3) == 2){ // Yellow
      r = 229;
      g = 232;
      b = 106;
      color1 = 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    if (Math.floor(Math.random()*6 + 3) == 3){ // Purple
      r2 = 101;
      g2 = 34;
      b2 = 171;
      color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
    }
    if (Math.floor(Math.random()*6 + 3) == 4){ // Green
      r2 = 90;
      g2 = 230;
      b2 = 85;
      color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
    }
    if (Math.floor(Math.random()*6 + 3) == 5){ // Orange
      r2 = 235;
      g2 = 168;
      b2 = 51;
      color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
    }
  }

  function game(){

    pointX += velX;
    pointY += velY;

    if (pointX < 0){
      pointX = pieces - 1;
    }
    if (pointX > pieces - 1){
      pointX = 0;
    }
    if (pointY < 0){
      pointY = pieces - 1;
    }
    if (pointY > pieces - 1){
      pointY = 0;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, stage.width, stage.height);

    context.fillStyle = color3;
    context.fillRect(appleX * pisize, appleY * pisize, pisize, pisize);

    for (var j = 0; j < trail.length; j++){
      var gradient = context.createLinearGradient(0, 370, 0, 0);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      context.fillStyle = gradient;
    };

    for (var i = 0; i < trail.length; i++){
      context.fillRect(trail[i].x * pisize,
      trail[i].y * pisize,
      pisize - 1, pisize - 1);
      if (trail[i].x == pointX && trail[i].y == pointY){
        pointX = 10;
        pointY = 15;
        velX = 0;
        velY = 0;
        tail = 5;
      }
    }

    trail.push({ x: pointX, y: pointY })
    while (trail.length > tail){
      trail.shift();
    }

    if (appleX == pointX && appleY == pointY){
      tail++;
      appleX = Math.floor(Math.random() * pieces);
      appleY = Math.floor(Math.random() * pieces);
      if (Math.floor(Math.random()*9) == 0){
        color3 = "blue";
      }
      if (Math.floor(Math.random()*9) == 1){
        color3 = "red";
      }
      if (Math.floor(Math.random()*9) == 2){
        color3 = "yellow";
      }
      if (Math.floor(Math.random()*9) == 3){
        color3 = "green";
      }
      if (Math.floor(Math.random()*9) == 4){
        color3 = "purple";
      }
      if (Math.floor(Math.random()*9) == 5){
        color3 = "cyan";
      }
      if (Math.floor(Math.random()*9) == 6){
        color3 = "aquamarine";
      }
      if (Math.floor(Math.random()*9) == 7){
        color3 = "ghostwhite";
      }
      if (Math.floor(Math.random()*9) == 8){
        color3 = "gray";
      }
    }
  }

  function keyPush(event){

    switch (event.keyCode) {
      case 37: // Left key
        velX = - velocity;
        velY = 0;
        break;
      case 38: // Up key
        velX = 0;
        velY = - velocity;
        break;
      case 39: // Right key
        velX = velocity;
        velY = 0;
        break;
      case 40: // Down key
        velX = 0;
        velY = velocity;
        break;
      case 80: // Pause
        clearInterval(interval);
        break;
      case 13: // Disrupt
         interval = window.setInterval(game, 100);
        break;
    }
  }
}

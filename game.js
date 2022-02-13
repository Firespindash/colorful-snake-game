const start = () => {

  const message = document.getElementById('message');
  const extra = document.getElementById('extra');
  const stage = document.getElementById('stage');
  const context = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

  var interval = window.setInterval(() => { game(); }, 100);
  setInterval(() => { color(); }, 1000);

  const velocity = 1;

  var velX = 0; //vel == velocity
  var velY = 0;
  var pointX = 10;
  var pointY = 15;
  const pisize = 20; //pi == pieces
  const pieces = 20;
  var appleX = 15;
  var appleY = 15;
  var color1 = "red";
  var color2 = "yellow";
  var color3 = "blue"; // Apple color
  var disrupt = 1;

  const trail = [];
  tail = 5;

  const pause = () => {
    disrupt = 0;
    clearInterval(interval);
  }

  const color = () => {
    if (Math.floor(Math.random()*3) == 0) color1 = 'rgb(44, 44, 220)'; // Blue
    else if (Math.floor(Math.random()*3) == 1) color1 = 'rgb(197, 20, 22)'; // Red
    else if (Math.floor(Math.random()*3) == 2) color1 = 'rgb(229, 232, 106)'; // Yellow

    if (Math.floor(Math.random()*6 + 3) == 3) color2 = 'rgb(101, 34, 171)'; // Purple
    else if (Math.floor(Math.random()*6 + 3) == 4) color2 = 'rgb(90, 230, 85)'; // Green
    else if (Math.floor(Math.random()*6 + 3) == 5) color2 = 'rgb(235, 168, 51)'; // Orange
  }

  const game = () => {

    pointX += velX;
    pointY += velY;

    if (pointX < 0) pointX = pieces - 1;
    else if (pointX > pieces - 1) pointX = 0;

    if (pointY < 0) pointY = pieces - 1;
    else if (pointY > pieces - 1) pointY = 0;

    context.fillStyle = "black";
    context.fillRect(0, 0, stage.width, stage.height);

    context.fillStyle = color3;
    context.fillRect(appleX * pisize, appleY * pisize, pisize, pisize);

    trail.forEach(item => {
      const gradient = context.createLinearGradient(0, 370, 0, 0);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      context.fillStyle = gradient;
    });

    trail.forEach(item => {
      context.fillRect(item.x * pisize, item.y * pisize, pisize - 1, pisize - 1);
      if (item.x == pointX && item.y == pointY) {
        if (trail.length >= 399) {
          pause();
          message.innerHTML = "You win!";
          extra.innerHTML = "Now you can see the complete gradient!";
        }
        else {
          pointX = 10;
          pointY = 15;
          velX = 0;
          velY = 0;
          tail = 5;
        }
      }
      // And below here comes a new fix to the problem of
      // an apple appearing inside the tail
      if (item.x == appleX && item.y == appleY) eat();
    });

    trail.push({ x: pointX, y: pointY })
    while (trail.length > tail) {
      trail.shift();
    }

    eat = () => {
      tail++;
      appleX = Math.floor(Math.random() * pieces);
      appleY = Math.floor(Math.random() * pieces);
      if (Math.floor(Math.random()*9) == 0) color3 = "blue";
      else if (Math.floor(Math.random()*9) == 1) color3 = "red";
      else if (Math.floor(Math.random()*9) == 2) color3 = "yellow";
      else if (Math.floor(Math.random()*9) == 3) color3 = "green";
      else if (Math.floor(Math.random()*9) == 4) color3 = "purple";
      else if (Math.floor(Math.random()*9) == 5) color3 = "cyan";
      else if (Math.floor(Math.random()*9) == 6) color3 = "aquamarine";
      else if (Math.floor(Math.random()*9) == 7) color3 = "ghostwhite";
      else if (Math.floor(Math.random()*9) == 8) color3 = "gray";
    }

    if (appleX == pointX && appleY == pointY) eat();
  }

  function keyPush(event) {

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
        pause();
        message.innerHTML = "Paused";
        break;
      case 13: // Disrupt
        if (disrupt == 0) {
          interval = window.setInterval(game, 100);
          disrupt = 1;
          message.innerHTML = "";
        }
        break;
      case 82: // Reset
        message.innerHTML = "Reload"
        pause();
        setTimeout(() => { window.location.reload(true); }, 1000);
        break;
    }
  }
}

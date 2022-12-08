const menu = document.getElementById('menu');
var startKey = 0;

const remove = () => {
  document.body.removeChild(menu);
}

const createMenu = () => {
  let p = document.createElement('p');
  p.innerHTML = "Start the Game";
  p.setAttribute('id', 'snake-game-start');
  menu.appendChild(p);
  let small = document.createElement('small');
  small.innerHTML = "Click to play";
  menu.appendChild(small);

  menu.addEventListener('click', () => {
    start();
    remove();
  });
}

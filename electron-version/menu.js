var menu = document.getElementById('menu');

function menus(){
  var p = document.createElement('p');
  p.innerHTML = "Start the Game";
  menu.appendChild(p);
  var small = document.createElement('small');
  small.innerHTML = "Click to play";
  menu.appendChild(small);

  menu.addEventListener('click', function(){
    start();
    menu.removeChild(p);
    menu.removeChild(small);
  })
}

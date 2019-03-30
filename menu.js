var menu = document.getElementById('menu');
var startKey = 1;

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

  document.addEventListener("keypress", function(event){
    if (event.keyCode === 32 && startKey == 0){ // Start Key
      start();
      menu.removeChild(p);
      menu.removeChild(small);
      startKey = 1;
    }
  })
}

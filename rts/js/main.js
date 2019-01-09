var canvas;
var canvasContext;
var fps = 1000/30;
var testUnit = new unit();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  start();
}

function initInput() {
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calcMousePos(evt);
    document.getElementById("debugText").innerHTML = "("+mousePos.x+","+mousePos.y+")";
  } );

  canvas.addEventListener('click', function(evt) {
    var mousePos = calcMousePos(evt);
    testUnit.gotoX = mousePos.x;
    testUnit.gotoY = mousePos.y;
  } );
}

function start() {
  testUnit.reset();

  initInput();

  setInterval(function() {
    moveEverything();
    drawEverything();
  }, fps);
}

function calcMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}

function moveEverything() {
  testUnit.move();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  testUnit.draw();
}

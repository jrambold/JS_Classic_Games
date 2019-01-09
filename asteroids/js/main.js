var canvas;
var canvasContext;
var fps = 1000/30;
var p1 = new player();
var enemy = new ufo();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();
}

function start() {
  p1.init(playerPic);
  enemy.init(ufoPic);

  initInput();

  setInterval(function() {
    moveEverything();
    drawEverything();
  }, fps);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function moveEverything() {
  p1.move();
  enemy.move();

  p1.checkMyShipAndShotCollisionAgainst(enemy);
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  p1.draw();
  enemy.draw();
}

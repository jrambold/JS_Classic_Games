var canvas;
var canvasContext;
var fps = 1000/30;
var p1 = new player();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();
}

function start() {
  loadRoom();
  p1.init(playerPic, "Player");

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
}

function drawEverything() {
  drawRoom();

  p1.draw();
}

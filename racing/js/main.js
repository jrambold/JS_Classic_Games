var canvas;
var canvasContext;
var fps = 1000/30;
var p1 = new car();
var p2 = new car();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();
}

function start() {
  loadTrack();
  p2.carInit(carPic2, "Green");
  p1.carInit(carPic, "Blue");

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
  p1.carMove();
  p2.carMove();
}

function drawEverything() {
  drawTracks();

  p1.carDraw();
  p2.carDraw();
}

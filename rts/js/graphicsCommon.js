function colorRect(cornerX, cornerY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(cornerX, cornerY, width, height);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawRotatedBitmap(graphic, x, y, angle) {
  canvasContext.save();
  canvasContext.translate(x, y);
  canvasContext.rotate(angle);
  canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2);
  canvasContext.restore();
}

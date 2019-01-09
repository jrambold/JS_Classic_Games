const TILE_W = 50;
const TILE_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;

var roomGrid = new Array(ROOM_COLS * ROOM_ROWS);

function loadRoom() {
  roomGrid =
         [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
           1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
           1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
           1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
           1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
           1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
           1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
           1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL ||
          checkTileType == TILE_KEY ||
          checkTileType == TILE_DOOR);
}

function getTileIndex(col, row) {
  return (col + ROOM_COLS*row);
}

function getTileVal(index) {
  return (roomGrid[index]);
}

function checkTile(x, y) {
  var col = Math.floor(x/TILE_W);
  var row = Math.floor(y/TILE_H);
  if (row >= 0 && row < ROOM_ROWS && col >=0 && col < ROOM_COLS) {
    return (getTileIndex(col, row));
  }
  return -1;
}

function removeItemFromTile(index) {
  roomGrid[index] = TILE_GROUND;
  return roomGrid[index];
}

function drawRoom() {
  var index = 0;
  var left = 0;
  var top = 0;

  for(row=0;row<ROOM_ROWS;row++) {
    left = 0;
    for(col=0; col<ROOM_COLS;col++) {
      if (tileTypeHasTransparency(getTileVal(getTileIndex(col, row)))) {
        canvasContext.drawImage(tilePics[TILE_GROUND], left, top);
      }
      canvasContext.drawImage(tilePics[roomGrid[index]], left, top);
      index++;
      left += TILE_W;
    }
    top += TILE_H;
  }
}

const PLAYER_MOVE_SPEED = 3.0;

function player() {

  this.x = 100;
  this.y = 100;

  this.keyHeld_North = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;
  this.keyHeld_East = false;

  this.setupControls = function(northKey,eastKey,southKey,westKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
  }

  this.init = function(graphic, name) {
    this.myBitmap = graphic;
    this.myName = name;
    this.reset();
  }

  this.reset = function() {
    this.keysHeld = 0;
    var start = false;
    var index = 0;
    if (this.homeX == undefined) {
      while (!start && index < roomGrid.length) {
        if (roomGrid[index] == TILE_PLAYER) {
          start = true;
        } else {
          index++;
        }
      }
      this.homeY = Math.floor(index/ROOM_COLS) * TILE_W + TILE_W * 0.5
      this.homeX = index%ROOM_COLS * TILE_H + TILE_H * 0.5;
      this.homeIndex = index;
    }
    roomGrid[this.homeIndex] = 0;
    this.x = this.homeX;
    this.y = this.homeY;
  }

  this.draw = function() {
    drawRotatedBitmap(this.myBitmap, this.x, this.y, 0.0)
  }

  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;

    if (this.keyHeld_North) {
      nextY -= PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_East) {
      nextX += PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_South) {
      nextY += PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_West) {
      nextX -= PLAYER_MOVE_SPEED;
    }

    var tileIndex = checkTile(nextX, nextY);
    if (tileIndex != -1) {
      var tile = getTileVal(tileIndex);
      if (tile == TILE_KEY) {
        this.keysHeld++;
        tile = removeItemFromTile(tileIndex);
      }
      if (tile == TILE_DOOR) {
        if (this.keysHeld > 0) {
          this.keysHeld--;
          tile = removeItemFromTile(tileIndex);
        }
      }
      if (tile == TILE_GROUND) {
        this.x = nextX;
        this.y = nextY;
      } else if (tile == TILE_GOAL) {
        document.getElementById("debugText").innerHTML = this.myName + " wins!";
        loadRoom();
        p1.reset();
      }
    } else {
    }
  }

}

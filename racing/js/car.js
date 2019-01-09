const FRICTION_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function car() {

  this.carX = 100;
  this.carY = 100;

  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.setupControls = function(forwardKey,backKey,leftKey,rightKey) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
  }

  this.carInit = function(graphic, name) {
    this.myBitmap = graphic;
    this.myName = name;
    this.carReset();
  }

  this.carReset = function() {
    var start = false;
    var index = 0;
    if (this.homeX == undefined) {
      while (!start && index < trackGrid.length) {
        if (trackGrid[index] == TRACK_PLAYER) {
          start = true;
        } else {
          index++;
        }
      }
      this.homeY = Math.floor(index/TRACK_COLS) * TRACK_W + TRACK_W * 0.5
      this.homeX = index%TRACK_COLS * TRACK_H + TRACK_H * 0.5;
      trackGrid[index] = 0;
    }
    this.carX = this.homeX;
    this.carY = this.homeY;
    this.carSpeed = 0;
    this.carAng = 1.5*Math.PI;
  }

  this.carDraw = function() {
    drawRotatedBitmap(this.myBitmap, this.carX, this.carY, this.carAng)
  }

  this.carMove = function() {
    if (this.keyHeld_Gas) {
      this.carSpeed += DRIVE_POWER;
    }
    if (this.keyHeld_Reverse) {
      this.carSpeed -= REVERSE_POWER;
    }
    if (Math.abs(this.carSpeed) >= MIN_TURN_SPEED) {
      if (this.keyHeld_TurnLeft) {
        this.carAng -= TURN_RATE*Math.PI;
      }
      if (this.keyHeld_TurnRight) {
        this.carAng += TURN_RATE*Math.PI;
      }
    }

    var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
    var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;

    var tile = checkTrack(nextX, nextY);

    if (tile == TRACK_ROAD) {
      this.carX = nextX;
      this.carY = nextY;
    } else if (tile == TRACK_GOAL) {
      document.getElementById("debugText").innerHTML = this.myName + " wins!";
      p1.carReset();
      p2.carReset();
    } else {
      this.carSpeed *= -0.5;
    }
    this.carSpeed *= FRICTION_MULT;
  }

}

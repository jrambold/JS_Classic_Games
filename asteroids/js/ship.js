const FRICTION_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

player.prototype = new movingWrapPosition();
function player() {
  this.keyHeld_Gas = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.setupControls = function(forwardKey,leftKey,rightKey, shotKey) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
    this.controlKeyForFireShot = shotKey;
  }

  this.init = function(graphic) {
    this.myShot = new shot();
    this.myBitmap = graphic;
    this.reset();
  }

  this.superclassReset = this.reset;
  this.reset = function() {
    this.superclassReset();
    this.ang = 1.5*Math.PI;
    this.myShot.reset();
  }

  this.draw = function() {
    this.myShot.draw();
    drawRotatedBitmap(this.myBitmap, this.x, this.y, this.ang)
  }

  this.superclassMove = this.move;
  this.move = function() {
    if (this.keyHeld_Gas) {
      this.xv += Math.cos(this.ang) * THRUST_POWER;
      this.yv += Math.sin(this.ang) * THRUST_POWER;
    }
    if (this.keyHeld_TurnLeft) {
      this.ang -= TURN_RATE*Math.PI;
    }
    if (this.keyHeld_TurnRight) {
      this.ang += TURN_RATE*Math.PI;
    }

    this.superclassMove();

    this.xv *= FRICTION_MULT;
    this.yv *= FRICTION_MULT;

    this.myShot.move();
  }

  this.cannonFire = function() {
    if (this.myShot.isShotReadyToFire()) {
      this.myShot.shootFrom(this);
    }
  }

  this.checkMyShipAndShotCollisionAgainst = function(thisEnemy) {
    if (thisEnemy.isOverlappingPoint(this.x,this.y)) {
      this.reset();
      document.getElementById("debugText").innerHTML = "Player Crashed!";
    }
    if (this.myShot.hitTest(thisEnemy)) {
      thisEnemy.reset();
      this.myShot.reset();
      document.getElementById("debugText").innerHTML = "Enemy Blasted!";
    }
  }

}

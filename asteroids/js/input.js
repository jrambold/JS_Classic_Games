const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_SPACEBAR = 32;


function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  p1.setupControls(KEY_UP_ARROW,KEY_LEFT_ARROW,KEY_RIGHT_ARROW,KEY_SPACEBAR);
}

function keyPressed(evt) {
  // document.getElementById("debugText").innerHTML = "KeyCode Pushed: " + evt.keyCode;
  setKeyHoldState(evt.keyCode, p1, true);
  if(evt.keyCode == p1.controlKeyForFireShot) {
    p1.cannonFire();
  }
  evt.preventDefault();
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if (thisKey == thisPlayer.controlKeyForGas) {
    thisPlayer.keyHeld_Gas = setTo;
  }
  if (thisKey == thisPlayer.controlKeyForTurnLeft) {
    thisPlayer.keyHeld_TurnLeft = setTo;
  }
  if (thisKey == thisPlayer.controlKeyForTurnRight) {
    thisPlayer.keyHeld_TurnRight = setTo;
  }
}

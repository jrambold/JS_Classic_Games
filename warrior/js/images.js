var playerPic = document.createElement("img");
var tilePics = [];
var picsToLoad = 0;

function loadImageForTrackCode(trackCode, fileName) {
  tilePics[trackCode] = document.createElement("img");
  beginLoadingImage(tilePics[trackCode],fileName);
}

function loadImages() {
  var imageList = [
    {varName:playerPic, theFile:"warrior.png"},

    {tileType:TILE_GROUND, theFile:"world_ground.png"},
    {tileType:TILE_WALL, theFile:"world_wall.png"},
    {tileType:TILE_GOAL, theFile:"world_goal.png"},
    {tileType:TILE_KEY, theFile:"world_key.png"},
    {tileType:TILE_DOOR, theFile:"world_door.png"},
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTrackCode(imageList[i].tileType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
  }
}

function beginLoadingImage(imgVar, filename) {
  imgVar.onload = countLoadedImagesAndLaunch;
  imgVar.src = "images/"+filename;
}

function countLoadedImagesAndLaunch() {
  picsToLoad--;
  if(picsToLoad == 0) {
    start();
  }
}

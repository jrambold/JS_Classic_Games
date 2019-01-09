var playerPic = document.createElement("img");
var ufoPic = document.createElement("img");
var tilePics = [];
var picsToLoad = 0;

function loadImageForTrackCode(trackCode, fileName) {
  tilePics[trackCode] = document.createElement("img");
  beginLoadingImage(tilePics[trackCode],fileName);
}

function loadImages() {
  var imageList = [
    {varName:playerPic, theFile:"player1.png"},
    {varName:ufoPic, theFile:"ufo.png"},
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

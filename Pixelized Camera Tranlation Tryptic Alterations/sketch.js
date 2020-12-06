let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyelX2 = 0;
let eyelY2 = 0;
// let choose = colorized();

let vScale = 9;

let on = 0;


function preload(){
  // scale(-1, 1);
  video = createCapture(VIDEO);
}

function setup() {
  createCanvas(1920, 1440);
  pixelDensity(1);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  // video.hide();  <---this thing is not working with me at all. 
  noStroke();
  fill(0);
  //scaling the actual video down
  video.size(width / vScale, height / vScale);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    let eX2 = poses[0].pose.keypoints[2].position.x;
    let eY2 = poses[0].pose.keypoints[2].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
    eyelX2 = lerp(eyelX2, eX2, 0.5);
    eyelY2 = lerp(eyelY2, eY2, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}
function draw() {
  clear();
  background('black');
  video.loadPixels();
  if (on == 0){
    push();

    fill(255);
    textSize(55);
    textAlign(CENTER)
    text('Move eyes into different', width/2, height/5);
    text('color, pause head', width/2, height/5+60)
    text('to chage color', width/2, height/5+120)
    text('If wearing glasses', width/2, height/5+180)
    text('please remove', width/2, height/5+240)
    text('click on screen and', width/2, height/5+300)
    text('press enter to begin', width/2, height/5+360)
    pop();
    push();
    noFill();
    strokeWeight(15)
    stroke(255);
    line(width/3,0,width/3,width)
    line(5,0,5,width)
    line((2/3)*width,0,(2/3)*width,width)
    line(0,6,width,6)
    pop();
  }
  if (on == 1){

    push();
    locationUno();
    pop();

    push();
    locationDos();
    pop();

    push();
    locationTres();
    pop();

    push();
    noFill();
    strokeWeight(15)
    stroke(255);
    line(width/3,0,width/3,width)
    line(5,0,5,width)
    line((2/3)*width,0,(2/3)*width,width)
    line(0,6,width,6)
    pop();
  }
}

function keyPressed(){
  if (keyCode === ENTER){
    on = 1;
  }
}


function locationUno(){

  let d = dist(noseX, noseY, eyelX, eyelY);
  let d2 = dist(noseX, noseY, eyelX2, eyelY2);
  let length = int(dist(eyelX, eyelY, eyelX2, eyelY2));
  let latLength = int(dist(eyelX, eyelY, video.width, eyelY));
  // line(eyelX, eyelY, video.width, eyelY)
  // fill(255, 0, 0);
  // ellipse(eyelX, eyelY, d/2);
  // ellipse(eyelX2, eyelY2, d2/2);
  // console.log(length);
  // console.log(latLength);
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < 70; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      //finding the brightness of the pixels from the video
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      rectMode(CENTER);

      //determining the color
      if (latLength < 50) {
        fill('green')
        // ellipse(135,200,50)
      } else if (latLength > 50) {
        fill(204,255,204)
      }
      //scaling the rectangle to the canvas size
      rect(((x * vScale)+10), ((y * vScale)+10), w, w);
    }
  }
}
function locationDos(){

  let d = dist(noseX, noseY, eyelX, eyelY);
  let d2 = dist(noseX, noseY, eyelX2, eyelY2);
  let length = int(dist(eyelX, eyelY, eyelX2, eyelY2));
  let latLength = int(dist(eyelX, eyelY, video.width, eyelY));
  // line(eyelX, eyelY, video.width, eyelY)
  // fill(255, 0, 0);
  // ellipse(eyelX, eyelY, d/2);
  // ellipse(eyelX2, eyelY2, d2/2);
  for (var y = 0; y < video.height; y++) {
    for (var x = 71 ; x < 141; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      //finding the brightness of the pixels from the video
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      rectMode(CENTER);

      //determining the color
      if (latLength > 60 && latLength < 115) {
        fill('red')

      } else if (latLength < 60 || latLength > 115) {
        fill(255,192,203)
      }
      //scaling the rectangle to the canvas size
      rect(((x * vScale)+10), ((y * vScale)+10), w, w);
    }
  }
}

function locationTres(){

  let d = dist(noseX, noseY, eyelX, eyelY);
  let d2 = dist(noseX, noseY, eyelX2, eyelY2);
  let length = int(dist(eyelX, eyelY, eyelX2, eyelY2));
  let latLength = int(dist(eyelX, eyelY, video.width, eyelY));
  // line(eyelX, eyelY, video.width, eyelY)
  // fill(255, 0, 0);
  // ellipse(eyelX, eyelY, d/2);
  // ellipse(eyelX2, eyelY2, d2/2);
  // console.log(length);
  // console.log(latLength);
  for (var y = 0; y < video.height; y++) {
    for (var x = 142; x < 250; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      //finding the brightness of the pixels from the video
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      rectMode(CENTER);

      //determining the color
      if (latLength > 115) {
        fill('blue')
      } else if (latLength < 115) {
        fill(151,203,255)
      }
      //scaling the rectangle to the canvas size
      rect(((x * vScale)+10), ((y * vScale)+10), w, w);
    }
  }
}

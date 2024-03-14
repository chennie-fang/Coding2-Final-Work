let handpose;
let video;
let predictions = [];
let circle1X, circle1Y;
let circle2X, circle2Y;
let circle3X, circle3Y;
let isCircle1Dragging = false;
let isCircle2Dragging = false;
let isCircle3Dragging = false;
let kuang1X, kuang1Y;
let kuang2X, kuang2Y;
let kuang3X, kuang3Y;
let circleSize = 140;
let kuangSize = 130;
let bg;
let bear;
let panzi;
let photo;
let cloud;
let house;
let start;
let gameState="start";
let title;
let end;

function preload() {
  bg = loadImage("image/bg.jpg");
  bear = loadImage("image/bear.png");
  panzi = loadImage("image/panzi.png");
  photo = loadImage("image/photo.png");
  cloud = loadImage("image/cloud.png");
  house = loadImage("image/house.png");
  start = loadImage("image/start.jpg");
  title = loadImage("image/title.png");
  end = loadImage("image/end.png");
  
  
}



function setup() {
  createCanvas(840, 480);
  background(0);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  handpose.on("predict", results => {
    predictions = results;
  });
  

  circle1X = 90;
  circle1Y = height / 5.1;
  circle2X = 90;
  circle2Y = height / 2;
  circle3X = 90;
  circle3Y = height/1.25;
  kuang1X = 510;
  kuang1Y = 150;
  kuang2X = 690;
  kuang2Y = 220;
  kuang3X = 390;
  kuang3Y = 330;

  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}


function draw() {
  background(0);
   if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    drawGame();
  }

  
}

function drawStartScreen() {
 image(start,0,0,width,height);
  const prediction = predictions[0]; 
  fill(255,0,0);
  //rect(320,360,200,60);
  drawKeypoints();
  
  if (prediction) {
    const pointFour = prediction.landmarks[4];
    const pointEight = prediction.landmarks[8];
      const distance = dist(pointFour[0], pointFour[1], pointEight[0], pointEight[1]);
const mapA=map(pointFour[0],0,width,-50,50) ; 
const mapB=map(distance,0,200,70,200) ;    
 image(cloud,mapA,0,width,height);
 image(house,600,210, mapB, mapB);
 image(title,270,70,300,120);
  

    // 检查点四是否在按3钮范围内，如果是，则开始游戏
   if (distance < 40 && pointFour[0] > 320 && pointFour[0] < 520 && pointFour[1] > 360 && pointFour[1] < 420) {
      gameState = "playing";
    }
  }  
}

function drawGame(){
  imageMode(CENTER);
  image(bg,width/2,height/2,width,height);
  drawKeypoints();
  const prediction = predictions[0];
  if (prediction) {
    const pointFour = prediction.landmarks[4];
    const pointEight = prediction.landmarks[8];

      const distance = dist(pointFour[0], pointFour[1], pointEight[0], pointEight[1]);
 
    if (distance < 40) {
      isCircle1Dragging = true;
      isCircle2Dragging = true;
      isCircle3Dragging = true;
    } else {
      isCircle1Dragging= false;
      isCircle2Dragging= false;
      isCircle3Dragging= false;
    }
    
    //1
    const distanceCircle1 = dist(pointFour[0], pointFour[1], circle1X, circle1Y);
    if (isCircle1Dragging && distanceCircle1 < 30) {
      circle1X = pointFour[0];
      circle1Y = pointFour[1];
    }

    image(photo,circle1X, circle1Y, circleSize, circleSize);

    //2
    const  distanceCircle2 = dist(pointFour[0], pointFour[1], circle2X, circle2Y);
    if (isCircle2Dragging && distanceCircle2 < 30) {
      circle2X = pointFour[0];
      circle2Y = pointFour[1];
    }
    
    image(bear,circle2X, circle2Y, circleSize, circleSize);
    
    //3
    const  distanceCircle3 = dist(pointFour[0], pointFour[1], circle3X, circle3Y);
    if (isCircle3Dragging && distanceCircle3 < 30) {
      circle3X = pointFour[0];
      circle3Y = pointFour[1];
    }

    image(panzi,circle3X, circle3Y, circleSize, circleSize);

    //kuang
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();
    //kuang1
    rect(kuang1X - kuangSize / 2, kuang1Y - kuangSize / 2, kuangSize, kuangSize);
    //kuang2
    rect(kuang2X - kuangSize / 2, kuang2Y - kuangSize / 2, kuangSize, kuangSize);
    //kuang3
   rect(kuang3X - kuangSize / 2, kuang3Y - kuangSize / 2, kuangSize, kuangSize);

    }
  
    if (isCircle1InsideKuang1(circle1X, circle1Y, kuang1X, kuang1Y, kuangSize)&& isCircle2InsideKuang2(circle2X, circle2Y, kuang2X, kuang2Y, kuangSize) && isCircle3InsideKuang3(circle3X, circle3Y, kuang3X, kuang3Y, kuangSize) ) {
      background(255, 193, 253);
      console.log("Circle and square inside kuang! Redirecting...");
    image(end,width/2,height/2,500,140);
  }
}



function isCircle1InsideKuang1(circle1X, circle1Y, kuang1X, kuang1Y, kuangSize) {
  return circle1X >= kuang1X - kuangSize / 2 && circle1X <= kuang1X + kuangSize / 2 &&
    circle1Y >= kuang1Y - kuangSize / 2 && circle1Y <= kuang1Y + kuangSize / 2;
}

function isCircle2InsideKuang2(circle2X, circle2Y, kuang2X, kuang2Y, kuangSize) {
  return circle2X >= kuang2X - kuangSize / 2 && circle2X <= kuang2X + kuangSize / 2 &&
    circle2Y >= kuang2Y - kuangSize / 2 && circle2Y <= kuang2Y + kuangSize / 2;
}

function isCircle3InsideKuang3(circle3X, circle3Y, kuang3X, kuang3Y, kuangSize) {
  return circle3X >= kuang3X - kuangSize / 2 && circle3X <= kuang3X + kuangSize / 2 &&
    circle3Y >= kuang3Y - kuangSize / 2 && circle3Y <= kuang3Y + kuangSize / 2;
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];

    let pointFour = prediction.landmarks[4];
    let pointEight = prediction.landmarks[8];

    pointFour[0] = width - pointFour[0]*1.5;
    pointEight[0] = width - pointEight[0]*1.5;

    const distance = dist(pointFour[0], pointFour[1], pointEight[0], pointEight[1]);
    fill(255);
    textSize(16);
    text(`Distance between point 4 and point 8: ${distance.toFixed(2)}`, 180, height - 20);

    fill(0, 255, 0);
    noStroke();
    ellipse(pointFour[0], pointFour[1], 15, 15);
    ellipse(pointEight[0], pointEight[1], 15, 15);

    fill(255);
    textSize(12);
    text("4", pointFour[0], pointFour[1]);
    text("8", pointEight[0], pointEight[1]);
  }
}




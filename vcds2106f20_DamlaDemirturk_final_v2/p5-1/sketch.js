//DamlaDemirtürk  "movable skeleton" final project v2
//Creative Coding Fall2020 @Yaşar University VCD
//Instructor: Ceren Kayalar

//Additional Resources:
//I. https://www.youtube.com/watch?v=OIo-DIOkNVg
//II. https://www.youtube.com/watch?v=EA3-k9mnLHs
//III. https://www.youtube.com/watch?v=FYgYyq-xqAw

//Github: https://github.com/damlademirturk/Am-I

let poseNet;
let video;
let poses = [];
let skeletons = [];

function setup() {
  createCanvas(800, 900);
  video = createCapture(VIDEO);
  video.size(width, height);

  //create a new poseNet method
  //single detection
  poseNet = ml5.poseNet(video, modelReady);
  //variable "poses"
  //every time new poses are detected

  poseNet.on('pose', function (results) {
    poses = results;
  });

  //hide the video element
  //show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  //draw keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

//draw ellipses
//detected keypoints

function drawKeypoints()  {
  //loop = poses detected
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      //a keypoint is an object describing a body part (like rightArm or leftear)
      let keypoint = poses[i].pose.keypoints[j];
      //draw an ellipse = 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

//function = draw the skeletons
function drawSkeleton() {
  //loop = skeletons detected
  for (let i = 0; i < poses.length; i++) {
    //every skeleton = body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

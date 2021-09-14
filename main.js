song = "";
song2 = "";
let mode2;
let mode;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPosses);
} 

function modelLoaded(){
    console.log('PoseNet is Initialized!!1!');
}
function preload(){
    song = loadSound("ColorExplosion.mp3");
    song2 = loadSound("music2.mp3");
}
function draw(){
    image(video, 0, 0, 600, 500);
    stroke("orange");
    fill("orange");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.pause();
        mode2 = false;
        if(mode == false){
            song.play();
            document.getElementById("song").innerHTML = "Song: Color Explosion";
            mode = true;
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song.pause();
        mode = false;
        if(mode2 == false){
            song2.play();
            document.getElementById("song").innerHTML = "Song: Harry Potter Remix";
            mode2 = true;
        }
    }
}

function gotPosses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = " + scoreLeftWrist + ", Score right wrist = " + scoreRightWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + ", Left wrist y = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + rightWristX + "Right wrist y = " + rightWristY);

    }
}
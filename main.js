video = ""; 
status = "";
Objects = [];

function preload(){
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video , 0 , 0 , 480 , 380);
    if(status != ""){
        object_detector.detect(video , gotResult);

        for(i=0; i<Objects.length; i++){
            document.getElementById("Status").innerHTML = "Status = Objects Detected";
            document.getElementById("Objects_detected").innerHTML = "No. of objects = " + Objects.length;

            fill("#FF0000");
            
            stroke("#FF0000");
            
            noFill();
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
            
            if(Objects[i].label == Object_name){
                video.stop();
                object_detector.detect(gotResult);
                document.getElementById("Status").innerHTML = Object_name  +  "found";
            }
            else{
                document.getElementById("Status").innerHTML = Object_name  +   "not found";
            }
        }
    }
}

function Start(){
    object_detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("Status").innerHTML = "Detecting Objects";
    Object_name = document.getElementById("name").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1); 
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        Objects = results;
    }
}
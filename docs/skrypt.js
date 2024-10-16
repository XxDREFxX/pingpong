var speed = 1.5
var ballspeed= 0
var ballspeed2= 1
var balldir = 1
var balldir2 = 1
var sizepercY = (15/window.innerHeight)*100;
var sizepercX = (15/window.innerWidth)*100;
var wallsizepercX = (20/window.innerWidth)*100
var rightlimithit = 100-wallsizepercX-sizepercX
var leftlimithit = wallsizepercX+sizepercX
var leftlimit = leftlimithit
var rightlimit = rightlimithit
var score1 = 0
var score2 = 0
var hz = 16
var multi = 1
var paused = false
var start = true
var keys = {
    "W" : false,
    "S" : false,
    "&" : false,
    "(" : false,
}
var motion1 = {
    "Up" : false,
    "Down" : false
};
var motion2 = {
    "Up" : false,
    "Down" : false
};
$(window).on("resize",function(){
    sizepercY = (15/window.innerHeight)*100;
    sizepercX = (15/window.innerWidth)*100;
    wallsizepercX = (20/window.innerWidth)*100
    rightlimithit = 100-wallsizepercX-sizepercX
    leftlimithit = wallsizepercX+sizepercX
    leftlimit = leftlimithit
    rightlimit = rightlimithit
})
$(document).keydown(function(event){
    var code = String.fromCharCode(event.keyCode)
    if(code == ""){
        if(paused){
            paused = false
            $('#pauza').html("");
        }
        else{
            paused = true
            $('#pauza').html("PAUSED");
        }
    }
    if(code == "W"){
        motion1.Up = true
    }
    if(code == "S"){
        motion1.Down = true
    }
    if(code == "&"){
        motion2.Up = true
    }
    if(code == "("){
        motion2.Down = true
    }
    keys[code] = true
})
$(document).keyup(function(event){
    var code = String.fromCharCode(event.keyCode)
    if(code == "W"){
        motion1.Up = false
    }
    if(code == "S"){
        motion1.Down = false
    }
    if(code == "&"){
        motion2.Up = false
    }
    if(code == "("){
        motion2.Down = false
    }
    keys[code] = false
})
$(window).on("touchstart",function(event){
    var code
        var touch = event.touches[event.touches.length-1]
        if (touch.clientX < window.innerWidth/2){
            if(touch.clientY < window.innerHeight/2){
                code = "S"
            }
            else {code = "W"}
        }
        else{
            if(touch.clientY < window.innerHeight/2){
                code = "("
            }
            else{
                code = "&"
            }
        }
        if (code == null){alert("Błąd")}
        keys[code] = true
})
$(window).on("touchend",function(event){
    var code
    for(var i in keys){
        keys[i] = false
    }
    for(i = 0; i < event.touches.length; i++){
        var touch = event.touches[i]
        if (touch.clientX < window.innerWidth/2){
            if(touch.clientY < window.innerHeight/2){
                code = "S"
            }
            else {code = "W"}
        }
        else{
            if(touch.clientY < window.innerHeight/2){
                code = "("
            }
            else{
                code = "&"
            }
        }
        keys[code] = true
    }
})
$(window).on("touchmove",function(event){
    var code
    for(var i in keys){
        keys[i] = false
    }
    for(i = 0; i < event.touches.length; i++){
        var touch = e.touches[i]
        if (touch.clientX < window.innerWidth/2){
            if(touch.clientY < window.innerHeight/2){
                code = "S"
            }
            else {code = "W"}
        }
        else{
            if(touch.clientY < window.innerHeight/2){
                code = "("
            }
            else{
                code = "&"
            }
        }
        keys[code] = true
    }
})
$(window).on("touchcancel",function(event){
    var code
    for(var i in keys){
        keys[i] = false
    }
    for(i = 0; i < event.touches.length; i++){
        var touch = e.touches[i]
        if (touch.clientX < window.innerWidth/2){
            if(touch.clientY < window.innerHeight/2){
                code = "S"
            }
            else {code = "W"}
        }
        else{
            if(touch.clientY < window.innerHeight/2){
                code = "("
            }
            else{
                code = "&"
            }
        }
        keys[code] = true
    }
})

function update(){
    if (paused) {setTimeout(update, hz); return}
    if (start)
    {
        start = false
        hz = 16
        leftlimit = leftlimithit
        rightlimit = rightlimithit
        balldir2*=-1
        multi = 1
        ballspeed = Math.max(Math.random(),0.3)
        ballspeed2 = 0.5
        $('#circle').attr('cy', "50%");
        $('#circle').attr('cx', "50%");
        // $('#rightwall').attr('y', "45%");
        // $('#leftwall').attr('y', "45%");
    }
    if(Number($('#circle').attr('cx').slice(0,-1))>105){
        start = true
        hz = 1000
        score1+=1
        $("#score").html(score1.toString()+" - "+score2.toString())
    }
    else if(Number($('#circle').attr('cx').slice(0,-1))<-5){
        start = true
        hz = 1000
        score2+=1
        $("#score").html(score1.toString()+" - "+score2.toString())
    }
    if (keys["W"] == true){
        var mY = $('#leftwall').attr('y')
        var setY1 = Math.max(Number(mY.slice(0,-1))-speed,0)
        $('#leftwall').attr('y', setY1+"%")
    }
    if (keys["S"] == true){
        var mY = $('#leftwall').attr('y')
        var setY1 = Math.min(Number(mY.slice(0,-1))+speed,90)
        $('#leftwall').attr('y', setY1+"%")
    }
    if (keys["&"] == true){
        var mY = $('#rightwall').attr('y')
        var setY1 = Math.max(Number(mY.slice(0,-1))-speed,0)
        $('#rightwall').attr('y', setY1+"%")
    }
    if (keys["("] == true){
        var mY = $('#rightwall').attr('y')
        var setY1 = Math.min(Number(mY.slice(0,-1))+speed,90)
        $('#rightwall').attr('y', setY1+"%")
    }
    var BallY = $('#circle').attr("cy");
    var BallX = $('#circle').attr("cx");

    var setY = balldir==1?Math.max(Number(BallY.slice(0,-1))-ballspeed*balldir,sizepercY):Math.min(Number(BallY.slice(0,-1))-ballspeed*balldir,100-sizepercY)
    var setX = balldir2==1?Math.min(Number(BallX.slice(0,-1))+ballspeed2*balldir2,rightlimit):Math.max(Number(BallX.slice(0,-1))+ballspeed2*balldir2,leftlimit)

    $('#circle').attr('cy', setY+"%");
    $('#circle').attr('cx', setX+"%");
    BallY = $('#circle').attr("cy");
    BallX = $('#circle').attr("cx");
    if(setX == wallsizepercX+sizepercX || setX == 100-wallsizepercX-sizepercX){
        var wall = setX == wallsizepercX+sizepercX?$('#leftwall'):$('#rightwall')
        var motion = setX == wallsizepercX+sizepercX?motion1:motion2
        var wallpos = wall.attr('y').slice(0,-1)
        var ballYpos = BallY.slice(0,-1)
        if(Number(ballYpos) >=Number(wallpos)-sizepercY && Number(ballYpos) <= Number(wallpos)+10+sizepercY){
            balldir2*=-1
            ballspeed2 += 0.05
            if(balldir == 1){
                if(motion.Up == true && motion.Down == false){
                    balldir*=-1
                    var off = Number(BallY.slice(0,-1)) - (Number(wallpos)-sizepercY)
                    var point = 10+sizepercY
                    var result = 1-(off/point)
                    ballspeed = result
                }
            }
            else if(balldir == -1){
                if (motion.Down == true && motion.Up == false){
                    balldir*=-1
                    var off = Number(BallY.slice(0,-1)) - (Number(wallpos)-sizepercY)
                    var point = 10+sizepercY
                    var result = off/point
                    ballspeed = result
                }
            }
        }
        else{
            rightlimit = 200
            leftlimit = -200
        }
    }
    if(setY == sizepercY || setY == 100-sizepercY){
        balldir*=-1
    }
   setTimeout(update, hz)
}
$(document).ready(function() {
    update()
})

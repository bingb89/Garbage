var SHAKE_THRESHOLD = 800;
var last_update = 0;
var flag = false;
var prev_time = 0;
var next_time = 0;
var x = y = z = last_x = last_y = last_z = 0;
 
if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
	alert('本设备不支持devicemotion事件');
}
//摇一摇
function deviceMotionHandler(eventData) {
	if($('#index:visible').length <= 0) return false;
	var acceleration = eventData.accelerationIncludingGravity;
	var curTime = new Date().getTime();
	if ((curTime - last_update) > 150) {
		var diffTime = curTime - last_update;
		last_update = curTime;
		x = acceleration.x;
		y = acceleration.y;
		z = acceleration.z;
		var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
		if (speed > SHAKE_THRESHOLD) {
			next_time = curTime;
			if(next_time - prev_time > 1000){
				flag = false;
			}
			if(!flag){
				prev_time = curTime;
				flag = true;
				doResult();
			}
		}
		last_x = x;
		last_y = y;
		last_z = z;
		
	}
}

var yao_img = document.getElementById('yao_img');
function doResult() {
	music();
	zhend();
	yao_img.className = "yaoer";
	yao_img.className = "";
	colors();
}
/*方块加色*/
function colors() {
	setTimeout("$('#one').click()", 1000);
	//$('#one').click();
}
/*震动*/
function zhend() {
	//navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
	if(navigator.vibrate){
		navigator.vibrate(300);
	}else if (navigator.webkitVibrate) {
    	navigator.webkitVibrate(300);
  	}else if (navigator.mozVibrate) {
    	navigator.mozVibrate(300);
  	}else if (navigator.msVibrate) {
    	navigator.msVibrate(300);
  	}
}
/**music**/
function music(){
	var myAudio = new Audio('/assets/act/images/yao.mp3');
  	myAudio.play();
  	myAudio.addEventListener('ended', function(e) {
    	return true;
  	}, false);
}

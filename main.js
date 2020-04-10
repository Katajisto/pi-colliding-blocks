/*
  Cube collision simulator

  Written by Katajisto and JÃ¤rvenpÃ¤Ã¤ in Go & SDL, and then ported to JS by Katajisto

  t@ktj.st

*/

var collisionCount = 0
var x1 = 300
var x2 = 100
var v1 = -1
var v2 = 0
var m1 = Number(document.getElementById('weight1').value)
var m2 = Number(document.getElementById('weight2').value)
var delay = Number(document.getElementById('delay').value)
console.log(m1,m2)

var canvas = document.getElementById('canvas'),
    cw = canvas.width,
    ch = canvas.height,
    cx = null;

function reset() {
    x1 = 300
    x2 = 100
    v1 = -1
    v2 = 0
    m1 = Number(document.getElementById('weight1').value)
    m2 = Number(document.getElementById('weight2').value)
    collisionCount = 0
    delay = Number(document.getElementById('delay').value)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function loop() {
    let tickTime = 0
    while(1) {
	if(v2 < 0) {
	    let t = Math.abs((x2/v2))
	    if(tickTime + t >= delay) {
		let delta = delay - tickTime
		x2 += v2*delta
		x1 += v1*delta
		break
	    } else {
		collisionCount++
		tickTime += t
		x2 = 0
		x1 += v1*t
		v2 *= -1
		
	    }
	}

	let n = ((x2+100)-x1)/(v1-v2)

	if(tickTime + n >= delay || v2 < v1) {
	    let delta = delay - tickTime
	    x2 += v2*delta
	    x1 += v1*delta
	    break
	} else {
	    collisionCount++
	    let dvv = (-2.0*(m1)*(v1-v2))/(m1+m2)
	    v2 -= dvv
	    v1 -= -1*(dvv*(m2/m1))

	    x1 += v1*n
	    x2 += v2*n
	    tickTime += n
	}
    }
    
    
    cx.fillStyle = "#FFFFFF"
    cx.fillRect(0,0,cw,ch)
    cx.fillStyle = "#ffc2ef";
    cx.fillRect(x2, 400, 100, 100);
    cx.fillStyle = "#000000";
    cx.fillRect(x1, 400, 100, 100);
    sleep(20)
    cx.fillStyle = "#000000";
    cx.font = "30px Arial";
    cx.fillText("COLLISION COUNT: " + collisionCount, 10, 30);
    
}


if (typeof (canvas.getContext) !== undefined) {
    cx = canvas.getContext('2d');
    setInterval(loop, 10)
}

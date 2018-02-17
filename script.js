CANVAS_WIDTH = 300;
CANVAS_HEIGHT = 300;

class Camera {
    constructor(x, y, fov, direction) {
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.fov = fov;
    }    
}

function degreesToRadians(deg) {
    return (deg / 180) * Math.PI;
}

// right now, box coordinates hard coded at (1, 1)
function intersect(ox, oy, vx, vy) {
    var bx = 1;
    var by = 1;
    var tmin = -100000;
    var tmax = 100000;
    if (vx != 0) {
	tx1 = (bx - ox) / vx;
	tx2 = (bx + 1 - ox) / vx;

	tmin = Math.max(tmin, Math.min(tx1, tx2));
	tmax = Math.min(tmax, Math.max(tx1, tx2));
    }

    if (vy != 0) {
	ty1 = (by - oy) / vy;
	ty2 = (by + 1 - oy) / vy;

	tmin = Math.max(tmin, Math.min(ty1, ty2));
	tmax = Math.min(tmax, Math.max(ty1, ty2));
    }

    if (tmax >= tmin) {
	var x = ox + (tmin * vx);
	var y = oy + (tmin * vy);
	dist = Math.sqrt((ox - x) ** 2 + (oy - y) ** 2);
	return dist;
    }
    return null;
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// at 70 degrees
var fov = degreesToRadians(70);
// facing 45 degrees
var direction = degreesToRadians(45);
var camera = new Camera(0, 0, fov, direction);

var theta = direction + (fov / 2);
var dtheta = fov / CANVAS_WIDTH
// going through the canvas columns
for (var cx = 0; cx < CANVAS_WIDTH; cx++) {
    // getting the vector
    var vx = Math.cos(theta);
    var vy = Math.sin(theta);
    console.log(theta);

    var dist = intersect(camera.x,
		     camera.y,
		     vx, vy);
    // we have a hit
    if (dist != null) {
	var height = (CANVAS_HEIGHT - 50) / (dist * Math.cos(theta));
	height = Math.floor(height);
	ctx.moveTo(cx, (CANVAS_HEIGHT / 2) - height);
	ctx.lineTo(cx, (CANVAS_HEIGHT / 2) + height);
	ctx.stroke();
    }
    
    theta -= dtheta;
}

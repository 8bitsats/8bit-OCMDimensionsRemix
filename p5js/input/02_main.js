
let seed, mySize;
let angle_c;
let colors = [];
let colors7 = "ffbe0b-fb5607-ff006e-8338ec-3a86ff".split("-").map((a) => "#" + a);
let colors8 = "f94144-f3722c-f8961e-f9844a-001219-005f73-0a9396-e9d8a6-ee9b00-bb3e03-ae2012-f72585-54478c-ff8700-ffd300-deff0a-97EAD2-0aff99-2B59C3-acd9e7-147df5-FF66B3-7b9e89-f2c14e-3E92CC-cd2220-ff6201-EB5E55-f55536-084887".split("-").map((a) => "#" + a);
var color_setup1,color_setup2;
let color_bg;
let branch;

function setup() {
    mySize = min(windowWidth, windowHeight);
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2); // Adjust for high resolution screens
	seed = int(random(1000));
	colorMode(HSB, 360, 100, 100, 100);
	color_setup1 = colors7;
	color_setup2 = colors8;
	color_bg = "#000000";
	background(color_bg);
	angle_c = 0;
	branch = int(random(4,20));
}

function draw() {
	randomSeed(seed);
	drawingContext.shadowColor = str(random(color_setup1)) + "00";
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	drawingContext.shadowBlur = 0;
	translate(width / 2, height / 2);
	rotate(angle_c);
	for (let i = 0; i < 2; i++) {
		colors[0] = random(color_setup1);
		colors[1] = random(color_setup1);
		colors[2] = random(color_setup1);
		colors[3] = random(color_setup1);
		colors[4] = random(color_setup2);
		circleForm(0, 0, mySize * 0.8 * (i + 1)/2);
	}
	if(frameCount % 100 == 0 && branch<1000) {
		branch += 10;
		angle_c += TAU/360;
	}else if(branch>= 1000){
		branch = 4;
		frameCount = 0;
	}
}

function circleForm(x, y, d) {

	
	let ang = TAU / branch;
	let angles = [];
	for (let i = 0; i < branch; i++) {
		angles.push(ang * (i + iteration(0.1, 0.25)));
	}
	for (let i = 0; i < branch; i++) {
		let ang1 = angles[i];
		let ang2 = angles[(i + int(random(6))) % angles.length];
		let dd = d * iteration(0.1, 1);
		noFill();
		drawingContext.shadowColor = random(color_setup1);
		drawingContext.shadowOffsetX = 1;
		drawingContext.shadowOffsetY = 1;
		drawingContext.shadowBlur = 0;
		stroke(colors[random([0,1,2,3,4])]);
		strokeWeight(random(1));
		arc(x, y, dd, dd, ang1, ang2);
	}
}

function iteration(s, e) {
	let t = random(10, 100);
	let v = random(0.001, 0.01);
	return map(cos(t + frameCount * v), -1, 1, s, e);
}

function keyTyped() {
	saveCanvas("NoisePlanet_ALPHA_2022", "png");
}

//fullscreen
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
    mySize = min(windowWidth, windowHeight);
    resizeCanvas(windowWidth, windowHeight);
    // Optionally, re-generate or re-draw content if necessary
}

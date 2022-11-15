let x;
let y;
let xspeed;
let yspeed;
let w,h;

let r,g,b;


function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  //h = window.screen.height;

  createCanvas(w,h);
  x = 400;
  y = 300;
  xspeed = 7;
  yspeed = 7;
  pickColor();
}

function pickColor(){
  r = random(256);
  g = random(256);
  b = random(256);
}

function draw() {
  background(0);
  fill(r,g,b)
  rect(x,y,80,60);

  x = x + xspeed
  y = y + yspeed;

  if ( x + 80 >= width || x <= 0 ) {
    xspeed = -xspeed
    pickColor()
  }

  if ( y + 60 >= height || y <= 0){
    yspeed = -yspeed
    pickColor()
  }
}

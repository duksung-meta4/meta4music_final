// Initialize the Image Classifier method with DoodleNet.
let classifier;

// Two variable to hold the label and confidence of the result
let labelSpan, labelSpan1;
let confidenceSpan;
let clearButton;
let canvas;

console.log("ml5 version:", ml5.version);

//필터링
const keyword_fillter = {
  aircraft_carrier: "기차",
  airplane: "비행기",
  alarm_clock: "시계",
  ambulance: "자동차",
  angel: "허수아비",
  animal_migration: "바다",
  ant: "기차",
  anvil: "집",
  apple: "사과",
  arm: "손",
  asparagus: "새싹",
  axe: "도깨비",
  backpack: "친구",
  banana: "밤",
  bandage: "돈",
  barn: "집",
  baseball: "구슬",
  baseball_bat: "손",
  basket: "농부",
  basketball: "구슬",
  bat: "나비",
  bathtub: "집",
  beach: "바다",
  bear: "곰",
  beard: "미소",
  bed: "집",
  bee: "벌",
  belt: "아빠",
  bench: "호수",
  bicycle: "친구",
  binoculars: "잠자리",
  bird: "새",
  birthday_cake: "친구",
  blackberry: "구슬",
  blueberry: "토마토",
  book: "선생님",
  boomerang: "새",
  bottlecap: "해",
  bowtie: "나비",
  bracelet: "구슬",
  brain: "솜사탕",
  bread: "과자",
  bridge: "발",
  broccoli: "나무",
  broom: "나무",
  bucket: "집",
  bulldozer: "기차",
  bus: "자동차",
  bush: "솜사탕",
  butterfly: "나비",
  cactus: "나무",
  cake: "집",
  calculator: "과자",
  calendar: "집",
  camel: "둘리",
  camera: "병원",
  camouflage: "허수아비",
  campfire: "마법",
  candle: "마법",
  cannon: "저녁",
  canoe: "호수",
  car: "자동차",
  carrot: "꽃",
  castle: "병원",
  cat: "호랑이",
  ceiling_fan: "집",
  cello: "미소",
  cell_phone: "친구",
  chair: "집",
  chandelier: "집",
  church: "병원",
  circle: "구슬",
  clarinet: "마법",
  clock: "시계",
  cloud: "하늘",
  coffee_cup: "물",
  compass: "시계",
  computer: "마법",
  cookie: "과자",
  cooler: "집",
  couch: "집",
  cow: "송아지",
  crab: "개구리",
  crayon: "아기",
  crocodile: "악어",
  crown: "별",
  cruise_ship: "호수",
  cup: "물",
  diamond: "사랑",
  dishwasher: "물",
  diving_board: "바다",
  dog: "강아지",
  dolphin: "물고기",
  donut: "과자",
  door: "집",
  dragon: "둘리",
  dresser: "집",
  drill: "마법",
  drums: "돈",
  duck: "새",
  dumbbell: "사랑",
  ear: "달",
  elbow: "손",
  elephant: "염소",
  envelope: "동네",
  eraser: "돈",
  eye: "달",
  eyeglasses: "사랑",
  face: "친구",
  fan: "연",
  feather: "달",
  fence: "산",
  finger: "손",
  fire_hydrant: "도깨비",
  fireplace: "인디언",
  firetruck: "자동차",
  fish: "물고기",
  flamingo: "새",
  flashlight: "별",
  flip_lops: "발",
  floor_lamp: "집",
  flower: "꽃",
  flying_saucer: "구슬",
  foot: "발",
  fork: "농부",
  frog: "개구리",
  frying_pan,
};

function preload() {
  //분류기 생성
  classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
  //캔버스 크기 고정
  canvas = createCanvas(280, 280);
  canvas.parent("sketch-holder");
  background(255);
  classifier.classify(canvas, gotResult);

  // Create a clear canvas button
  clearButton = select("#clearBtn");
  clearButton.mousePressed(clearCanvas);

  // Create 'label' and 'confidence' div to hold results
  labelSpan = select("#label");
  confidenceSpan = select("#confidence");

  labelSpan1 = select("#label1");
  labelSpan2 = select("#label2");
  labelSpan3 = select("#label3");
  labelSpan4 = select("#label4");
  labelSpan5 = select("#label5");
  labelSpan6 = select("#label6");
}

function clearCanvas() {
  background(255);
}

function draw() {
  strokeWeight(16);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results);
  // Show the first label and confidence
  labelSpan.html(results[0].label);
  confidenceSpan.html(floor(100 * results[0].confidence));

  labelSpan1.html(keyword_fillter[results[0].label]);
  labelSpan2.html(keyword_fillter[results[1].label]);
  labelSpan3.html(keyword_fillter[results[2].label]);
  labelSpan4.html(keyword_fillter[results[3].label]);
  labelSpan5.html(keyword_fillter[results[4].label]);
  labelSpan6.html(keyword_fillter[results[5].label]);

  classifier.classify(canvas, gotResult);
}

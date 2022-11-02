// Initialize the Image Classifier method with DoodleNet.
let classifier;

// Two variable to hold the label and confidence of the result
let labelSpan, labelSpan1;
let confidenceSpan;
let clearButton;
let canvas;

// console.log("ml5 version:", ml5.version);

//필터링
const keyword_fillter = {
  aircraft_carrier: "쪽배",
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
  frying_pan: "시계",
  garden: "집",
  garden_hose: "집",
  giraffe: "다람쥐",
  goatee: "염소",
  golf_club: "미소",
  grapes: "구슬",
  grass: "동네",
  guitar: "인디언",
  hamburger: "과자",
  hammer: "농부",
  hand: "손",
  harp: "시계",
  hat: "미소",
  headphones: "사과",
  hedgehog: "닭",
  helicopter: "자동차",
  helmet: "밤",
  hexagon: "미소",
  hockey_puck: "돈",
  hockey_stick: "돈",
  house_plant: "새싹",
  horse: "염소",
  hospital: "미소",
  hot_air_balloon: "마법",
  hot_dog: "과자",
  hot_tub: "집",
  hourglass: "시계",
  house: "집",
  house_plant: "네잎클로버",
  hurricane: "하늘",
  ice_cream: "과자",
  jacket: "연",
  jail: "도깨비",
  kangaroo: "다람쥐",
  key: "네잎클로버",
  keyboard: "과자",
  knee: "발",
  knife: "농부",
  ladder: "농부",
  lantern: "별",
  laptop: "돈",
  leaf: "네잎클로버",
  leg: "발",
  light_bulb: "별",
  lighter: "별",
  lighthouse: "별",
  lightning: "별",
  line: "바다",
  lion: "호랑이",
  lipstick: "미소",
  lobster: "악어",
  lollipop: "과자",
  mailbox: "고향",
  map: "고향",
  marker: "고향",
  matches: "별",
  megaphone: "바람",
  mermaid: "물고기",
  microphone: "동네",
  microwave: "바람",
  monkey: "강아지 ",
  moon: "달",
  mosquito: "잠자리",
  motorbike: "자동차",
  mountain: "산",
  mouse: "다람쥐",
  moustache: "미소",
  mouth: "미소",
  mug: "바람",
  mushroom: "토마토",
  nail: "산",
  necklace: "구슬",
  nose: "친구",
  ocean: "바다",
  octagon: "고향",
  octopus: "물고기",
  onion: "토마토",
  oven: "돈",
  owl: "새",
  paintbrush: "마법",
  paint_can: "마법",
  palm_tree: "나무",
  panda: "곰",
  pants: "발",
  paper_clip: "새싹",
  parachute: "마법",
  parrot: "새",
  passport: "돈",
  peanut: "새싹",
  pear: "수박",
  peas: "구슬",
  pencil: "집",
  penguin: "새",
  piano: "손",
  pickup_truck: "자동차",
  picture_frame: "친구",
  pig: "돼지",
  pillow: "사랑",
  pineapple: "사과",
  pizza: "해",
  pliers: "인디언",
  police_car: "자동차",
  pond: "호수",
  pool: "호수",
  popsicle: "과자",
  postcard: "고향",
  potato: "구슬",
  power_outlet: "이",
  purse: "돈",
  rabbit: "토끼",
  raccoon: "곰",
  radio: "동네",
  rain: "하늘",
  rainbow: "하늘",
  rake: "해",
  remote_control: "과자",
  rhinoceros: "송아지",
  rifle: "둘리",
  river: "호수",
  roller_coaster: "발",
  rollerskates: "발",
  sailboat: "바다",
  sandwich: "과자",
  saw: "해",
  saxophone: "마법",
  school_bus: "자동차",
  scissors: "새싹",
  scorpion: "악어",
  screwdriver: "마법",
  sea_turtle: "물고기",
  see_saw: "해",
  shark: "물고기",
  sheep: "염소",
  shoe: "발",
  shorts: "발",
  shovel: "농부",
  sink: "바다",
  skateboard: "발",
  skull: "곰",
  skyscraper: "병원",
  sleeping_bag: "아기",
  smiley_face: "미소",
  snail: "잠자리",
  snake: "악어",
  snorkel: "바다",
  snowflake: "눈",
  snowman: "눈",
  soccer_ball: "구슬",
  sock: "발",
  speedboat: "쪽배",
  spider: "잠자리",
  spoon: "농부",
  spreadsheet: "돈",
  square: "돈",
  squiggle: "바다",
  squirrel: "다람쥐",
  stairs: "산",
  star: "별",
  steak: "돼지",
  stereo: "마법",
  stethoscope: "병원",
  stitches: "새싹",
  stop_sign: "자동차",
  stove: "해",
  strawberry: "토마토",
  streetlight: "별",
  string_bean: "이",
  submarine: "바다",
  suitcase: "동네",
  sun: "해",
  swan: "연",
  sweater: "나비",
  swing_set: "나비",
  sword: "도깨비",
  syringe: "병원",
  table: "집",
  teapot: "솜사탕",
  teddy_bear: "곰",
  telephone: "집",
  television: "집",
  tennis_racquet: "네잎클로버",
  tent: "산",
  The_Eiffel_Tower: "산",
  The_Great_Wall_of_China: "산",
  The_Mona_Lisa: "엄마",
  tiger: "호랑이",
  toaster: "과자",
  toe: "발",
  toilet: "집",
  tooth: "이",
  toothbrush: "이",
  toothpaste: "이",
  tornado: "바다",
  tractor: "자동차",
  traffic_light: "과자",
  train: "기차",
  tree: "나무",
  triangle: "산",
  trombone: "마법",
  truck: "자동차",
  trumpet: "마법",
  t_shirt: "허수아비",
  umbrella: "물",
  underwear: "아기",
  van: "자동차",
  vase: "꽃",
  violin: "할머니",
  washing_machine: "아빠",
  watermelon: "수박",
  waterslide: "물",
  whale: "바다",
  wheel: "자동차",
  windmill: "바람",
  wine_bottle: "물",
  wine_glass: "물",
  wristwatch: "시계",
  yoga: "엄마",
  zebra: "여우",
  zigzag: "토끼",
};

function preload() {
  //분류기 생성
  console.log("로딩 중");
  classifier = ml5.imageClassifier("DoodleNet");
}

let button;

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
  // labelSpan = select("#label");
  // confidenceSpan = select("#confidence");

  labelSpan1 = select("#label1");
  labelSpan2 = select("#label2");
  labelSpan3 = select("#label3");
  labelSpan4 = select("#label4");
  labelSpan5 = select("#label5");
  labelSpan6 = select("#label6");


  button = createButton('snap');
  button.mousePressed(takesnap);
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
  // // The results are in an array ordered by confidence.
  // console.log(results);
  // // Show the first label and confidence

  // labelSpan.html(results[0].label);
  // confidenceSpan.html(floor(100 * results[0].confidence));

  labelSpan1.html(keyword_fillter[results[0].label]);
  labelSpan2.html(keyword_fillter[results[1].label]);
  labelSpan3.html(keyword_fillter[results[2].label]);
  labelSpan4.html(keyword_fillter[results[3].label]);
  labelSpan5.html(keyword_fillter[results[4].label]);
  labelSpan6.html(keyword_fillter[results[5].label]);

  classifier.classify(canvas, gotResult);
}

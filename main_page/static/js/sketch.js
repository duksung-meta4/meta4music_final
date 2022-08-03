// Initialize the Image Classifier method with DoodleNet.
let classifier;

// Two variable to hold the label and confidence of the result
let labelSpan, labelSpan1;
let confidenceSpan;
let clearButton;
let canvas;

console.log("ml5 version:", ml5.version);

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

  labelSpan1.html(results[0].label);
  labelSpan2.html(results[1].label);
  labelSpan3.html(results[2].label);
  labelSpan4.html(results[3].label);
  labelSpan5.html(results[4].label);
  labelSpan6.html(results[5].label);

  classifier.classify(canvas, gotResult);
}

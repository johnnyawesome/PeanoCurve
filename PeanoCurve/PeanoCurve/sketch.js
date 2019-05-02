/// <reference path="../TSDef/p5.global-mode.d.ts" />

//The Axiom-Array, "F"
let peanoCurve = "F".split("");
const initialSegmentLength = 750;
let segmentLength = initialSegmentLength;
let minimalSegmentLength = 10;
let theta = 90;

function setup() {
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(1);
  angleMode(DEGREES);
}

let createCurve = setInterval(() => {

  if (segmentLength > minimalSegmentLength) {
    background(0);
    drawPeanoCurve(segmentLength);
    calculatePeanoCurve();
  }
  else {
    segmentLength = initialSegmentLength;
    peanoCurve = "F".split("");
  }
}, 2000);

function calculatePeanoCurve() {

  //Create a temporary curve to do all the calculations
  let peanoCurveTemp = [];

  //We step through each element of the array
  //and apply the rules to it
  peanoCurve.forEach(function (element) {

    //When we hit a "F"....
    if (element === "F") {
      //...we create a temporary array, and it's elements are
      //the characters returned by the string.split operation
      let tempRuleArray = "F+F-F-F-F+F+F+F-F".split("");
      tempRuleArray.forEach(function (element1) {
        //Then we append the contents of tempRuleArray to peanoCurveTemp
        peanoCurveTemp.push(element1);
      });

    }
    //If the currently checked element is "+" or "-" we just append it
    else if (element === "+") peanoCurveTemp.push(element);
    else if (element === "-") peanoCurveTemp.push(element);

    peanoCurve = peanoCurveTemp.slice(0);
  });
}

function drawPeanoCurve(length) {

  translate(50, 50);
  rotate(45);

  if (length > minimalSegmentLength) {

    push();

    //Draws the actual curve
    for (let i = 0; i < peanoCurve.length; i++) {
      const element = peanoCurve[i];

      if (element === "F") {
        line(0, 0, length, 0);
        translate(length, 0);
      }
      //-theta = turn left, theta = turn right
      else if (element === "+") {
        rotate(theta);
      }
      else if (element === "-") {
        rotate(-theta);
      }
    }
    pop();

    //Shorten segments for next iteration
    segmentLength *= 0.335;
  }
}

function draw() {
}
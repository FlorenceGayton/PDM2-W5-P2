let bgCheckbox;
let shapeCheckbox;

let bgIsBlue = false;
let showCircle = false;

function setup() {
  createCanvas(400, 300);

  // Checkbox 1: changes background colour
  bgCheckbox = new Checkbox(20, 20, 120, 20, "Blue Background", () => {
    bgIsBlue = !bgIsBlue;
  });

  // Checkbox 2: toggles a circle on/off
  shapeCheckbox = new Checkbox(20, 50, 120, 20, "Show Circle", () => {
    showCircle = !showCircle;
  });
}

function draw() {
  // Use checkbox 1 effect
  if (bgIsBlue) {
    background(100, 150, 255);
  } else {
    background(220);
  }

  // Use checkbox 2 effect
  if (showCircle) {
    fill(255, 100, 100);
    ellipse(width / 2, height / 2, 80, 80);
  }

  // Draw the checkboxes
  bgCheckbox.draw();
  shapeCheckbox.draw();
}

function mouseMoved() {
  bgCheckbox.checkHover(mouseX, mouseY);
  shapeCheckbox.checkHover(mouseX, mouseY);
}

function mousePressed() {
  bgCheckbox.checkClick(mouseX, mouseY);
  shapeCheckbox.checkClick(mouseX, mouseY);
}

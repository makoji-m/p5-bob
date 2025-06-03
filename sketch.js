let sparkles = [];
let fullMessage = "This is me saying I love you, in code.";
let currentText = "";
let charIndex = 0;
let typingSpeed = 8; // adjust: lower = faster
let textOpacity = 0;
let textY = 480;
let hearts = [];
let showHearts = false;
let myButton;

function setup() {
  createCanvas(800, 800);
  textSize(30);
  textAlign(CENTER, CENTER);

  myButton = createButton('Click me for lauv');
  myButton.position(width / 2 - 85, 600);

  // Styling (applied immediately)
  myButton.style('background-color', '#FFB6C1');
  myButton.style('color', 'white');
  myButton.style('font-size', '18px');
  myButton.style('padding', '10px 20px');
  myButton.style('border', 'none');
  myButton.style('border-radius', '12px');
  myButton.style('cursor', 'pointer');

  // Button click action
  myButton.mousePressed(() => {
    showHearts = true;
    myButton.html('Lauv sent 💌');
    myButton.attribute('disabled', '');
  });
}

function draw() {
  background('#F2DAEB');
  
  fill('deeppink');
  text("Hi bob.", 400, 400);
  
// Sparkles falling from bottom
  if (frameCount % 5 === 0) {
    sparkles.push({
      x: random(width),
      y: height,
      size: random(2, 6),
      alpha: 255
    });
  }

  for (let i = sparkles.length - 1; i >= 0; i--) {
    let s = sparkles[i];
    fill(255, s.alpha);
    noStroke();
    ellipse(s.x, s.y, s.size);
    s.y -= 1;
    s.alpha -= 2;
    if (s.alpha < 0) sparkles.splice(i, 1);
  }

// Typewriter effect
if (frameCount % typingSpeed === 0 && charIndex < fullMessage.length) {
  currentText += fullMessage.charAt(charIndex);
  charIndex++;
}

if (textOpacity < 255) {
  textOpacity += 5; // fade in
}

fill(202, 154, 231, textOpacity); // soft purple with transparency
textStyle(ITALIC);
text(currentText, 400, textY);

  if (showHearts) {
    if (frameCount % 10 === 0) {
      if (movedX !== 0 || movedY !== 0) {
        hearts.push(new Heart(mouseX, mouseY));
      }
    }

    for (let i = hearts.length - 1; i >= 0; i--) {
      hearts[i].update();
      hearts[i].show();

      if (hearts[i].offScreen()) {
        hearts.splice(i, 1);
      }
    }
  }
}

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(8, 15); // smaller hearts
    this.speed = random(1, 2);
    this.color = color(random(255), 100, 150, 100); // translucent pinks
  }

  update() {
    this.y -= this.speed;
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    noStroke();
    beginShape();
    vertex(0, -this.size / 2);
    bezierVertex(this.size / 2, -this.size, this.size, -this.size / 4, 0, this.size);
    bezierVertex(-this.size, -this.size / 4, -this.size / 2, -this.size, 0, -this.size / 2);
    endShape(CLOSE);
    pop();
  }

  offScreen() {
    return this.y < -50;
  }
}


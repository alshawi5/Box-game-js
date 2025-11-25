let score = 0;
let time = 30;
let timerInterval;
let moveInterval;

let highScore = localStorage.getItem("highScore") || 0;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const box = document.getElementById("box");
const box2 = document.getElementById("box2");
const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

let boxPos = { x: 0, y: 0 };
let box2Pos = { x: 100, y: 100 };

function getRandomPosition() {
  const maxX = gameArea.clientWidth - box.clientWidth;
  const maxY = gameArea.clientHeight - box.clientHeight;

  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY
  };
}

function isOverlapping(p1, p2, size = 50) {
  return !(
    p1.x + size < p2.x ||
    p1.x > p2.x + size ||
    p1.y + size < p2.y ||
    p1.y > p2.y + size
  );
}

function moveBox() {
  let newPos;
  let tries = 0;

  do {
    newPos = getRandomPosition();
    tries++;
  } while (isOverlapping(newPos, box2Pos) && tries < 50);

  box.style.left = newPos.x + "px";
  box.style.top = newPos.y + "px";
  boxPos = newPos;
}

function moveBox2() {
  let newPos;
  let tries = 0;

  do {
    newPos = getRandomPosition();
    tries++;
  } while (isOverlapping(newPos, boxPos) && tries < 50);

  box2.style.left = newPos.x + "px";
  box2.style.top = newPos.y + "px";
  box2Pos = newPos;
}

box.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;

  moveBox();

  const sound = new Audio("duck-quack-112941.mp3");
  sound.play();
});

box2.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;

  moveBox2();

  const sound = new Audio("duck-quack-112941.mp3");
  sound.play();
});


startBtn.addEventListener("click", () => {
  score = 0;
  time = 30;

  scoreEl.textContent = score;
  timeEl.textContent = time;
  message.textContent = "";

  box.style.display = "block";
  box2.style.display = "block";

  moveBox();
  moveBox2();

  startBtn.disabled = true;

  
  timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      clearInterval(moveInterval);
      startBtn.disabled = false;

      box.style.display = "none";
      box2.style.display = "none";

      
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }

      message.textContent =
        "🎉 Game Over! Final score: " + score + " | High Score: " + highScore;
    }
  }, 1000);

  
  moveInterval = setInterval(() => {
    moveBox();
    moveBox2();
  }, 1000);
});

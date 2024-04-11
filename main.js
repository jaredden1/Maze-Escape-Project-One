console.log("js:loaded");

/*-------------- constants ---------------*/
// Audio file
const AUDIO = new Audio("mixkit-game-level-music-689.wav");

// Player start position
const width = 28;

// Maze layout array.
// path = 0
// wall = 1
// start = 2
// end = 3
// startTxt = 4
// endTxt = 5


const gridLayout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  4,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,0,1,
  1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,
  1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,
  1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,
  1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,
  1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,1,0,1,0,1,
  1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,0,1,
  1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,
  1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,
  1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,
  1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
  1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,0,1,1,1,0,1,0,1,1,1,1,
  1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1,0,1,0,0,0,0,1,
  1,0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,1,
  1,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,
  1,0,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,1,
  1,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1,
  1,0,1,0,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,
  1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,
  1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,1,0,1,
  1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1,
  1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1,
  1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,5,3,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

const cells = [];

/*----------- state variables ------------*/

// Render player start position
let playerCurrentIndex = 28;
let gameOver = false;
let countdownInterval;

/*----------- cached elements ------------*/

const mazeGrid = document.querySelector(".maze-grid");
const timerEl = document.getElementById("countdown-timer");
const startEl = document.getElementById("start-prompt");
const startBtn = document.getElementById("start-game");
const playerImage = document.createElement("img");
const winMessage = document.getElementById("win-message");
const loseMessage = document.getElementById("lose-message");

/*----------- event listeners ------------*/

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", movePlayer);

/*-------------- functions ---------------*/

// Audio playback after reaching end
AUDIO.addEventListener("ended", function () {
  AUDIO.currentTime = 0;
});

// Render maze layout
function createMaze() {
  for (let i = 0; i < gridLayout.length; i++) {
    const cell = document.createElement("div");
    mazeGrid.appendChild(cell);
    cells.push(cell);
    // Add class to cell based on value in gridLayout to create paths, wall, etc.
    if (gridLayout[i] === 0) {
      cells[i].classList.add("path");
    } else if (gridLayout[i] === 1) {
      cells[i].classList.add("wall");
    } else if (gridLayout[i] === 2) {
      cells[i].classList.add("start");
    } else if (gridLayout[i] === 3) {
      cells[i].classList.add("end");
    } else if (gridLayout[i] === 4) {
      cells[i].classList.add("startTxt");
      const startText = document.createElement("div");
      startText.textContent = "START";
      cells[i].appendChild(startText);
    } else if (gridLayout[i] === 5) {
      cells[i].classList.add("endTxt");
      const startText = document.createElement("div");
      startText.textContent = "END";
      cells[i].appendChild(startText);
    }
  }
}

createMaze();

// Player movement with arrow keys
function movePlayer(event) {
  cells[playerCurrentIndex].classList.remove("player");

  // Player movement based on arrow key pressed.
  switch (event.key) {
    case "ArrowUp":
      if (
        playerCurrentIndex - width >= 0 &&
        gridLayout[playerCurrentIndex - width] !== 1
      ) {
        playerCurrentIndex -= width;
      }
      break;
    case "ArrowDown":
      if (
        playerCurrentIndex + width < gridLayout.length &&
        gridLayout[playerCurrentIndex + width] !== 1
      ) {
        playerCurrentIndex += width;
      }
      break;
    case "ArrowLeft":
      if (
        playerCurrentIndex % width !== 0 &&
        gridLayout[playerCurrentIndex - 1] !== 1
      ) {
        playerCurrentIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (
        playerCurrentIndex % width < width - 1 &&
        gridLayout[playerCurrentIndex + 1] !== 1
      ) {
        playerCurrentIndex += 1;
      }
      break;
    default:
      break;
  }
  // Check if player has reached the end of maze
  if (gridLayout[playerCurrentIndex] === 3) {
    playerWins();
    return;
  }
  // Add player back to new position
  cells[playerCurrentIndex].classList.add("player");
}

// Render player and added an image for player
playerImage.src = "./playerImg.png";
playerImage.classList.add("player");

cells[playerCurrentIndex].appendChild(playerImage);
cells[playerCurrentIndex].classList.add("player");

// Countdown timer
function createCountdownTimer(callback) {
  let count = 30;
  AUDIO.loop = true;
  AUDIO.play();
  countdownInterval = setInterval(function () {
    count--;
    timerEl.innerText = `00 : ${count}`;
    if (count <= 0 && !gameOver) {
      clearInterval(countdownInterval);
      callback();
    }
  }, 1000);
}

// Start game 
function startGame() {
  startEl.style.display = "none";
  mazeGrid.style.display = "flex";
  timerEl.style.display = "block";
  winMessage.style.display = "none";
  loseMessage.style.display = "none";
  createCountdownTimer(function () {
    playerLoses();
    gameOver = false;
  });
}

// Player win/lose
function playerWins() {
  gameOver = true;
  AUDIO.pause();
  winMessage.style.display = 'block';
  setTimeout(function() {
    winMessage.style.display = 'none';
  }, 6000);
  resetGame();
}
function playerLoses() {
  gameOver = true;
  AUDIO.pause();
  loseMessage.style.display = "block";
  setTimeout(function() {
    loseMessage.style.display = 'none';
  }, 6000);
  resetGame();
}
// Render game reset
function resetGame() {
  // remove player from current position
  cells[playerCurrentIndex].classList.remove("player");
  // resets player back to beginning position
  playerCurrentIndex = 28;
  // hide countdown timer, maze grid
  timerEl.style.display = "none";
  mazeGrid.style.display = "none";
  // make start button visible
  startEl.style.display = "flex";
  // clear countdown timer before reset
  clearInterval(countdownInterval);
  // add player to its position
  cells[playerCurrentIndex].classList.add("player");
}

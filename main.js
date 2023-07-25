console.log('js:loaded');




/*-------------- constants ---------------*/

const width = 28;

// render maze layout array.
// path = 0
// wall = 1
// start = 2
// end = 3

const gridLayout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
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
    1,0,1,1,1,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,
    1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,
    1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,1,0,1,
    1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1,
    1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,0,0,1,
    1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,3,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

const cells = []

/*----------- state variables ------------*/

// render player start position
let playerCurrentIndex = 28

/*----------- cached elements ------------*/

const mazeGrid = document.querySelector('.maze-grid');
const timerEl = document.getElementById('countdown-timer');
const startEl = document.getElementById('start-prompt');
const startBtn = document.getElementById('start-game');

/*----------- event listeners ------------*/

document.addEventListener('keydown', movePlayer);
startBtn.addEventListener('click', startGame);

/*-------------- functions ---------------*/

// render maze layout
function createMaze() {
    
    for (let i = 0; i < gridLayout.length; i++) {
        const cell = document.createElement('div');
        mazeGrid.appendChild(cell);
        cells.push(cell);
        
        if (gridLayout[i] === 0) {
            cells[i].classList.add('path');
        } else if (gridLayout[i] === 1) {
            cells[i].classList.add('wall');
        } else if (gridLayout[i] === 2) {
            cells[i].classList.add('start');
            const startText = document.createElement('div');
            startText.textContent = 'START';
            cells[i].appendChild(startText);
        } else if (gridLayout[i] === 3) {
            cells[i].classList.add('end');
            const endText = document.createElement('div');
            endText.textContent = 'END';
            cells[i].appendChild(endText);
        } 
    }
}

createMaze();

// render player movement with arrow keys
function movePlayer(event) {
    cells[playerCurrentIndex].classList.remove('player');

 switch (event.key) {
     case 'ArrowUp':
        if (playerCurrentIndex - width >= 0 && gridLayout[playerCurrentIndex - width] !== 1) {
            playerCurrentIndex -= width;
        }
        break;
     case 'ArrowDown':
        if (playerCurrentIndex + width < gridLayout.length && gridLayout[playerCurrentIndex + width] !== 1) {
            playerCurrentIndex += width;
        }
        break;
     case 'ArrowLeft':
        if (playerCurrentIndex % width !== 0 && gridLayout[playerCurrentIndex - 1] !== 1) {
            playerCurrentIndex -= 1;
        }
        break;
     case 'ArrowRight':
        if (playerCurrentIndex % width < width - 1 && gridLayout[playerCurrentIndex + 1] !== 1) {
            playerCurrentIndex += 1;
        }
        break;
    default:
        break;
    } 
    if (gridLayout[playerCurrentIndex] === 3) {
        playerWins();
        return;
    }
    cells[playerCurrentIndex].classList.add('player');
}

// render player
cells[playerCurrentIndex].classList.add('player');

// render countdown timer
function createCountdownTimer(callback) {
    let count = 6;
    const interval = setInterval(function() {
        count--;
    timerEl.innerText = `00 : ${count}`;
    if (count <= 0) {
        clearInterval(interval);
        callback();
    }
  }, 1000);
}

// render start game
function startGame() {
    startEl.style.display = 'none';
    mazeGrid.style.display = 'flex';
    timerEl.style.display = 'block';
    createCountdownTimer(function() {
        playerLoses();
        resetGame()
    });
}

// render player win/lose
function playerWins() {
    alert('Congratulations! You Have Escaped The Maze');
    resetGame();
}

function playerLoses() {
    alert('Time Is Up! Game Over! Better Luck Next Time!');
    resetGame();
}
// render game reset
function resetGame() {
    cells[playerCurrentIndex].classList.remove('player');

    timerEl.style.display = 'none';
    mazeGrid.style.display = 'none';
    startEl.style.display = 'none';
}


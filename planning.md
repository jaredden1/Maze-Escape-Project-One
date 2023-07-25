# Maze Escape

## Wireframe

![Alt text](image.png)
created this using Canva.

## Pseudocode big picture:

### 1. Set up HTML Structure:
- Create a html container with class "grid" for the game board
### 2. Define CSS styles in style.css:
- Set styling for game grid and different elements/components w/in game (i.e. player, walls, path, etc.)
### 3. JS Game Logic Pseudocode:
-  Create a maze grid using 2D array. I will be using nested arrays for this.
- Initialize variables (i.e. grid, timer, etc.)
- create a function to generate maze grid game board
- Define function to move player within the maze grid
- Implement a timer by creating a timer function
- Create functions for win/loss conditions 
- Remove player's ability to move through the maze when timer stops and game ends

### 4. Detailed Pseudocode: 
1. Define required constants:
  - width 28 (this is the maze grid width)
2. Define required variables used to track the state of the game
  - playerCurrentIndex: 28 (this is the initial position of player in the maze grid layout)
3. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
  - mazeGrid: the maze grid container element (e.g., document.querySelector('.maze-grid'))
  - TimerEl: the countdown timer element (e.g., document.getelementbyId('countdown-timer'))
4. Upon loading the game should:
  - Initialize the state variable - playerCurrentIndex = 28
  - Render values to the page - Call createMaze() to render layout
5. Handle a player interacting with the maze grid:
  - Implement the movePlayer(event) function to handle arrow keys pressed and move player within maze.
  - Update the playerCurrentIndex variable to reflect player's new position 
  - Update mazeGrid to show player's new position
6. Handle a player clicking the replay button:
  - Add a replay button element to HTML
  - Add an event listener to replay button to restart the game when clicked
  - Reset the playerCurrentIndex to the initial position
  - Clear previous interval and countdown timer
  - Call createCountdownTimer() to start timer again

### 5. Functions:

//Function to render maze layout:
function createMaze(): renders maze layout based on gridLayout array and add event listeners to maze squares

//Function to move player with arrow keys:
function movePlayer(event): registers arrow key press to move player within the maze

//Function to create countdown timer:
function createCountdownTimer(callback): initialize countdown timer and update timer element

### 5. Some of the JS Methods I will likely be using:

- addEventListener()
- removeEventListener
- getElementById()
- querySelector()
- for Loop
- appendChild()
- createElement()
- if else statements
- forEach()
- constructor
- setInterval()
- render()
- renderWinner()
- renderCountdown()
- event.key (Key Property for keyboard interactions)

### 6. Stretch Goals:
- Add Audio
- replace player dot with an image 
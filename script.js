const canvas = document.getElementById("canvas1");
const score = document.getElementById("score");
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Global variables
const FPS = 10; // Frames per second
const SNAKE_SPD = 20;
const SNAKE_SIZE = 20;
const FOOD_SIZE = 20;
const FOOD_POINTS = 10;

// snake tail array
const snakeParts = [];
let tailLength = 1; // initial tail


var playerScore = -FOOD_POINTS;

var snake = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speedX: 0,
    speedY: 0    
}
var food = {
    x: null,
    y: null,
    isEaten: true
}
class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// set up event handlers
document.addEventListener("keydown", keyDown);

// Set up game loop
var intervalId = setInterval(update, 1000 / FPS);

function keyDown(/** @type {KeyboardEvent}  */ e) {
    switch(e.keyCode) {
        case 37: //left arrow (move left)
            if (snake.speedX > 0){
                break;
            }
            else {
                snake.speedX = -SNAKE_SPD;
                snake.speedY = 0;
                break;
            }
        case 38: // up arrow (move up)
            if (snake.speedY > 0){
                break;
            }
            else {
                snake.speedY = -SNAKE_SPD;
                snake.speedX = 0;
                break;
            }
        case 39: // right arrow (move right)
            if (snake.speedX < 0){
                break;
            }
            else {
                snake.speedX = SNAKE_SPD;
                snake.speedY = 0;
                break;
            }
        case 40: // down arrow (move down)
            snake.speedY = SNAKE_SPD;
            snake.speedX = 0;
            break;
    }
}
function isGameOver(){
    let gameOver = false;
    
    //check whether game has started
    if (snake.speedX === 0 && snake.speedY === 0) return false;

    for(let i = 0; i < snakeParts.length; i++){
        let part=snakeParts[i];
        if(part.x === snake.x && part.y === snake.y){//check whether any part of snake is occupying the same space
            gameOver=true;
            break; // to break out of for loop
        }
    }

    if(gameOver){
        ctx.fillStyle="white";
        ctx.font="50px verdana";
        ctx.fillText("Game Over! ", canvas.width / 2, canvas.height / 2);//position our text in center
        clearInterval(intervalId);
    }
}

function update() {

    // draw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas. height);

    // draw snake
    ctx.fillStyle = 'orange';
    ctx.fillRect(snake.x, snake.y, SNAKE_SIZE, SNAKE_SIZE);
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillStyle = 'white';
        ctx.fillRect(part.x, part.y, SNAKE_SIZE, SNAKE_SIZE);       
        }
    snakeParts.push(new snakePart(snake.x, snake.y));
    if (snakeParts.length > tailLength){
            snakeParts.shift();
    }

    // move snake
    snake.x += snake.speedX;
    snake.y += snake.speedY;

    // check for walls
    if (snake.x < 0) snake.x = 0;
    if (snake.y < 0) snake.y = 0;
    if (snake.x > canvas.width - SNAKE_SIZE) snake.x = canvas.width - SNAKE_SIZE;
    if (snake.y > canvas.height - SNAKE_SIZE) snake.y = canvas.height - SNAKE_SIZE;

    // draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE)
          
    if (food.isEaten) {
        let cols = canvas.width / FOOD_SIZE;
        let rows = canvas.height / FOOD_SIZE;
        food.x = Math.floor(Math.random() * cols) * FOOD_SIZE;
        food.y = Math.floor(Math.random() * rows) * FOOD_SIZE;
        food.isEaten = false;
        playerScore += FOOD_POINTS;
        score.innerHTML = "Score: " + playerScore;
        tailLength++;
                
    }

    // handle snake eating food
    if (Math.abs(snake.x - food.x) < FOOD_SIZE && Math.abs(snake.y - food.y) < FOOD_SIZE) {
        food.isEaten = true;
    }

    // handle death
    isGameOver();
    
    
    

}
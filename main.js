let blockSize = 25;
let total_row = 25;
let total_col = 25;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let score=0;
let highScore=0;

window.onload = function(){
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");
    highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
    document.getElementById("hidden-score").innerText = "Score: " + score;
    document.getElementById("high-score").innerText = "High-Score: "+ highScore;
    placeFood();
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 1000/10);
}
function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = "#9bc502";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "#ab1110";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        score++;
        document.getElementById("hidden-score").innerText = "Score: " + score;
        placeFood();
    }

    for(let i = snakeBody.length -1 ; i > 0 ; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle = "black";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    if(snakeX < 0 || snakeX>total_col*blockSize || snakeY<0 || snakeY>total_row*blockSize){
        gameOver=true;
        endGame();
    }
    for(let i=0; i<snakeBody.length;i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver=true;
            endGame();
        }
    }
}

function endGame() {
    gameOver = true;
    if(score>highScore){
        highScore=score;
        localStorage.setItem("highScore", highScore);
    }
    setTimeout(() => {
        location.reload();
    }, 500);
}
function changeDirection(e){
    if(e.code == "ArrowUp" && speedY == 0){
        speedX = 0;
        speedY = -1;
    }
    else if(e.code == "ArrowDown" && speedY == 0){
        speedX=0;
        speedY=1;
    }
    else if(e.code == "ArrowLeft" && speedX == 0){
        speedX= -1;
        speedY=0;
    }
    else if(e.code == "ArrowRight" && speedX == 0){
        speedX=1;
        speedY=0;
    }
}
function placeFood(){
    foodX=Math.floor(Math.random()*total_col)*blockSize;
    foodY=Math.floor(Math.random()*total_row)*blockSize;
}
const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speedX: 4,
    speedY: 4
};

let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - 30,
    width: 10,
    height: 60,
    dy: 0
};

let rightPaddle = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 30,
    width: 10,
    height: 60,
    dy: 0
};

let leftScore = 0;
let rightScore = 0;

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            leftPaddle.dy = -4;
            break;
        case 's':
            leftPaddle.dy = 4;
            break;
        case 'ArrowUp':
            rightPaddle.dy = -4;
            break;
        case 'ArrowDown':
            rightPaddle.dy = 4;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
        case 's':
            leftPaddle.dy = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            rightPaddle.dy = 0;
            break;
    }
});

// Ball appearance
function drawBall() {
    ctx.fillStyle = 'rgb(2, 9, 71)'; // Dark Blue color as per the website design
    ctx.shadowBlur = 1;
    ctx.shadowColor = "rgba(2, 9, 71, 0.5)"; // Adding a shadow for a bit of depth
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;  // Resetting shadow for other elements
}

// Paddle appearance
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = 'rgb(2, 9, 71)'; // Dark Blue color as per the website design
    ctx.fillRect(x, y, width, height);
}


function displayScore() {
    ctx.fillStyle = 'rgb(2, 9, 71)';
    ctx.font = '24px Arial';
    ctx.fillText(leftScore, canvas.width / 4, 30);
    ctx.fillText(rightScore, (3 * canvas.width / 4) - 10, 30);
}

function movePaddle(paddle) {
    paddle.y += paddle.dy;
    if (paddle.y < 0) paddle.y = 0;
    if ((paddle.y + paddle.height) > canvas.height) paddle.y = canvas.height - paddle.height;
}

function update() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.speedY *= -1;
    }

    if ((ball.x - ball.size < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) || 
        (ball.x + ball.size > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height)) {
        ball.speedX *= -1;
    }

    if (ball.x + ball.size > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX *= -1;
        leftScore += 1;
    }

    if (ball.x - ball.size < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX *= -1;
        rightScore += 1;
    }

    movePaddle(leftPaddle);
    movePaddle(rightPaddle);

    movePaddle(leftPaddle);
    computerAI();  // This is the new line for the computer AI
    movePaddle(rightPaddle);

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    displayScore();

    update();

    requestAnimationFrame(draw);
}

draw();


document.getElementById('gameModeButton').addEventListener('click', function() {
    const gameMode = document.body.classList.toggle('game-mode');
    if (gameMode) {
      this.textContent = "Exit Game Mode";
    } else {
      this.textContent = "Game Mode";
    }
  });
  
  // Handle the game mode styling and behavior
  document.body.classList.toggle('game-mode', false);
  

  function computerAI() {
    let paddleMid = rightPaddle.y + (rightPaddle.height / 2);
    
    // If the ball is below the middle of the paddle, move the paddle down.
    if (ball.y > paddleMid) {
        rightPaddle.dy = 2;
    } 
    // If the ball is above the middle of the paddle, move the paddle up.
    else if (ball.y < paddleMid) {
        rightPaddle.dy = -2;
    } 
    // Otherwise, don't move the paddle.
    else {
        rightPaddle.dy = 0;
    }
}

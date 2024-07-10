const newGameCanvas = document.getElementById('newCanvas');
const newCtx = newGameCanvas.getContext('2d');
newGameCanvas.width = window.innerWidth;
newGameCanvas.height = window.innerHeight;

const newPizzaImg = new Image();
newPizzaImg.src = 'piz.png';

const newPizza = {
    x: newGameCanvas.width / 2 - 50,
    y: newGameCanvas.height - 100,
    width: 100,
    height: 100,
    speed: 5,
    gravity: 0.2,
    velocityX: 0,
    velocityY: 0,
    moving: false
};

function drawNewPizza() {
    newCtx.drawImage(newPizzaImg, newPizza.x, newPizza.y, newPizza.width, newPizza.height);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        newPizza.velocityX = newPizza.speed;
        newPizza.moving = true;
    } else if (event.key === 'ArrowUp') {
        newPizza.y -= newPizza.speed;
    } else if (event.key === 'ArrowDown') {
        newPizza.y += newPizza.speed;
    }
});

function updateNewPizza() {
    if (newPizza.moving) {
        newPizza.velocityX -= newPizza.gravity;
    }
    newPizza.x += newPizza.velocityX;

    if (newPizza.x + newPizza.width > newGameCanvas.width) {
        window.location.href = "page2.html";
    }
    if (newPizza.x < 0) {
        newPizza.x = 0;
    }

    if (newPizza.y + newPizza.height > newGameCanvas.height) {
        newPizza.y = newGameCanvas.height - newPizza.height;
    }
    if (newPizza.y < 0) {
        newPizza.y = 0;
    }
}

function newGameLoop() {
    newCtx.clearRect(0, 0, newGameCanvas.width, newGameCanvas.height);
    updateNewPizza();
    drawNewPizza();
    requestAnimationFrame(newGameLoop);
}

newPizzaImg.onload = () => {
    newGameLoop();
};

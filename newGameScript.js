const newGameCanvas = document.getElementById('newGameCanvas');
const newCtx = newGameCanvas.getContext('2d');
newGameCanvas.width = window.innerWidth;
newGameCanvas.height = window.innerHeight;

const pizzaImg = new Image();
pizzaImg.src = 'piz.png';

const pizza = {
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

function drawPizza() {
    newCtx.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        pizza.velocityX = pizza.speed;
        pizza.moving = true;
    } else if (event.key === 'ArrowUp') {
        pizza.y -= pizza.speed;
    } else if (event.key === 'ArrowDown') {
        pizza.y += pizza.speed;
    }
});

function updatePizza() {
    if (pizza.moving) {
        pizza.velocityX -= pizza.gravity;
    }
    pizza.x += pizza.velocityX;

    if (pizza.x + pizza.width > newGameCanvas.width) {
        pizza.x = newGameCanvas.width - pizza.width;
    }
    if (pizza.x < 0) {
        pizza.x = 0;
    }

    if (pizza.y + pizza.height > newGameCanvas.height) {
        pizza.y = newGameCanvas.height - pizza.height;
    }
    if (pizza.y < 0) {
        pizza.y = 0;
    }
}

function gameLoop() {
    newCtx.clearRect(0, 0, newGameCanvas.width, newGameCanvas.height);
    updatePizza();
    drawPizza();
    requestAnimationFrame(gameLoop);
}

pizzaImg.onload = () => {
    setTimeout(() => {
        document.getElementById('congratsMessage').style.display = 'none';
        newGameCanvas.style.display = 'block';
        gameLoop();
    }, 5000);
};

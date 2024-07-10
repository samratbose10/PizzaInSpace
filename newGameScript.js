const newGameCanvas = document.getElementById('newGameCanvas');
const newCtx = newGameCanvas.getContext('2d');
newGameCanvas.width = window.innerWidth;

const pizzaImg = new Image();
pizzaImg.src = 'piz.png';

const pizza = {
    x: newGameCanvas.width / 2 - 50,
    y: newGameCanvas.height - 500,
    width: 100,
    height: 100,
    speed: 2,
    gravity: 0.5,
    velocity: 0
};

function drawPizza() {
    newCtx.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
}

document.addEventListener('keydown',  => {
    if (event.key === 'ArrowRight') {
        pizza.velocity = -pizza.speed; 
    }
});

function updatePizza() {
    pizza.velocity += pizza.gravity;
    pizza.x += pizza.velocity;

    if (pizza.x + pizza.width > newGameCanvas.width) {
        pizza.x = newGameCanvas.width - pizza.width; 
    }
    if (pizza.x < 0) {
        pizza.x = 0; 
    }
}

function gameLoop() {
    newCtx.clearRect(0, 0, newGameCanvas.width, newGameCanvas.height);
    updatePizza();
    drawPizza();

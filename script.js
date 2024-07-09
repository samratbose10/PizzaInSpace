const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pizzaImg = new Image();
pizzaImg.src = 'piz.png';

const pizza = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 100,
    speed: 5
};

const stars = [];
const starCount = 100;
const asteroids = [];
const asteroidCount = 10;

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 1
    });
}

for (let i = 0; i < asteroidCount; i++) {
    asteroids.push({
        x: Math.rndom() * canvas.width,
        y: Math.random() * canvas.height,
        width: 50,
        height: 50,
        speed: Math.random() * 3 + 2
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        pizza.x -= pizza.speed;
    } else if (event.key === 'ArrowRight') {
        pizza.x += pizza.speed;
    }
});

function drawPizza() {
    ctx.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
}

function drawStars() {
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawPizza();
    drawAsteroids();
    requestAnimationFrame(gameLoop);
}

pizzaImg.onload = () => {
    gameLoop();
};

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('landingPage').style.display = 'none';
    canvas.style.display = 'block';
});

window.onload = () => {
    setTimeout(() => {
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('startButton').style.animation = 'fadeIn 2s forwards';
    }, 3000);
};

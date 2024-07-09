const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pizzaImg = new Image();
pizzaImg.src = 'piz.png';

const asteroidImg = new Image();
asteroidImg.src = 'astro.png';

const pizza = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 100,
    height: 100,
    speed: 5
};

const stars = [];
const starCount = 100;
const asteroids = [];
const asteroidCount = 10;
let asteroidsActive = false;
let gameStarted = false;

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
        x: Math.random() * canvas.width,
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
}

function drawAsteroids() {
    if (asteroidsActive) {
        asteroids.forEach(asteroid => {
            ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, asteroid.width, asteroid.height);
            asteroid.y += asteroid.speed;
            if (asteroid.y > canvas.height) {
                asteroid.y = 0;
                asteroid.x = Math.random() * canvas.width;
            }
            if (
                pizza.x < asteroid.x + asteroid.width &&
                pizza.x + pizza.width > asteroid.x &&
                pizza.y < asteroid.y + asteroid.height &&
                pizza.height + pizza.y > asteroid.y
            ) {
                document.getElementById('gameOverPage').style.display = 'flex';
                canvas.style.display = 'none';
                asteroidsActive = false;
                gameStarted = false;
            }
        });
    }
}

function drawTimer(timeLeft) {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Time left: ${timeLeft}`, 10, 30);
}

let timeLeft = 25;
function countdown() {
    if (timeLeft > 0) {
        timeLeft -= 1;
        setTimeout(countdown, 1000);
    } else {
        asteroidsActive = false;
    }
}

function startAsteroids() {
    asteroidsActive = true;
    countdown();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawPizza();
    drawAsteroids();
    if (gameStarted) {
        drawTimer(timeLeft);
    }
    requestAnimationFrame(gameLoop);
}

pizzaImg.onload = () => {
    gameLoop();
};

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('landingPage').style.display = 'none';
    canvas.style.display = 'block';
    gameStarted = true;
    setTimeout(startAsteroids, 5000);
});

document.getElementById('restartButton').addEventListener('click', () => {
    document.getElementById('gameOverPage').style.display = 'none';
    document.getElementById('landingPage').style.display = 'flex';
    timeLeft = 25;
    asteroidsActive = false;
    gameStarted = false;
    resetAsteroids();
    canvas.style.display = 'none';
});

function resetAsteroids() {
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].x = Math.random() * canvas.width;
        asteroids[i].y = Math.random() * canvas.height;
    }
}

window.onload = () => {
    setTimeout(() => {
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('startButton').style.animation = 'fadeIn 2s forwards';
    }, 3000);
};

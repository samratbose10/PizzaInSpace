const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let selectedPizza = 'piz1.png';

const pizzaImg = new Image();
pizzaImg.src = selectedPizza;

const asteroidImg = new Image();
asteroidImg.src = 'astro.png';

const pizza = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 100,
    height: 100,
    speed: 5,
    element: document.createElement('div')
};

const stars = [];
const starCount = 100;
const asteroids = [];
const asteroidCount = 10;
let asteroidsActive = false;
let gameStarted = false;
let gameOver = false;

const backgroundMusic = document.getElementById('backgroundMusic');

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
        y: Math.random() * (canvas.height / 2),
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
        if (!gameOver) {
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
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
                gameOver = true;
                asteroidsActive = false;
                document.getElementById('gameOverMessage').style.display = 'block';
                triggerGameOverAnimation();
                setTimeout(() => {
                    window.location.reload();
                }, 10000);
            }
        });
    }
}

function triggerGameOverAnimation() {
    pizza.element.style.position = 'absolute';
    pizza.element.style.left = pizza.x + 'px';
    pizza.element.style.top = pizza.y + 'px';
    pizza.element.style.width = pizza.width + 'px';
    pizza.element.style.height = pizza.height + 'px';
    pizza.element.style.backgroundImage = `url(${pizzaImg.src})`;
    pizza.element.style.backgroundSize = 'cover';
    pizza.element.style.animation = 'gameOverAnimation 2s forwards';
    document.body.appendChild(pizza.element);
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
        displaySuccessMessage();
    }
}

function displaySuccessMessage() {
    document.getElementById('successMessage').style.display = 'flex';
    const successText = document.getElementById('successText');
    successText.innerHTML = "Yayy, I survived itttttt....";
    setTimeout(() => {
        window.location.href = "success.html";
    }, 5000);
}

function startAsteroids() {
    asteroidsActive = true;
    resetAsteroids();
    countdown();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    if (!gameOver) {
        drawPizza();
    }
    drawAsteroids();
    if (gameStarted && !gameOver) {
        drawTimer(timeLeft);
    }
    requestAnimationFrame(gameLoop);
}

pizzaImg.onload = () => {
    gameLoop();
};

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('characterSelection').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('startButton').style.animation = 'fadeIn 2s forwards';
    }, 3000);
});

document.querySelectorAll('.pizza-option').forEach(option => {
    option.addEventListener('click', (e) => {
        document.querySelectorAll('.pizza-option').forEach(option => option.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedPizza = e.target.getAttribute('data-pizza');
    });
});

document.getElementById('confirmButton').addEventListener('click', () => {
    if (selectedPizza) {
        pizzaImg.src = selectedPizza;
        document.getElementById('characterSelection').style.display = 'none';
        canvas.style.display = 'block';
        gameStarted = true;
        backgroundMusic.play();
        setTimeout(startAsteroids, 5000);
    } else {
        alert("Please select a pizza character.");
    }
});

function resetAsteroids() {
    asteroids.forEach(asteroid => {
        asteroid.x = Math.random() * canvas.width;
        asteroid.y = Math.random() * (canvas.height / 2);
    });
}

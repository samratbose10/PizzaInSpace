const pizza = document.getElementById('pizza');
let position = { left: window.innerWidth / 2 - 50, top: window.innerHeight / 2 - 50 };

function updatePosition() {
    pizza.style.left = `${position.left}px`;
    pizza.style.top = `${position.top}px`;
}

function movePizza(event) {
    const step = 20;
    if (event.key === 'ArrowUp') {
        position.top = Math.max(0, position.top - step);
    } else if (event.key === 'ArrowDown') {
        position.top = Math.min(window.innerHeight - 100, position.top + step);
    } else if (event.key === 'ArroLeft') {
        position.left = Math.max(0, position.left - step);
    } else if (event.key === 'ArrowRight') {
        position.left = Math.min(window.innerWidth - 100, position.left + step);
    }
    updatePosition();
}

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `0px`;
    document.body.appendChild(star);
    return star;
}

function moveStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        let top = parseInt(star.style.top);
        if (top > window.innerHeight) {
            star.remove();
        } else {
            star.style.top = `${top + 5}px`;
        }
    });
}

window.addEventListener('keydown', movePizza);
updatePosition();
generateStars();
setInterval(moveStars, 50);

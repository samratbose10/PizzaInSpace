document.addEventListener('DOMContentLoaded', function() {
    const pizza = document.getElementById('pizza');
    const starsContainer = document.getElementById('stars-container');
    let pizzaX = window.innerWidth / 2 - pizza.offsetWidth / 2;
    let pizzaY = window.innerHeight / 2 - pizza.offsetHeight / 2;

    pizza.style.left = pizzaX + 'px';
    pizza.style.top = pizzaY + 'px';

    function movePizza(event) {
        const step = 10;
        switch (event.key) {
            case 'ArrowUp':
                if (pizzaY > 0) {
                    pizzaY -= step;
                }
                break;
            case 'ArrowDown':
                if (pizzaY < window.innerHeight - pizza.offsetHeight) {
                    pizzaY += step;
                }
                break;
            case 'ArrowLeft':
                if (pizzaX > 0) {
                    pizzaX -= step;
                }
                break;
            case 'ArrowRight':
                if (pizzaX < window.innerWidth - pizza.offsetWidth) {
                    pizzaX += step;
                }
                break;
        }
        pizza.style.left = pizzaX + 'px';
        pizza.style.top = pizzaY + 'px';
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = '0px';
        starsContainer.appendChild(star);

        const starAnimation = star.animate([
            { transform: `translateY(${window.innerHeight}px)` }
        ], {
            duration: Math.random() * 2000 + 2000, 
            easing: 'linear'
        });

        starAnimation.onfinish = () => {
            star.remove();
        };
    }

    function generateStars() {
        createStar();
        setTimeout(generateStars, Math.random() * 100); 
    }

    generateStars();
    window.addEventListener('keydown', movePizza);
});

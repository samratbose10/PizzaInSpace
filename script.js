document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('intro-text');
    const buttonElement = document.getElementById('continue-btn');
    const text = "Hey I'm on a mission";
    let index = 0;

    function typeText() {
        if (index < text.length) {
            textElement.innerHTML = text.substring(0, index + 1) + '<span class="cursor">|</span>';
            index++;
            setTimeout(typeText, 150);
        } else {
            textElement.innerHTML = text;
            buttonElement.classList.remove('hidden');
        }
    }

    typeText();
});

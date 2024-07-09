document.addEventListener('DOMContentLoaded', function() {
    const storyText = "Welcome to the adventure. Your journey begins now...";
    const textElement = document.getElementById('story-text');
    const cursorElement = document.getElementById('cursor');
    const continueBtn = document.getElementById('continue-btn');
    
    let index = 0;

    function typeWriter() {
        if (index < storyText.length) {
            textElement.innerHTML += storyText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            cursorElement.style.display = 'none';
            continueBtn.classList.add('show');
        }
    }

    typeWriter();

    continueBtn.addEventListener('click', function() {

        window.location.href = 'nextpage.html'; 
    });
});

let button = document.getElementById('startButton');
const homeSection = document.getElementById('home');
const mainContent = document.getElementById('mainContent');

button.addEventListener('click', function() {

    // Animate out the home section
    homeSection.classList.add('hidden');
    mainContent.classList.add('visible');

    // After the transition, make the main content visible
    setTimeout(() => {
        mainContent.classList.remove('hidden');
    }, 500); // Match this duration to the CSS transition duration
});

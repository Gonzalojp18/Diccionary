let button = document.getElementById('startButton');
const homeSection = document.getElementById('home');
const mainContent = document.getElementById('mainContent');
const back = document.getElementById('back');

const showMainContent = () => {
    homeSection.classList.add('hidden');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('none')
}

const backHome = () => {
    homeSection.classList.remove('hidden');
    mainContent.classList.remove('none');
    mainContent.classList.add('hidden');
}

button.addEventListener('click', showMainContent);
back.addEventListener('click', backHome);

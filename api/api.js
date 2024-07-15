const cardWord = document.getElementById('cardWords');
let wordInput = document.getElementById('word');
const notification = document.getElementById('notification');

// Función asíncrona para obtener la palabra de la API junto con datos adicionales
const fetchWordFromAPI = async (word) => {
    const APIurl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    const url = `${APIurl}${word}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        const { word, phonetic, phonetics, meanings } = data[0];
        const captureIPA = phonetic || 'N/A';
        const captureSounds = phonetics.find(p => p.audio && p.audio.trim())?.audio || '';
        const captureMeaning = meanings[0].definitions[0].definition || 'N/A';

        return {
            word,
            captureIPA,
            captureSounds,
            captureMeaning,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        if (error.message === 'Network response was not ok') {
            showNotification('Word not found. Please check the spelling and try again.');
        } else {
            showNotification('An error occurred. Please try again later.');
        }
        return null;
    }
}



// Función para manejar el valor de entrada y almacenar en localStorage
const getValue = async () => {
    word = wordInput.value;
    if (!word) {
        showNotification('Please enter a word.');
        return;
    }
    const fetchedData = await fetchWordFromAPI(word);
    if (fetchedData) {
        let listFavoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        listFavoriteWords.push(fetchedData);
        localStorage.setItem('favoriteWords', JSON.stringify(listFavoriteWords));
        takeValue(fetchedData);
    }
}

// Función para mostrar notificaciones al usuario
const showNotification = (message) => {
    notification.innerHTML = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Ocultar la notificación después de 3 segundos
}

// Función para crear y mostrar la tarjeta con la palabra y los datos adicionales
const takeValue = (data) => {
    const { word, captureIPA, captureSounds, captureMeaning } = data;
    const showCard = document.createElement('div');
    showCard.innerHTML = `
    <div class="cardWords">
        <div class="cardText">
            <h4>${word}</h4>
                <div class="fonetic">
                    <p>${captureIPA}</p>
                        ${captureSounds ? `
                        <button class="audio-button" onclick="playAudio('${captureSounds}')">
                        <i class='bx bx-play-circle' ></i>
                        </button>
                        ` : '<p>No audio available</p>'}
                </div>
                <p class="definitions">${captureMeaning}</p>
        </div>
        <div class="iconAction" >
                <button class="btn" onclick="addFavorite('${word}')"><box-icon name='star' type='solid' ><i class='bx bxl-star' ></i></box-icon></button>
                <button class="btn" onclick="deleteWord(this)"><box-icon name='trash' type='solid' ><i class='bx bxl-trash'></i></box-icon></button>
        </div>
    </div>`;
        cardWord.appendChild(showCard);
}

// Función para agregar una palabra a favoritos
const addFavorite = (word) => {
    let favoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
    if (!favoriteWords.some(favWord => favWord.word === word)) {
        const wordData = favoriteWords.find(favWord => favWord.word === word);
        if (wordData) {
            let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
            favoriteList.push(wordData);
            localStorage.setItem('favorites', JSON.stringify(favoriteList));
            showNotification(`${word} added to favorites.`);
        }
    } else {
        showNotification(`${word} is already in favorites.`);
    }
}

const deleteWord = (button) => {
    const card = button.closest('.cardWords');
    if (card) {
        card.remove();
    } else {
        console.error('Element with class .cardWords not found');
    }
}

const clearInput = () => {
    wordInput.value = ' ';
}

// Función para reproducir el audio
const playAudio = (src) => {
    const audio = new Audio(src);
    audio.play();
}

// Event listener para el submit del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getValue();
    clearInput();
});

// Event listener para la tecla Enter en el formulario
form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getValue();
        clearInput();
    }
});


// Mostrar las palabras al cargar la página
document.addEventListener('DOMContentLoaded', getValue);
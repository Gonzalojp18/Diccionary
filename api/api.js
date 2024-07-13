const cardWord = document.getElementById('cardWords');
let wordInput = document.getElementById('word');

//
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
        return null;
    }
}

// Función para manejar el valor de entrada y almacenar en localStorage
const getValue = async () => {
    const word = wordInput.value;
    const fetchedData = await fetchWordFromAPI(word);
    if (fetchedData) {
        let listFavoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        listFavoriteWords.push(fetchedData);
        localStorage.setItem('favoriteWords', JSON.stringify(listFavoriteWords));
        takeValue(fetchedData);
    }
}

// Función para crear y mostrar la tarjeta con la palabra y los datos adicionales
const takeValue = (data) => {
    const { word, captureIPA, captureSounds, captureMeaning } = data;
    const card = document.createElement('div');
    card.innerHTML = `
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
                <button class="btn" onclick="deleteWord(this)"><box-icon name='star' type='solid' ><i class='bx bxl-star' ></i></box-icon></button>
                <button class="btn" onclick="addFavorite('${word}')"><box-icon name='trash' type='solid' ><i class='bx bxl-trash'></i></box-icon></button>
        </div>
    </div>`;
        cardWord.appendChild(card);
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

// Función para eliminar una palabra
const deleteWord = (button) => {
    const card = button.parentElement.parentElement;
    const word = card.querySelector('.favoriteWord').innerText;
    let listFavoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
    listFavoriteWords = listFavoriteWords.filter(favoriteWord => favoriteWord.word !== word);
    localStorage.setItem('favoriteWords', JSON.stringify(listFavoriteWords));
    card.remove();
}

const clearInput = () => {
    wordInput.value = '';
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
document.addEventListener('DOMContentLoaded', fetchWordFromAPI);
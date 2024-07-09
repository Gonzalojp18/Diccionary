const form = document.getElementById('form');
let wordInput = document.getElementById('word');

//
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
        const capturePartOfSpeech = meanings[0].partOfSpeech || 'N/A';
        const captureSounds = data.forEach(element => {
            element.phonetics.filter(element => {
                const audio = element.audio != "";
                return audio;
            })
            
        });
        const captureMeaning = meanings[0].definitions[0].definition || 'N/A';
        const captureSynonyms = meanings[0].synonyms || [];
        const captureAntonyms = meanings[0].antonyms || [];

        return {
            word,
            captureIPA,
            captureSounds,
            captureMeaning,
            captureSynonyms,
            captureAntonyms,
            capturePartOfSpeech,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const getValue = async () => {
    const word = wordInput.value;
    const fetchedData = await fetchWordFromAPI(word);
    if (fetchedData) {
        let listFavoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        listFavoriteWords.push(fetchedData);
        localStorage.setItem('favoriteWords', JSON.stringify(listFavoriteWords));
        console.log(listFavoriteWords);
        takeValue(fetchedData);
    }
}

const takeValue = (data) => {
    const { word, captureIPA, captureSounds, captureMeaning } = data;
    const card = document.createElement('div');
    card.style.height = 'auto';
    card.style.width = "20vw";
    card.innerHTML = `
        <div class="card d-flex flex-column rounded-1 g-2" data-order="1">
            <p class="w-100 p-2 favoriteWord">${word}</p>
            <p class="w-100 p-2 phoneticText">${captureIPA}</p>
            ${captureSounds ? `<audio controls src="${captureSounds}" class="w-100 p-2"></audio>` : ''}
            <p class="definitions p-2">${captureMeaning}</p>
            <button class="mt-5 btn btn-dark" onclick="deleteWord(this)">Delete</button>
        </div>`;
        form.appendChild(card);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getValue();
});

form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getValue();
    }
});

// Mostrar las palabras al cargar la página
document.addEventListener('DOMContentLoaded', fetchWordFromAPI);
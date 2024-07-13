
const form = document.getElementById('form');
let wordInput = document.getElementById('word');

<<<<<<< HEAD
//Here get the input value and that way can get the value using anothe event
const takeValue = () =>{
    word = document.getElementById('word').value;
    const card = document.createElement('div');
    card.style.height = '25vh';
    card.style.width = "20vw";
    card.innerHTML = `
                    <div class="d-flex flex-column rounded-1 ">
                        <p class="fs-2">${word}</p>
                        <div class="d-flex w-100 justify-content-between ">
                        <button id="save" class=" btn btn-warning">Add to Favorite</button>
                        <button class=" btn btn-dark">Delete</button>
                        </div>
                    `;
    const fieldWork = document.getElementById('fieldWord');
    fieldWork.appendChild(card);
=======
// Función asíncrona para obtener la palabra de la API junto con datos adicionales
const fetchWordFromAPI = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const { word: fetchedWord, phonetics, meanings } = data[0];
        const phoneticText = data[0].phonetics?.text || '';
        const phoneticAudio = data[0].phonetics?.audio || '';
        const definitions = meanings.slice(0, 3).map(meaning => {
            return {
                partOfSpeech: meaning.partOfSpeech,
                details: meaning.definitions.slice(0, 2).map(def => ({
                    definition: def.definition,
                    example: def.example || 'No example available' 
                }))
            };
        });
        return {
            word: fetchedWord,
            phoneticText,
            phoneticAudio,
            definitions
        };
    } catch (error) {
        console.error('Fetch error: ', error);
        return null;
    }
>>>>>>> siriusBack
}

// Función para manejar el valor de entrada y almacenar en localStorage
const inValue = async () => {
    const word = wordInput.value;
    const fetchedData = await fetchWordFromAPI(word);
    if (fetchedData) {
        let listFavoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        listFavoriteWords.push(fetchedData);
        console.log(listFavoriteWords);
        takeValue(fetchedData);
    }
}

// Función para crear y mostrar la tarjeta con la palabra y los datos adicionales
const takeValue = (data) => {
    const { word, phoneticText, phoneticAudio, definitions } = data;
    const card = document.createElement('div');
    card.style.height = 'auto';
    card.style.width = "20vw";
    const definitionsHTML = definitions.map(def => {
        const detailsHTML = def.details.map(detail => `
            <p><strong>${def.partOfSpeech}</strong>: ${detail.definition}
            </p>${detail.example ? `<p class="example">Example: ${detail.example}</p>` : ''}
        `).join('');
        return `<div class="definition">${detailsHTML}</div>`;
    }).join('');

    card.innerHTML = `
        <div class="card d-flex flex-column rounded-1 g-2" data-order="1">
            <p class="w-100 p-2 favoriteWord">${word}</p>
            <p class="w-100 p-2 phoneticText">${phoneticText}</p>
            ${phoneticAudio ? `<audio controls src="${phoneticAudio}" class="w-100 p-2"></audio>` : ''}
            <p class="definitions p-2">${definitionsHTML}</p>
            <button class="mt-5 btn btn-dark" onclick="deleteWord(this)">Delete</button>
        </div>`;
    form.appendChild(card);
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

// Event of my form where Im getting this value for the first time
form.addEventListener('submit',(e) => {
    e.preventDefault();
    inValue();
});

form.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        inValue();
    }
});

<<<<<<< HEAD

// const inValue = () =>{
//     word = document.getElementById('word').value;
//     localStorage.setItem('word', word);
// }

// const btnSave = document.getElementById('save');
// btnSave.addEventListener('click', (e) =>{
//     e.preventDefault();
//     console.log(btnSave);
//     saveWord();
// })


// Save word like one favorite word
// const saveWord = () => {
//     const listWord = localStorage.getItem('word');
//     console.log(listWord)
//     const newWord = document.createElement('div');
//     console.log(newWord);
//     newWord.innerHTML = `<p>${listWord}</p>`;
//     const favoriteWord = document.querySelector('.saveWords')
//     favoriteWord.appendChild(newWord);
// }



=======
// Mostrar las palabras al cargar la página
document.addEventListener('DOMContentLoaded', inValue);
>>>>>>> siriusBack

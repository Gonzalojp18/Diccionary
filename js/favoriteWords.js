// // capture the value inside my new element with another button
// const btnSave = () =>{
//     const btnSave = document.getElementById('save');
//     btnSave.addEventListener('click', (e) =>{
//     e.preventDefault();
//     saveWord();
// })
// }

// // Save word like one favorite word using the preview event
// const saveWord = () => {
//     const listWord = localStorage.getItem('word');

//     const index = listFavoriteWords.indexOf(listWord);

//     if(index === -1){
//         listFavoriteWords.push(listWord);
//         console.log(listFavoriteWords);
//         const newWord = document.createElement('div');
//         console.log("soy el div dentro de la funcion que me guarda fav " + newWord);
//         newWord.innerHTML = `<p>${listWord}</p>`;
//         const favoriteWord = document.querySelector('.saveWords');
//         favoriteWord.appendChild(newWord);
//     }else{
//         alert('This word is already in your favorite list')
//     }

// localStorage.setItem('favorites', JSON.stringify(listFavoriteWords));

// }
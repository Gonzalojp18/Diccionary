
const form = document.getElementById('form');
let word = document.getElementById('word');

//Here get the input value and that way can get the value using anothe event
const takeValue = () =>{
    word = document.getElementById('word').value;
    const li = document.createElement('li');
    li.innerHTML = `
                    <p>${word}</p>
                    `;
    const fieldWork = document.getElementById('fieldWord');
    fieldWork.appendChild(li);

}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    takeValue();
    inValue();
});

form.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        takeValue();
        inValue();
    }
});


const inValue = () =>{
    word = document.getElementById('word').value;
    localStorage.setItem('word', word);
}


// Save word like one favorite word
const saveWord = () => {
    const listWord = localStorage.getItem('word');
    console.log(listWord)
    const newWord = document.createElement('div');
    console.log(newWord);
    newWord.innerHTML = `<p>${listWord}</p>`;
    const favoriteWord = document.querySelector('.saveWords')
    favoriteWord.appendChild(newWord);
}

saveWord();



// const btnSave = document.getElementById('save');
// btnSave.addEventListener('click', (e) =>{
//     e.preventDefault();
//     saveWord();
// })



const form = document.getElementById('form');
let word = document.getElementById('word');

//Here get the input value and that way can get the value using anothe event
const takeValue = () =>{
    word = document.getElementById('word').value;
    const card = document.createElement('div');
    card.style.height = '25vh';
    card.style.width = "20vw";
    card.innerHTML = `
                        <div class="container card w-100 h-100 g-2">
                            <div class="card-body">
                                <h5>${word}</h5>
                            </div>
                            <div class="d-flex">
                                <button>add</button>
                                <button>Delete</button>
                            </div>
</div>
                    `;
    const fieldWork = document.getElementById('fieldWord');
    fieldWork.appendChild(card);
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

const btnSave = document.getElementById('save');
btnSave.addEventListener('click', (e) =>{
    e.preventDefault();
    console.log(btnSave);
    saveWord();
})


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




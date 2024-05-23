
const form = document.getElementById('form');
let word = document.getElementById('word');

//Here get the input value and that way can get the value using anothe event
const takeValue = () =>{
    word = document.getElementById('word').value;
    const li = document.createElement('li');
    li.innerHTML = `<li>${word}</li>`;
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
    console.log("este es la palabra desde el metodo invalue " + word)
    localStorage.setItem('word', word);
    localStorage.getItem('word');
}

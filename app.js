
const form = document.getElementById('form');

//Here get the input value and that way can get the value using anothe event
const takeValue = () =>{
    const word = document.getElementById('word').value;
    const li = document.createElement('li');
    li.innerHTML = `<li>${word}</li>`;
    const fieldWork = document.getElementById('fieldWord');
    fieldWork.appendChild(li);
}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    takeValue();
});

form.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        takeValue();
    }
});
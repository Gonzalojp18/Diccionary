
const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Capturo el valor del input
    const word = document.getElementById('word').value;
    const fieldWork = document.getElementById('fieldWord');
    const li = document.createElement('li');
    li.innerHTML = `<li>${word}</li>`;
    fieldWork.appendChild(li);

    console.log(word);
});

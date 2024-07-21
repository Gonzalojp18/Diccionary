let infoApp = document.getElementById('info');
console.log(infoApp);
let details = document.querySelector('.details');

infoApp.addEventListener("click", function() {
    details.classList.toggle('active');
});


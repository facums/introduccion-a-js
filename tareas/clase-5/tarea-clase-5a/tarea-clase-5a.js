//TAREA: En otro archivo html (no Index) y otro archivo js (no tarea-clase-5.js),
// creá un formulario que capture el primer nombre, segundo nombre, apellido/s y edad del usuario
// también vamos a crear un <h1> que diga Bienvenido!
// vas a crear un botón de acción que una vez que lo apretás, va a
// mostrar toda la información junta en un campo de texto
// Y va a cambiar el <h1> para decir "Bienvenido, nombreDeUsuario"!


const $submitButton = document.querySelector('#submit-button');
const $refreshPageButton = document.querySelector('#refresh-page-button');

function getUserData(){
    const user = {firstName: '', secondName: '', lastName: '', age: 0};

    user.firstName = document.querySelector('#user-first-name').value;
    user.secondName = document.querySelector('#user-second-name').value;
    user.lastName = document.querySelector('#user-last-name').value;
    user.age = document.querySelector('#user-age').value;

    return user;
}

$submitButton.onclick = function() {
    const $welcomeTitle = document.querySelector('#welcome-title');
    const $showButton = document.querySelector('#show-button');
    const $displayText = document.querySelector('#text-display');
    const currentUser = getUserData();

    if(!currentUser.firstName || !currentUser.secondName || !currentUser.lastName || !currentUser.age) return;

    $welcomeTitle.textContent = `Welcome ${currentUser.firstName}!`;
    $showButton.hidden = false;

    $showButton.onclick = function(){
        $submitButton.disabled = true;
        $displayText.hidden = false;
        $displayText.value = `Full name: ${currentUser.firstName} ${currentUser.secondName} ${currentUser.lastName}, Age: ${currentUser.age}`;
        return false;
    }

    return false;
}

$refreshPageButton.onclick = function(){
    document.location.reload(true);
}
//TAREA: En otro archivo html (no Index) y otro archivo js (no tarea-clase-5.js),
// creá un formulario que capture el primer nombre, segundo nombre, apellido/s y edad del usuario
// también vamos a crear un <h1> que diga Bienvenido!
// vas a crear un botón de acción que una vez que lo apretás, va a
// mostrar toda la información junta en un campo de texto
// Y va a cambiar el <h1> para decir "Bienvenido, nombreDeUsuario"!


const $buttonSubmit = document.querySelector('#button-submit');
const $buttonShow = document.querySelector('#button-show');
const userIds = ['#user-first-name', '#user-second-name', '#user-surname', '#user-age'];

$buttonSubmit.onclick = function() {

    const userData = userIds.map(function(id){   
        return document.querySelector(id).value;
    });

    document.querySelector('h1').textContent = `Bienvenido ${userData[0]}!`;

    $buttonShow.onclick = function(){
        document.querySelector('#display-text').value = userData;
        return false;
    }

    return false;
}

const $buttonSubmit = document.querySelector('#button-submit');
const $buttonShow = document.querySelector('#button-show');
const userIds = ['#user-first-name', '#user-second-name', '#user-surname', '#user-age'];
$buttonSubmit.onclick = function() {

    const userData = userIds.map(function(id){   
        return document.querySelector(id).value;
    });

    document.querySelector('h1').textContent = `Bienvenido ${userData[0]}!`;

    return false;
}

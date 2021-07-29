const $submit = document.querySelector('#btn-submit');
const $show = document.querySelector('#btn-show');
const $refresh = document.querySelector('#btn-refresh');

function getUserData(){
    return {
        firstName: document.querySelector('#user-first-name').value,
        secondName: document.querySelector('#user-second-name').value, 
        lastName: document.querySelector('#user-last-name').value,
        age: document.querySelector('#user-age').value
    }
}

function isUserInvalid(user){
    return (!user.firstName || !user.secondName || !user.lastName || !user.age);
}

function showElement(element){
    element.removeAttribute('hidden');
}

function hideElement(element){
    element.hidden = true;
}

function disableElement(element){
    element.disabled = true;
}

$submit.onclick = function() {
    const $welcomeTitle = document.querySelector('#welcome-title');
    const user = getUserData();

    if(isUserInvalid(user)) return;
    $welcomeTitle.textContent = `Welcome ${user.firstName}!`;
    showElement(document.querySelector('#btn-show'));

    return false;
}

$show.onclick = function(){
    const $userData = document.querySelector('#user-data-display');
    const user = getUserData();

    disableElement(document.querySelector('#btn-show'));
    showElement(document.querySelector('#user-data-display'));
    $userData.value = `Full name: ${user.firstName} ${user.secondName} ${user.lastName}, Age: ${user.age}`;

    return false;
}

$refresh.onclick = function(){
    document.location.reload(true);
}
const $addButton = document.querySelector('#add-button');
const $deleteButton = document.querySelector('#delete-button');
const $submitButton = document.querySelector('#submit-button');
const $resetButton = document.querySelector('#reset-button');


$addButton.onclick = function(){

    const $template = document.querySelector('.template');
    let $clone = $template.cloneNode(true);             // create clone node
    let $aux = $clone.getElementsByTagName('input');  // auxiliar variable for all inputs within <form>


    for(let i=0; i < $aux.length; i++){ // set fields default, because to clone with function cloneNode() copies the inside content
        $aux[i].value = '';
    }
    
    document.querySelector('.time-calculator-form').appendChild($clone);    // append to <form>
  
    return false;
}


$deleteButton.onclick = function(){

    const $template = document.querySelectorAll('.template');
    
    if($template.length > 1){
        $template[$template.length-1].remove();
    }

    return false
}


$submitButton.onclick = function(){

    const time = calculate();
    document.querySelector('#timer').textContent = `${time[0]} hour(s), ${time[1]} minute(s), ${time[2]} second(s)`;    // update the value in <h3>
    
    return false;
}


$resetButton.onclick = function(){

    if(window.confirm('Do you really want to reset?')){ 
        document.location.reload(true); // reload page 
    }

    return false;
}


// function that take the inputs from fields and returns an array with the sum of time

function calculate(){

    const $template = document.querySelectorAll('.template');
    const $hoursArray = document.querySelectorAll('.hours-input');
    const $minutesArray = document.querySelectorAll('.minutes-input');
    const $secondsArray = document.querySelectorAll('.seconds-input');

    let hours = 0;
    let minutes = 0;
    let seconds = 0;


    for(let i=0; i < $template.length; i++){
        hours += Number($hoursArray[i].value);
        minutes += Number($minutesArray[i].value);
        seconds += Number($secondsArray[i].value);
    }


    while(seconds >= 60){
        minutes++;
        seconds -= 60;
    }
    while(minutes >= 60){
        hours++;
        minutes -= 60;
    }

    return [hours,minutes,seconds];
}
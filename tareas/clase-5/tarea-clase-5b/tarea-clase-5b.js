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



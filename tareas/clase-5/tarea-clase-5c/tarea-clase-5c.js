const $createButton = document.querySelector('#create-button');


function getRandomInteger(min,max){
    return parseInt((Math.random() * (max - min + 1)), 10) + min;
}

function quickSort(array){
    if(array.length == 0){
        return [];
    }

    let left = [];
    let right = [];
    let pivot = array[0];

    for(let i=1; i < array.length; i++){
        if(array[i] <= pivot){
            left.push(array[i]);
        }else{
            right.push(array[i]);
        }
    }

    return [].concat(quickSort(left), pivot, quickSort(right));
}

function average(){
    const $items = document.getElementById('list-random-number').querySelectorAll(':scope > li');
    const $text = document.querySelector('#em-average-number');
    let total = 0;

    for(let i=0; i < $items.length; i++){
        total += Number($items[i].textContent);
    }

    $text.textContent += (total / $items.length).toFixed(2);
}

function smaller(){
    const $items = document.getElementById('list-random-number').querySelectorAll(':scope > li');
    const $text = document.querySelector('#em-smaller-number');
    let smaller = Number($items[0].textContent);

    for(let i=0; i < $items.length; i++){
        if(Number($items[i].textContent) < smaller){
            smaller = Number($items[i].textContent);
        }
    }

    $text.textContent += smaller;
}

function larger(){
    const $items = document.getElementById('list-random-number').querySelectorAll(':scope > li');
    const $text = document.querySelector('#em-larger-number');
    let larger = Number($items[0].textContent);

    for(let i=0; i < $items.length; i++){
        if(Number($items[i].textContent) > larger){
            larger = Number($items[i].textContent);
        }
    }

    $text.textContent += larger;
}

function frequent(){
    const $items = document.getElementById('list-random-number').querySelectorAll(':scope > li');
    const $text = document.querySelector('#em-frequent-number');
    let numbers = [];
    let frequentNumber;
    let currentNumber;

    for(let i=0; i < $items.length; i++){   // take the elements from <ul> and push each element in numbers
        numbers.push(Number($items[i].textContent));
    }

    numbers = quickSort(numbers);
    currentNumber = {value: numbers[0], repeats: 0};
    frequentNumber = {value: '', repeats: 0};

    for(let i=1; i < numbers.length; i++){
        if(currentNumber.value == numbers[i]){
            currentNumber.repeats++;
        }
        else{
            if(currentNumber.repeats > frequentNumber.repeats){
                Object.assign(frequentNumber, currentNumber);   // copy content inside current to frequent
            }else{
                currentNumber.value = numbers[i];
                currentNumber.repeats = 0;
            }
        }
    }

    if(frequentNumber.value == ''){
        $text.textContent += 'ninguno'; 
    }else{
        $text.textContent += frequentNumber.value;
    }
}

$createButton.onclick = function(){
    const $items = document.getElementById('list-random-number').querySelectorAll(':scope > li');
    
    for(let i=0; i < $items.length; i++){
        $items[i].textContent = getRandomInteger(1,200);
    }

    average();
    smaller();
    larger();
    frequent();
  
    $createButton.setAttribute("disabled", "");

    return false;
}
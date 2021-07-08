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


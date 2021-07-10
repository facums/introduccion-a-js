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

function average(numbers){
    let total = 0;

    for(let i=0; i < numbers.length; i++){
        total += numbers[i];
    }

    return (total / numbers.length).toFixed(2);
}

function smaller(numbers){
    return quickSort(numbers)[0];
}

function larger(numbers){
    return quickSort(numbers)[numbers.length-1];
}

function frequent(numbers){
    let frequentNumber = {value: null, repeats: 0};
    let currentNumber = {value: numbers[0], repeats: 0};

    for(let i=1; i < numbers.length; i++){
        if(currentNumber.value == numbers[i]){
            currentNumber.repeats++;
        }
        else{
            if(currentNumber.repeats > frequentNumber.repeats){
                Object.assign(frequentNumber, currentNumber);   
            }else{
                currentNumber.value = numbers[i];
                currentNumber.repeats = 0;
            }
        }
    }

    return frequentNumber.value;
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
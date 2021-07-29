const $generateNumbers = document.getElementById('btn-generate-numbers');
const $calculateNumbers = document.getElementById('btn-calculate-numbers');
const $resetList = document.getElementById('btn-reset');

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

function calculateAverage(numbers){
    let total = 0;

    for(let i=0; i < numbers.length; i++){
        total += numbers[i];
    }

    return (total / numbers.length).toFixed(2);
}

function calculateMostFrequent(numbers){
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

function calculateResults(numbers){
    const sortedNumbers = quickSort(numbers);

    return {
        smallestNumber: sortedNumbers[0],
        biggestNumber: sortedNumbers[sortedNumbers.length-1],
        averageNumber: calculateAverage(sortedNumbers),
        mostFrequentNumber: calculateMostFrequent(sortedNumbers)
    }
}

function getNumberRange(){
    return [Number(document.getElementById('min-value').value), Number(document.getElementById('max-value').value)];
}

function getSizeOfList(){
    return Number(document.getElementById('size-of-list').value);
}

function createNumber(){
    const $number = document.createElement('li');
    const [minValue, maxValue] = getNumberRange();

    $number.className = 'number';
    $number.textContent = getRandomInteger(minValue, maxValue);
    return $number;
}

function createListOfNumbers(){
    const $listOfNumbers = document.getElementById('list-of-numbers');
    const size = getSizeOfList();
    let $randomNumber;

    for(let i=0; i < size; i++){
        $randomNumber = createNumber();
        $listOfNumbers.appendChild($randomNumber);
    }
}

function getListOfNumbers(){
    const $numbers = document.querySelectorAll('.number');
    const listOfNumbers = [];

    for(let i=0; i < $numbers.length; i++){
        listOfNumbers.push(Number($numbers[i].textContent));
    }

    return listOfNumbers;
}

function addAllResults(numbers){
    const {averageNumber, smallestNumber, biggestNumber, mostFrequentNumber} = calculateResults(numbers);

    form.querySelector('#average-number').textContent = averageNumber;
    form.querySelector('#smallest-number').textContent = smallestNumber;
    form.querySelector('#biggest-number').textContent = biggestNumber;
    form.querySelector('#most-frequent-number').textContent = mostFrequentNumber;
}

function showElement(element){
    element.removeAttribute('hidden');
}

function hideElement(element){
    element.hidden = true;
}

function enableElement(element){
    element.disabled = false;
}

function disableElement(element){
    element.disabled = true;
}

function deleteAllChildNodes(element){
    while(element.firstChild){
        element.removeChild(element.lastChild);
    }
}

$generateNumbers.onclick = function(event){
    deleteAllChildNodes(form.querySelector('#list-of-numbers'));
    createListOfNumbers();
    showElement(form.querySelector('#btn-calculate-numbers'));
    
    event.preventDefault();
}

$calculateNumbers.onclick = function(event){
    const listOfNumbers = getListOfNumbers();

    addAllResults(listOfNumbers);
    showElement(form.querySelector('#results'));

    event.preventDefault();
}

$resetList.onclick = function(event){
    deleteAllChildNodes(form.querySelector('#list-of-numbers'));
    hideElement(form.querySelector('#results'));
    enableElement(form.querySelector('#btn-generate-numbers'));
    form.reset();

    event.preventDefault();
}


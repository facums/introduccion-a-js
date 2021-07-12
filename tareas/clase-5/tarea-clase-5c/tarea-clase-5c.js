const $generateNumbers = document.getElementById('btn-generate-numbers');
const $reset = document.getElementById('btn-reset');

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

function calculateSmallest(numbers){
    return numbers[0];
}

function calculateBiggest(numbers){
    return numbers[numbers.length-1];
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
    return [calculateAverage(numbers), calculateSmallest(sortedNumbers), calculateBiggest(sortedNumbers), calculateMostFrequent(sortedNumbers)];
}

function getNumberRange(){
    return [+document.getElementById('min-value').value, +document.getElementById('max-value').value];
}

function getSizeOfList(){
    return +document.getElementById('length').value;
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

    for(let i=0; i < size; i++){
        $listOfNumbers.appendChild(createNumber());
    }
}

function getListOfNumbers(){
    const $numbers = document.querySelectorAll('.number');
    const array = [...new Array($numbers.length)];

    for(let i=0; i < array.length; i++){
        array[i] = +$numbers[i].textContent;
    }

    return array;
}

function addResult(type, value){
    document.querySelector(`#${type}`).textContent = value;
}

function addAllResults(numbers){
    const [average, smallestNumber, biggestNumber, mostFrequentNumber] = calculateResults(numbers);

    addResult('average-number', average);
    addResult('smallest-number', smallestNumber);
    addResult('biggest-number', biggestNumber);
    addResult('most-frequent-number', mostFrequentNumber);
}

function showElementById(name){
    document.getElementById(name).removeAttribute('hidden');
}

function hideElementById(name){
    document.getElementById(name).hidden = true;
}

function enableElementById(name){
    document.getElementById(name).disabled = false;
}

function disableElementById(name){
    document.getElementById(name).disabled = true;
}

function deleteAllChildNodes(parentID){
    $parent = document.getElementById(parentID);
    while($parent.firstChild){
        $parent.removeChild($parent.lastChild);
    }
}

$generateNumbers.onclick = function(){
    let listOfNumbers;

    createListOfNumbers();
    listOfNumbers = getListOfNumbers();
    
    if(listOfNumbers.firstChild !== null){
        addAllResults(getListOfNumbers());
        showElementById('results-paragraph');
        disableElementById('btn-generate-numbers');
    }
    return false;
}

$reset.onclick = function(){
    deleteAllChildNodes('list-of-numbers');
    hideElementById('results-paragraph');
    enableElementById('btn-generate-numbers');

    return false;
}


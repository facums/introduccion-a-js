

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


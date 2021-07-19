'use strict';

const $calculateSalary = document.getElementById('btn-calculate');
const $addMember = document.getElementById('btn-add');
const $deleteMember = document.getElementById('btn-delete');
const $resetForm = document.getElementById('btn-reset');

function addSalaryField(){
    const $membersAnnualSalaryInputs = document.getElementById('members-salary-inputs');
    const indexMembers = document.getElementsByClassName('members').length + 1;
    const createMember = (i) => {
        const $div = document.createElement('div');
        const $label = document.createElement('label');
        const $input = document.createElement('input');

        $label.textContent = `Annual salary of the family member #${i}`;
        $input.type = 'number';
        $input.className = 'annual-salary';
        $div.className = 'members';

        $div.appendChild($label);
        $div.appendChild($input);

        return $div;
    }

    $membersAnnualSalaryInputs.appendChild(createMember(indexMembers));
}

function calculateSalaryStatistic(annualSalaries) {
    const MONTHS = 12;
    const sum = (accu, current) => accu + current;
    const totalAnnualSalaries = annualSalaries.reduce(sum, 0);
    const higherSalary = Math.max(...annualSalaries);
    const lowerSalary = Math.min(...annualSalaries);
    const annualSalaryAverage = (totalAnnualSalaries / annualSalaries.length).toFixed(2);
    const monthlySalaryAverage = ((totalAnnualSalaries / MONTHS) / annualSalaries.length).toFixed(2);

    return [higherSalary, lowerSalary, annualSalaryAverage, monthlySalaryAverage];
}

function getMembersAnnualSalaries(){
    const $annualSalariesInputs = Array.from(document.querySelectorAll('.annual-salary'));
    const annualSalaries = $annualSalariesInputs.map(annualSalary => +annualSalary.value);

    return annualSalaries;
}

function showSalaryStatistic(annualSalaries){
    const [higherSalary, lowerSalary, annualSalaryAverage, monthlySalaryAverage] = calculateSalaryStatistic(annualSalaries);

    document.getElementById('higher-salary').textContent = higherSalary;
    document.getElementById('lower-salary').textContent = lowerSalary;
    document.getElementById('annual-salary-average').textContent = annualSalaryAverage;
    document.getElementById('monthly-salary-average').textContent = monthlySalaryAverage;
    
    showElementById('salary-statistic');
}

function showElementById(name){
    document.getElementById(name).removeAttribute('hidden');
}

function hideElementById(name){
    document.getElementById(name).hidden = true;
}

function deleteAllChildNodes(parentID){
    const $parent = document.getElementById(parentID);

    while($parent.firstChild){
        $parent.removeChild($parent.lastChild);
    }
}

function wipeSalariesForm(){
    deleteAllChildNodes('members-salary-inputs');
    addSalaryField();
    hideElementById('salary-statistic');
}

$calculateSalary.addEventListener('click', function(event){
    const annualSalaries = getMembersAnnualSalaries();

    showSalaryStatistic(annualSalaries);
    event.preventDefault();
})

$addMember.addEventListener('click', function(event){
    addSalaryField();
    event.preventDefault();
})

$deleteMember.addEventListener('click', function(event){
    const $membersAnnualSalaryInputs = document.getElementById('members-salary-inputs');

    if($membersAnnualSalaryInputs.firstChild.nextSibling) $membersAnnualSalaryInputs.lastChild.remove();

    event.preventDefault();
})

$resetForm.addEventListener('click', function(event){
    wipeSalariesForm();
    event.preventDefault();
})

addSalaryField();
'use strict';

const $calculateSalary = document.getElementById('btn-calculate');
const $addMember = document.getElementById('btn-add');
const $deleteMember = document.getElementById('btn-delete');
const $resetForm = document.getElementById('btn-reset');

const createMember = (i) => {
    const $member = document.createElement('div');
    const $memberNumber = document.createElement('label');
    const $memberAnnualSalary = document.createElement('input');

    $memberNumber.textContent = `Annual salary of the family member #${i}`;
    $memberAnnualSalary.type = 'number';
    $memberAnnualSalary.className = 'annual-salary';
    $member.className = 'members';

    $member.appendChild($memberNumber);
    $member.appendChild($memberAnnualSalary);

    return $member;
}

function addSalaryField(){
    const $membersAnnualSalaryInputs = document.getElementById('members-salary-inputs');
    const memberNumber = document.getElementsByClassName('members').length + 1;

    $membersAnnualSalaryInputs.appendChild(createMember(memberNumber));
}

function calculateSalaryStatistic(annualSalaries) {
    const MONTHS = 12;
    const sum = (accu, current) => accu + current;
    const totalAnnualSalaries = annualSalaries.reduce(sum, 0);

    return {
        higherSalary: Math.max(...annualSalaries),
        lowerSalary: Math.min(...annualSalaries),
        annualSalaryAverage: (totalAnnualSalaries / annualSalaries.length).toFixed(2),
        monthlySalaryAverage: ((totalAnnualSalaries / MONTHS) / annualSalaries.length).toFixed(2)
    }
}

function getAnnualSalaries(){
    const $annualSalariesInputs = Array.from(document.querySelectorAll('.annual-salary'));
    const annualSalaries = $annualSalariesInputs.map($annualSalary => Number($annualSalary.value)).filter(Boolean);

    return annualSalaries;
}

function showSalaryStatistic(annualSalaries){
    const { higherSalary, lowerSalary, annualSalaryAverage, monthlySalaryAverage } = calculateSalaryStatistic(annualSalaries);
    
    document.getElementById('higher-salary').textContent = higherSalary;
    document.getElementById('lower-salary').textContent = lowerSalary;
    document.getElementById('annual-salary-average').textContent = annualSalaryAverage;
    document.getElementById('monthly-salary-average').textContent = monthlySalaryAverage;
    
    showElement(form.querySelector('#salary-statistic'));
}

function showElement(element){
    element.removeAttribute('hidden');
}

function hideElement(element){
    element.hidden = true;
}

function deleteAllChildNodes(element){
    while(element.firstChild){
        element.removeChild(element.lastChild);
    }
}

function wipeSalariesForm(){
    deleteAllChildNodes(form.querySelector('#members-salary-inputs'));
    addSalaryField();
    hideElement(form.querySelector('salary-statistic'));
}

$calculateSalary.addEventListener('click', function(event){
    const annualSalaries = getAnnualSalaries();

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
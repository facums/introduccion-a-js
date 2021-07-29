'use strict';

const $createMembers = document.getElementById('btn-next');
const $calculateMembers = document.getElementById('btn-calculate');
const $resetForm = document.getElementById('btn-reset');

const createMember = (i) => {
    const $member = document.createElement('div');
    const $memberNumber = document.createElement('label');
    const $memberAge = document.createElement('input');

    $memberNumber.textContent = `Family member #${i}`;
    $memberAge.type = 'number';
    $memberAge.className = 'members-age';
    $member.className = 'member';

    $member.append($memberNumber);
    $member.append($memberAge);

    return $member;
}

function addAgeFields(number){
    const $membersForm = document.getElementById('members-age-inputs');

    for(let i=1; i <= number; i++){
        $membersForm.appendChild(createMember(i));
    }
}

function getMembersAge(){
    const $agesInputs = Array.from(document.querySelectorAll('.members-age'));
    const ages = $agesInputs.map(member => Number(member.value));

    return ages;
}

function calculateAgeStatistic(ages){
    const sum = (accu, current) => accu + current;
    const totalAges = ages.reduce(sum, 0);

    return {
        oldestAge: Math.max(...ages),
        youngestAge: Math.min(...ages),
        averageAge: (totalAges / ages.length).toFixed(2)
    }
}

function showAgeStatistic(ages){
    const { oldestAge, youngestAge, averageAge } = calculateAgeStatistic(ages);

    document.getElementById('oldest-age').textContent = oldestAge;
    document.getElementById('youngest-age').textContent = youngestAge;
    document.getElementById('average-age').textContent = averageAge;
    showElement(document.querySelector('#age-statistic'));
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

function wipeAgesForm(){
    deleteAllChildNodes(document.querySelector('#members-age-inputs'));
    hideElement(document.querySelector('#age-statistic'));
    hideElement(document.querySelector('#btns-age-inputs'));
}

$createMembers.addEventListener('click', function(event){
    const familyMembers = Number(document.getElementById('number-family-members').value);

    wipeAgesForm();
    
    if(familyMembers > 0){
        addAgeFields(familyMembers);
        showElement(document.querySelector('#btns-age-inputs'));
    }

    event.preventDefault();
})

$calculateMembers.addEventListener('click', function(event){
    const membersAge = getMembersAge();

    showAgeStatistic(membersAge);
    event.preventDefault(event);
})

$resetForm.addEventListener('click', function(event){
    wipeAgesForm();
    event.preventDefault(event);
})
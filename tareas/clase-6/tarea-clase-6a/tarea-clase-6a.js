'use strict';

const $createMembers = document.getElementById('btn-next');
const $calculateMembers = document.getElementById('btn-calculate');
const $resetForm = document.getElementById('btn-reset');

function addAgeFields(number){
    const $membersForm = document.getElementById('members-age-inputs');

    const createMember = (i) => {
        const $div = document.createElement('div');
        const $label = document.createElement('label');
        const $input = document.createElement('input');

        $label.textContent = `Family member #${i}`;
        $input.type = 'number';
        $input.className = 'members-age';
        $div.className = 'member';

        $div.append($label);
        $div.append($input);

        return $div;
    }

    for(let i=1; i <= number; i++){
        $membersForm.appendChild(createMember(i));
    }
}

function getMembersAge(){
    const $agesInputs = Array.from(document.querySelectorAll('.members-age'));
    const ages = $agesInputs.map(member => +member.value);

    return ages;
}

function calculateAgeStatistic(ages){
    const sum = (accu, current) => accu + current;
    const totalAges = ages.reduce(sum, 0);
    const oldestAge = Math.max(...ages);
    const youngestAge = Math.min(...ages);
    const averageAge = totalAges / ages.length;

    return [oldestAge, youngestAge, averageAge];
}

function showAgeStatistic(ages){
    const [oldestAge, youngestAge, averageAge] = calculateAgeStatistic(ages);

    document.getElementById('oldest-age').textContent = oldestAge;
    document.getElementById('youngest-age').textContent = youngestAge;
    document.getElementById('average-age').textContent = averageAge;
    showElementById('age-statistic');
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

function wipeAgesForm(){
    deleteAllChildNodes('members-age-inputs');
    hideElementById('age-statistic');
    hideElementById('btns-age-inputs');
}

$createMembers.addEventListener('click', function(event){
    const familyMembers = +document.getElementById('number-family-members').value;

    wipeAgesForm();
    
    if(familyMembers > 0){
        addAgeFields(familyMembers);
        showElementById('btns-age-inputs');
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
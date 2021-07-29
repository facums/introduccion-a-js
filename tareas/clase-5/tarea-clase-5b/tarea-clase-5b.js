const $addVideo = document.querySelector('#add-video');
const $deleteVideo = document.querySelector('#delete-video');
const $calculateVideoTime = document.querySelector('#calculate-button');
const $reloadPage = document.querySelector('#reload-button');

function addVideoInputs(){
    const $hours = document.querySelectorAll('.hours-input');
    const $minutes = document.querySelectorAll('.minutes-input');
    const $seconds = document.querySelectorAll('.seconds-input');
    let totalTime = {hours: 0, minutes: 0, seconds: 0};

    for(let i=0; i < $hours.length; i++){
        totalTime.hours += Number($hours[i].value);
        totalTime.minutes += Number($minutes[i].value);
        totalTime.seconds += Number($seconds[i].value);
    }

    return totalTime;
}

function formatVideoTime(video){
    let formattedTime = Object.assign({},video);

    formattedTime.minutes += Math.trunc(video.seconds / 60);
    formattedTime.seconds %= 60;
    formattedTime.hours += Math.trunc(video.minutes / 60);
    formattedTime.minutes %= 60;

    return formattedTime;
}

function showVideoTime(video){
    document.getElementById('hours-result').textContent = video.hours;
    document.getElementById('minutes-result').textContent = video.minutes;
    document.getElementById('seconds-result').textContent = video.seconds;
}

function cloneVideoFields(){
    const $videoTemplate = document.querySelector('#video-template');
    const $clone = $videoTemplate.cloneNode(true);
    
    return addAttributesVideoFields($clone);
}

function addAttributesVideoFields($videoFields){
    $videoFields.hidden = false;
    $videoFields.removeAttribute('id');
    $videoFields.classList.add('video');

    return $videoFields;
}

function addVideoFields(){
    const $videos = document.querySelector('#videos-form');          
    $videos.appendChild(cloneVideoFields()); 
}

$addVideo.onclick = function(){
    addVideoFields();
    return false;
}

$deleteVideo.onclick = function(){
    const $videoForm = document.querySelector('#videos-form');
    const $videoFields = $videoForm.querySelectorAll('.video');

    if($videoFields.length > 1) $videoForm.lastChild.remove();
    return false;
}

$calculateVideoTime.onclick = function(){
    const videoTime = formatVideoTime(addVideoInputs());
    showVideoTime(videoTime);

    return false;
}

$reloadPage.onclick = function(){
    if(window.confirm('Do you really want to reload page?')){ 
        document.location.reload(true); 
    }

    return false;
}

addVideoFields();
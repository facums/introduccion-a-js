const $addVideo = document.querySelector('#add-video');
const $deleteVideo = document.querySelector('#delete-video');
const $calculateVideoTime = document.querySelector('#calculate-button');
const $reloadPage = document.querySelector('#reset-button');

document.querySelector('#videos-form').appendChild(cloneVideoTimeTemplate());

$addVideo.onclick = function(){
    const $videos = document.querySelector('#videos-form');          
    $videos.appendChild(cloneVideoTimeTemplate()); 
  
    return false;
}

$deleteVideo.onclick = function(){
    const $videos = document.querySelector('#videos-form');
    $videos.lastChild.remove()

    return false
}

$calculateVideoTime.onclick = function(){
    const $displayTime = document.querySelector('#display-time');
    const $hours = document.querySelectorAll('.hours-input');
    const $minutes = document.querySelectorAll('.minutes-input');
    const $seconds = document.querySelectorAll('.seconds-input');
    let totalVideo = {hours: 0, minutes: 0, seconds: 0};

    for(let i=0; i < $hours.length; i++){
        totalVideo.hours += Number($hours[i].value);
        totalVideo.minutes += Number($minutes[i].value);
        totalVideo.seconds += Number($seconds[i].value);
    }

    totalVideo = calculateVideosTotalTime(totalVideo);
    $displayTime.textContent = `${totalVideo.hours} hour(s), ${totalVideo.minutes} minute(s), ${totalVideo.seconds} second(s)`;

    return false;
}

$reloadPage.onclick = function(){
    if(window.confirm('Do you really want to reload page?')){ 
        document.location.reload(true); 
    }

    return false;
}

function calculateVideosTotalTime(videos){
    videos.minutes += Math.trunc(videos.seconds / 60);
    videos.seconds %= 60;
    videos.hours += Math.trunc(videos.minutes / 60);
    videos.minutes %= 60;

    return videos;
}

function cloneVideoTimeTemplate(){
    const $videoTemplate = document.querySelector('#video-template');
    const $clone = $videoTemplate.cloneNode(true);
    
    return setAttributeToClone($clone);
}

function setAttributeToClone($clone){
    $clone.hidden = false;
    $clone.removeAttribute('id');
    $clone.classList.add('video');

    return $clone;
}
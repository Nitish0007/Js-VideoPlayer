const player = document.querySelector('.player');
const video = player.querySelector('video');
const togglebtn = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const skipbtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.slider');

function togglePlay(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updatebtn(){
    icon = video.paused ? '►' : '❚❚';
    togglebtn.textContent = icon;
}

function skip(){
    let value = this.dataset.skip;
    // console.log(value);
    video.currentTime = video.currentTime + parseFloat(value); 
}

function handleRanges(){
    video[this.name]= this.value;
}

function updateProgress(){
    let percent = (video.currentTime / video.duration) *100;
progressBar.style.flexBasis =`${percent}%` ;
}

function scrub(e){
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


video.addEventListener('click',togglePlay);
video.addEventListener('play',updatebtn);
video.addEventListener('pause',updatebtn);
togglebtn.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',updateProgress);


skipbtns.forEach(btn => btn.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change',handleRanges));
ranges.forEach(range => range.addEventListener('mousemove',handleRanges));

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);

let audio = document.getElementById("audio");
let title = document.getElementById("title");
let playBtn = document.getElementById("play");
let disk = document.getElementById("disk");
let eq = document.querySelectorAll(".equalizer div");
let volume = document.getElementById("volume");

let songs = document.querySelectorAll(".song");
let currentIndex = -1;

songs.forEach((song,i)=>{
    song.addEventListener("click",()=>{
        songs.forEach(s=>s.classList.remove("active"));
        song.classList.add("active");
        audio.src = song.dataset.src;
        audio.play();
        playBtn.innerText = "⏸";
        title.innerText = song.innerText;
        disk.style.animationPlayState = "running";
        startEQ();
        currentIndex = i;
    });
});

playBtn.onclick = ()=>{
    if(audio.paused){
        audio.play();
        playBtn.innerText = "⏸";
        disk.style.animationPlayState = "running";
        startEQ();
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        disk.style.animationPlayState = "paused";
        stopEQ();
    }
};

function startEQ(){
    eq.forEach((bar,i)=>{
        bar.style.opacity="1";
        bar.style.animationDelay=(i*0.1)+"s";
    });
}
function stopEQ(){
    eq.forEach(bar=>{
        bar.style.opacity="0";
    });
}

volume.oninput = e=>{
    audio.volume = e.target.value;
};

document.getElementById("next").onclick = ()=>{
    if(currentIndex<0) return;
    currentIndex = (currentIndex+1) % songs.length;
    songs[currentIndex].click();
};

document.getElementById("prev").onclick = ()=>{
    if(currentIndex<0) return;
    currentIndex = (currentIndex-1+songs.length) % songs.length;
    songs[currentIndex].click();
};

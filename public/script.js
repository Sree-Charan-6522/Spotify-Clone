
function lib() {
    let b = document.querySelector(".menubar")
    if (b.className == "menubar") {
        b.className = "menubar menubarshort"
    }
    else {
        b.className = "menubar"
    }
}

async function findMusic(n) {

    let a = await fetch("http://localhost:3000/songs/")
    let r = await a.text();
    // console.log(r);
    let e = document.createElement("div")
    e.innerHTML = r;
    let as = e.getElementsByTagName("a")
    let s = []
    for (let i = 0; i < as.length; i++) {
        const el = as[i];
        if (el.href.endsWith(".mp3")) {
            s.push(el.href)
            // console.log(el);

        }
    }
    return s[n]
}

async function main(n) {
    // find the song
    let song = await findMusic(n)
    // console.log(song);
    let a = document.querySelector(".now")
    a.innerHTML = `<audio id="bga" src="${song}" autoplay=""></audio>`;
    let a1 = document.getElementById("bga")
    a1.play
    a1.volume = 0.1
}


// fetch the folser to add songs icons only on main and menu bars
(async function maneger() {


    // let a = await fetch("http://127.0.0.1:3000/Projects/p2/details/")
    let a = await fetch("http://localhost:3000/details/")
    let r = await a.text();
    // console.log(r);
    let e = document.createElement("div")
    e.innerHTML = r;
    let as = e.getElementsByTagName("a")
    let s = []
    for (let i = 0; i < as.length; i++) {
        const el = as[i];
        if (el.href.endsWith(".txt")) {
            s.push(el.href)
        }
    }
    // console.log(s);
    for (let i = 0; i < s.length; i++) {
        const de = s[i];
        let a1 = await fetch(de)
        let r1 = await a1.text()
        let s1 = r1.split("\"")
        let infol = document.querySelector(".innerfolder")
        infol.innerHTML += `<button onclick="main(${i})" class="f">
        <span id="f0" class="thumb">
        <img src="${s1[2]}" alt="">
        
        <img class="playbtn" src="imgs/play.svg" alt="">
        </span>
        <span class="mainfoldername">${s1[0]}</span>
        <span class="othername">${s1[1]}</span>
        </button> `;

        let licon = document.querySelector(".listcon")
        licon.innerHTML += `<button onclick="main(${i})" class="lists">
        <div class="imgs">
        <img src="${s1[2]}" alt="">
        </div>
        <div>
        <span class="s1">${s1[0]}</span>
        <span class="s2">${s1[1]}</span>
        </div>
        </button>`
    }
})();

// responsive
function respon(x) {
    if (x.matches) { // If media query matches
        lib();
    }
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 1080px)")

// Call listener function at run time
respon(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
    respon(x);
});



// for controls


// for play or pause
function playPause() {
    let a = document.getElementById("bga")
    if (a.paused) {
        a.play()
    } else {
        a.pause()
    }
}

// for pervious and next
async function pervNxt(n) {
    let a1 = document.getElementById("bga")
    // console.log(a1.src);

    let a = await fetch("http://localhost:3000/songs/")
    let r = await a.text();
    let e = document.createElement("div")
    e.innerHTML = r;
    let as = e.getElementsByTagName("a")
    let s = []
    for (let i = 0; i < as.length; i++) {
        const el = as[i];
        if (el.href.endsWith(".mp3")) {
            s.push(el.href)
        }
    }
    // console.log(s);
    if (n == 1) {
        for (let i = 0; i < s.length; i++) {
            const ele = s[i];
            if (i <= 0) {
                continue
            }
            if (ele == a1.src) {
                let a2 = document.querySelector(".now")
                a2.innerHTML = `<audio id="bga" src="${s[i - 1]}" autoplay=""></audio>`;
            }
        }
    } else {
        for (let i = 0; i < s.length; i++) {
            const ele = s[i];
            if (i == s.length - 1) {
                continue
            }
            if (ele == a1.src) {
                let a2 = document.querySelector(".now")
                a2.innerHTML = `<audio id="bga" src="${s[i + 1]}" autoplay=""></audio>`;
            }
        }
    }
    let a3 = document.getElementById("bga")
    a3.volume = 0.1
}

// for shuffel
async function shuf() {
    let a = await fetch("http://localhost:3000/songs/")
    let r = await a.text();
    let e = document.createElement("div")
    e.innerHTML = r;
    let as = e.getElementsByTagName("a")
    let s = []
    for (let i = 0; i < as.length; i++) {
        const el = as[i];
        if (el.href.endsWith(".mp3")) {
            s.push(el.href)
        }
    }
    let a2 = document.getElementById("bga")
    let n = Math.round(0 + 18 * Math.random())
    // for not playing same song
    if (a2.src == s[n]) {
        if (n >= s.length - 1) {
            n--
        } else {
            n++
        }
    }
    let a1 = document.querySelector(".now")
    a1.innerHTML = `<audio id="bga" src="${s[n]}" autoplay=""></audio>`;

    let a3 = document.getElementById("bga")
    a3.volume = 0.1
}

// for repeat

async function loop() {

    let a = document.querySelector(".loop")
    if (a.hasAttribute("style")) {
        a.removeAttribute("style")
    } else {
        a.style.filter = 'brightness(0%) invert(1)';
    }

    let audio = document.getElementById("bga");
    if (audio.hasAttribute("loop")) {
        audio.removeAttribute("loop")
    } else {
        audio.setAttribute('loop', '');
    }
    audio.loop
}

// for time
var up = setInterval(() => {

    const audio = document.getElementById('bga');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    audio.addEventListener("timeupdate", function () {
        const durationInSeconds = audio.duration; // Get the duration in seconds
        const formattedDuration = formatTime(durationInSeconds); // Format to minutes:seconds
        document.getElementById("duration").textContent = formattedDuration; // Display on the page
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = formatTime(audio.currentTime);
        currentTimeDisplay.textContent = currentTime;
    });

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }


    // for seek bar
    const seekbar = document.getElementById('seekSlider');

    seekbar.addEventListener('input', function () {
        const seekTo = audio.duration * (this.value / 100);
        audio.currentTime = seekTo;
    });
    audio.addEventListener('timeupdate', function () {
        const seekPos = 100 * (audio.currentTime / audio.duration);
        seekbar.value = seekPos;
    });
}, 1000);


// for log in and log out 

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector(".logdiv")

    const logoutBtn = document.querySelector(".logeddiv")

    if (localStorage.getItem("loggedInUser")) {
        loginBtn.style.display = "none";  // Hide login button
        logoutBtn.style.display = "block";  // Show logout button
    }
});

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload(); // Refresh page to update UI
}


// search bar
const searchBox = document.querySelector(".msb")
const dialogBox = document.querySelector(".msbdb")

searchBox.addEventListener("click", () => {
    dialogBox.style.display = dialogBox.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (event) => {
    if (!searchBox.contains(event.target) && !dialogBox.contains(event.target)) {
        dialogBox.style.display = "none";
    }
});



let songs = [];

async function fetchSongs() {
    try {
        let a = await fetch("http://localhost:3000/songs/")
        let r = await a.text();
        // console.log(r);
        let e = document.createElement("div")
        e.innerHTML = r;
        let as = e.getElementsByTagName("a")
        let s = []
        for (let i = 0; i < as.length; i++) {
            const el = as[i];
            if (el.href.endsWith(".mp3")) {
                songs.push(el.href)

            }
        }
        // console.log(songs);

    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

function searchSongs() {
    const query = document.querySelector(".msb").value.toLowerCase();
    const dialogBox = document.querySelector(".msbdb");

    if (query === "") {
        dialogBox.style.display = "none";
        return;
    }

    // Extract song names from URLs
    const filteredSongs = songs
        .map(url => ({
            name: url.split('/').pop().replace('.mp3', ''), // Extract file name
            file: url
        }))
        .filter(song => song.name.toLowerCase().includes(query))
        .slice(0, 4); // Show top 3 matches

    console.log("s");

    if (filteredSongs.length === 0) {
        dialogBox.innerHTML = "<p>No matching songs</p>";
    } else {
        dialogBox.innerHTML = filteredSongs
            .map(song => `<p >${song.name.replaceAll("%20", " ")}</p>`)
            .join(" ");
    }

    dialogBox.style.display = "grid";
}


document.addEventListener("click", (event) => {
    const searchBox = document.querySelector(".msb");
    const dialogBox = document.querySelector(".msbdb");

    if (!searchBox.contains(event.target) && !dialogBox.contains(event.target)) {
        dialogBox.style.display = "none";
    }
});

window.onload = fetchSongs;



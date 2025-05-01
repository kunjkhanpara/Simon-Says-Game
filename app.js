let gameSeq = [];
let userSeq = [];
let colors = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Flashing effect
function btnFlash(color) {
    let btn = document.querySelector(`.${color}`);
    btn.classList.add("flash");
    
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);

    playSound(color);
}

// Playing sound effect
function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// Level up function
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colors[randIdx];
    gameSeq.push(randColor);

    setTimeout(() => {
        btnFlash(randColor);
    }, 500);
}

// Button click function
function btnPress() {
    let btn = this;
    let userColor = btn.getAttribute("data-color");

    userSeq.push(userColor);
    btnFlash(userColor);

    checkAnswer(userSeq.length - 1);
}

// Checking the user's input
function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = "Game Over! Press Any Key to Restart";
        document.body.classList.add("wrong");

        setTimeout(() => {
            document.body.classList.remove("wrong");
        }, 200);

        resetGame();
    }
}

// Reset game function
function resetGame() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

// Add event listeners to buttons
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

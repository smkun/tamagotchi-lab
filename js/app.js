// Initialize state and timers
let state = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0,
};

let timer;
let gameOver = false;

// Cache element references efficiently
const statsEl = {
    boredom: document.getElementById("boredom-stat"),
    hunger: document.getElementById("hunger-stat"),
    sleepiness: document.getElementById("sleepiness-stat"),
};

const buttonsEl = {
    play: document.getElementById("play"),
    feed: document.getElementById("feed"),
    sleep: document.getElementById("sleep"),
};

const gameMessageEl = document.getElementById("message");
const resetBtnEl = document.getElementById("restart");

// Define a mapping from button actions to state keys
const actionToStateKey = {
    play: 'boredom',
    feed: 'hunger',
    sleep: 'sleepiness'
};

// Initialization function
function init() {
    console.log("Game initialized");
    gameOver = false;
    state = { boredom: 0, hunger: 0, sleepiness: 0 }; // Reset state
    gameMessageEl.classList.add("hidden");
    resetBtnEl.classList.add("hidden");
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(runGame, 2000);
    render(); // Update UI with initial state
}

// Main game loop
function runGame() {
    updateStates();
    checkGameOver();
    render();
}

// Update game state
function updateStates() {
    Object.keys(state).forEach(key => {
        state[key] += getRandomInt(0, 3);
    });
    console.log("States updated:", state); // Log updated states for debugging
}

// Check if game over condition is met
function checkGameOver() {
    if (Object.values(state).some(value => value >= 10)) {
        gameOver = true;
        clearInterval(timer);
        gameMessageEl.classList.remove("hidden");
        resetBtnEl.classList.remove("hidden");
        console.log("Game Over"); // Log game over for debugging
    }
}

// Utility function to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update UI to reflect current state
function render() {
    console.log("Rendering, current state:", state); // Log before rendering for debugging
    Object.keys(statsEl).forEach(key => {
        statsEl[key].textContent = state[key];
    });
}

// Attach event listeners to buttons for game actions
Object.keys(buttonsEl).forEach(action => {
    buttonsEl[action].addEventListener('click', function() {
        console.log(`${action} action triggered`); // Confirm action trigger
        if (!gameOver && actionToStateKey[action]) {
            state[actionToStateKey[action]] = 0; // Reset specific state related to the action
            console.log('Updated state after action:', state); // Log updated state for debugging
            render(); // Update UI
        }
    });
});

// Reset functionality
resetBtnEl.addEventListener("click", function() {
    console.log("Resetting game"); // Log resetting for debugging
    init();
});

// Start the game
init();

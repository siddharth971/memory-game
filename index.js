const move = document.getElementById("move-count");
const timevalue = document.getElementById("time");
const startbtn = document.getElementById("start");
const stopbtn = document.getElementById("stop");
const gamecontainer = document.querySelector(".game-container");
const result = document.querySelector(".result");
const control = document.querySelector(".control-container");

let card;
let interval;
let firstcard = false;
let secondcard = false;

let items = [
    { name: "bee", image: "image/bee.png" },
    { name: "crocodile", image: "image/crocodile.png" },
    { name: "macow", image: "image/macow.png" },
    { name: "gorilla", image: "image/gorilla.png" },
    { name: "tiger", image: "image/tiger.png" },
    { name: "monkey", image: "image/monkey.png" },
    { name: "anaconda", image: "image/anaconda.png" },
    { name: "cochatoo", image: "image/cochatoo.png" },
    { name: "toucan", image: "image/toucan.png" }
];

// Initial time
let seconds = 0;
let minutes = 0;

// Initial moves and win count
let movecount = 0;
let wincount = 0;

// Time generator function
const timegenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

    timevalue.innerHTML = `<span>Time:</span> ${minutesValue}:${secondsValue}`;
};

// Move counter function
const moveCounter = () => {
    movecount += 1;
    move.innerHTML = `<span>Move:</span> ${movecount}`;
};

// Generate random cards
const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardvalue = [];

    for (let i = 0; i < size * size / 2; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardvalue.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }

    return cardvalue;
};

// Matrix generator function
const matrixGenerator = (cardvalue, size = 4) => {
    gamecontainer.innerHTML = "";
    cardvalue = [...cardvalue, ...cardvalue];

    cardvalue.sort(() => {
        return Math.random() - 0.5;
    });

    for (let i = 0; i < size * size; i++) {
        gamecontainer.innerHTML += `
            <div class="card-container" data-card-value="${cardvalue[i].name}">
                <div class="card-before">?</div>
                <div class="card-after">
                    <img src="${cardvalue[i].image}" class="image">
                </div>
            </div>
        `;
    }
    //grid 

    gamecontainer.style.gridTemplateColumns = `repeat(${size},auto)`
};

// Initialize game
const initializer = () => {
    result.innerHTML = '';
    wincount = 0;
    movecount = 0;
    moveCounter();
    let cardvalue = generateRandom();
    matrixGenerator(cardvalue);
};

// Example of how to start the game
initializer();
//grid 

gamecontainer.style.gridTemplateColumns = `repeat(${size},auto)`
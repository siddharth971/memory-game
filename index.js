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
    { name: "crocodine", image: "image/crocodine.png" },
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


card = document.querySelectorAll(".card-container");


card.forEach((card) => {
    card.addEventListener("click", () => {
        // if selected card is a not matched yet then only run

        if (!card.classList.contains("matched")) {
            card.classList.add("flipped");
            //if it is the firstcard
            if (!firstcard) {
                //so current card will become  firstcard
                firstcard = card;
                firstcardValue = card.getAttribute("data-card-value")
            }
        } else {
            moveCounter();
            secondcard = card;
            let secondCardValue = card.getAttribute("data-card-value");
            if (firstcardValue == secondCardValue) {
                //if both class is matched then add mathced class so thus card will be ignored
                firstcard.classList.add("matched");
                secondcard.classList.add("matched");
                firstcard = false;
                // increment woncount
                wincount += 1;


                if (wincount == Math.floor(cardvalue.length / 2)) {
                    result.innerHTML = (`<h2>You Won</h2>
                    <h4>Movies: ${movecount}</h4>`);
                    StopGame();
                }
            }
            else {
                //if the card dont match
                //flip the card back to normal

                let [temoFirst, temoSecond] = [firstcard, secondcard];
                firstcard = false;
                secondcard = false;

                let delay = setTimeout(() => {
                    temoFirst.classList.remove("flipped");
                    temoSecond.classList.remove("flipped");
                }, 900);
            }
        }
    })
});


//start game

startbtn.addEventListener("click", () => {
    movecount = 0;
    // controll and  button visibility 
    control.classList.add("hide");
    stopbtn.classList.remove("hide");
    startbtn.classList.add("hide");

    interval = setInterval(timegenerator, 1000);
    move.innerHTML = `<span>Moves:</span>${movecount}`;
    initializer();

})
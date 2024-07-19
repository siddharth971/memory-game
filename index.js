document.addEventListener("DOMContentLoaded", function () {
    const move = document.getElementById("move-count");
    const timevalue = document.getElementById("time");
    const sbtn = document.getElementById("start");
    console.log(sbtn)
    const stopbtn = document.getElementById("stop");
    const gamecontainer = document.querySelector(".game-container");
    const result = document.querySelector(".result");
    const control = document.querySelector(".control-container");

    let card;
    let interval;
    let firstcard = null;
    let secondcard = null;
    let firstcardValue = null;
    let cardvalue = [];

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

    let seconds = 0;
    let minutes = 0;
    let movecount = 0;
    let wincount = 0;

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

    const moveCounter = () => {
        movecount += 1;
        move.innerHTML = `<span>Moves:</span> ${movecount}`;
    };

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

        gamecontainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

        card = document.querySelectorAll(".card-container");

        card.forEach((card) => {
            card.addEventListener("click", () => {
                if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
                    card.classList.add("flipped");
                    console.log(card.className);
                    if (!firstcard) {
                        firstcard = card;
                        firstcardValue = card.getAttribute("data-card-value");
                    } else {
                        secondcard = card;

                        let secondCardValue = card.getAttribute("data-card-value");

                        moveCounter();

                        if (firstcardValue === secondCardValue) {
                            firstcard.classList.add("matched");
                            secondcard.classList.add("matched");
                            firstcard = null;
                            wincount += 1;

                            if (wincount === Math.floor(cardvalue.length / 2)) {
                                result.innerHTML = `<h2>You Won</h2><h4>Moves: ${movecount}</h4>`;
                                stopGame();
                            }
                        } else {
                            let tempFirst = firstcard;
                            let tempSecond = secondcard;
                            firstcard = null;
                            secondcard = null;

                            setTimeout(() => {
                                tempFirst.classList.remove("flipped");
                                tempSecond.classList.remove("flipped");
                            }, 900);
                        }
                    }
                }
            });
        });
    };

    const initializer = () => {
        result.innerHTML = '';
        wincount = 0;
        movecount = 0;
        moveCounter();
        cardvalue = generateRandom();
        matrixGenerator(cardvalue);
    };

    initializer();

    sbtn.addEventListener("click", () => {
        movecount = 0;
        console.log("test ok")
        control.classList.add("hide");
        stopbtn.classList.remove("hide");
        sbtn.classList.add("hide");

        interval = setInterval(timegenerator, 1000);
        move.innerHTML = `<span>Moves:</span> ${movecount}`;
        initializer();
    });

    const stopGame = () => {
        clearInterval(interval);
    };

    stopbtn.addEventListener("click", stopGame);
});

let boxes = document.querySelectorAll(".box");
let gameBoard = document.querySelector(".game");
let resetBtn = document.querySelector("#resetBtn");
let startBtn = document.querySelector("#startBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let turnMsg = document.querySelector("#turnMsg");

let winSound = document.querySelector("#winSound");
let drawSound = document.querySelector("#drawSound");
let clickSound = document.querySelector("#clickSound");

let playerOInput = document.querySelector("#playerO");
let playerXInput = document.querySelector("#playerX");

let playerOName = "";
let playerXName = "";

let turnO = true;
let count = 0;

const winPattern = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const lockInputs = () => {
    playerOInput.disabled = true;
    playerXInput.disabled = true;
};

const unlockInputs = () => {
    playerOInput.disabled = false;
    playerXInput.disabled = false;
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.add("box-enabled");
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
        box.classList.remove("box-enabled");
    }
};

const startGame = () => {
    clickSound.currentTime = 0;
    clickSound.play();

    if (playerOInput.value !== "") {
        playerOName = playerOInput.value;
    } else {
        playerOName = "Player O";
    }

    if (playerXInput.value !== "") {
        playerXName = playerXInput.value;
    } else {
        playerXName = "Player X";
    }

    lockInputs();
    enableBoxes();

    turnO = true;
    count = 0;

    msgContainer.classList.add("hide");
    turnMsg.innerText = "Turn: " + playerOName + " (O)";

    gameBoard.classList.remove("hide");
    resetBtn.classList.remove("hide");
    startBtn.classList.add("hide");
};

const newGame = () => {
    clickSound.currentTime = 0;
    clickSound.play();

    if (playerOInput.value !== "") {
        playerOName = playerOInput.value;
    } else {
        playerOName = "Player O";
    }

    if (playerXInput.value !== "") {
        playerXName = playerXInput.value;
    } else {
        playerXName = "Player X";
    }

    lockInputs();
    enableBoxes();

    turnO = true;
    count = 0;

    msgContainer.classList.add("hide");
    turnMsg.innerText = "Turn: " + playerOName + " (O)";

    gameBoard.classList.remove("hide");
    resetBtn.classList.remove("hide");
};

const resetGame = () => {
    let confirmReset = confirm("Are you sure you want to reset the current game?");

    if (confirmReset) {
        clickSound.currentTime = 0;
        clickSound.play();

        enableBoxes();
        unlockInputs();

        turnO = true;
        count = 0;

        msgContainer.classList.add("hide");
        turnMsg.innerText = "";

        gameBoard.classList.add("hide");
        resetBtn.classList.add("hide");
        startBtn.classList.remove("hide");
        
        playerOInput.value = "";
        playerXInput.value = "";
        playerOName = "";
        playerXName = "";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();

        if (turnO) {
            box.innerText = "O";
            turnO = false;
            turnMsg.innerText = "Turn: " + playerXName + " (X)";
        } else {
            box.innerText = "X";
            turnO = true;
            turnMsg.innerText = "Turn: " + playerOName + " (O)";
        }

        box.disabled = true;
        box.classList.remove("box-enabled");
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const displayWinner = (winner) => {
    let winnerName = "";
    let winnerSymbol = "";

    if (winner === "O") {
        winnerName = playerOName;
        winnerSymbol = "O";
    }

    if (winner === "X") {
        winnerName = playerXName;
        winnerSymbol = "X";
    }

    msg.innerText = "Winner is " + winnerName + " (" + winnerSymbol + ")";
    msgContainer.classList.remove("hide");
    turnMsg.innerText = "";

    winSound.currentTime = 0;
    winSound.play();

    gameBoard.classList.add("hide");
    resetBtn.classList.add("hide");

    unlockInputs();
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = "Game Draw";
    msgContainer.classList.remove("hide");
    turnMsg.innerText = "";

    drawSound.currentTime = 0;
    drawSound.play();

    gameBoard.classList.add("hide");
    resetBtn.classList.add("hide");

    unlockInputs();
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 !== "" && val2 !== "" && val3 !== "") {
            if (val1 === val2 && val2 === val3) {
                displayWinner(val1);
                return true;
            }
        }
    }
    return false;
};

startBtn.addEventListener("click", startGame);
newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);

disableBoxes();
gameBoard.classList.add("hide");
resetBtn.classList.add("hide");
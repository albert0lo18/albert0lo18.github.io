function updateColors() {
    const root = document.documentElement;
    root.style.setProperty('--cell-color-odd',  document.getElementById('cellColor1').value);
    root.style.setProperty('--cell-color-even', document.getElementById('cellColor2').value);
    root.style.setProperty('--winner-color',    document.getElementById('winnerColor').value);
    root.style.setProperty('--line-color',      document.getElementById('lineColor').value);
}

// Estado del turno
let turn = false;

// Par de imagenes activo
let currentPair = "classic";

// Tiempo total
let totalSeconds = 180;

// Referencia al intervalo del timer
let timerInterval = null;

// Verifica si el juego esta activo
let gameActive = true;

window.onload = function() {
    updateColors();
    startTimer();
};

function active(button) {
    if (!gameActive) return;          
    if (button.value !== "") return;

    button.disabled = true;

    const symbol = turn ? "X" : "O";
    button.value = symbol;
    button.classList.add(symbol);

    const allButtons = Array.from(document.querySelectorAll("input[type='button']"));
    boardState[allButtons.indexOf(button)] = symbol;

    turn = !turn;
    document.getElementById("turnLabel").textContent = turn ? "X" : "O";

    verifyWinner();
}

let boardState = Array(9).fill(null);

// Combos ganadores
const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function verifyWinner() {
    for (let combo of WIN_COMBOS) {
        const [a, b, c] = combo;
        const val = boardState[a];
        if (val && val === boardState[b] && val === boardState[c]) {
            lockGame();
            drawWinLine(combo);
            document.getElementById("message").textContent = "¡Gano " + val + "!";
            return;
        }
    }

    if (boardState.every(cell => cell !== null)) {
        document.getElementById("message").textContent = "¡Empate!";
        lockGame();
    }
}

function drawWinLine(combo) {
    const table  = document.getElementById("gameTable");
    const cells  = table.querySelectorAll("td");
    const tableRect = table.getBoundingClientRect();

    const cellA = cells[combo[0]].getBoundingClientRect();
    const cellC = cells[combo[2]].getBoundingClientRect();

    const x1 = cellA.left + cellA.width  / 2 - tableRect.left;
    const y1 = cellA.top  + cellA.height / 2 - tableRect.top;
    const x2 = cellC.left + cellC.width  / 2 - tableRect.left;
    const y2 = cellC.top  + cellC.height / 2 - tableRect.top;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle  = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    const line = document.createElement("div");
    line.id = "win-overlay";
    line.style.width  = length + "px";
    line.style.height = "5px";
    line.style.left   = x1 + "px";
    line.style.top    = y1 + "px";
    line.style.transform = "translate(-50%, -50%) translateX(0) rotate(" + angle + "deg)";
    line.style.transformOrigin = "left center";
    line.style.left = x1 + "px";
    line.style.top  = y1 + "px";
    line.style.transform = "translateY(-50%) rotate(" + angle + "deg)";

    table.style.position = "relative";
    table.appendChild(line);
}

function lockGame() {
    gameActive = false;
    clearInterval(timerInterval);
    document.querySelectorAll("input[type='button']").forEach(btn => {
        btn.disabled = true;
    });
}

function changePair() {
    currentPair = document.getElementById("pairSelect").value;
    const table = document.getElementById("gameTable");

    table.classList.remove("pair-animals", "pair-fruits", "pair-space");

    if (currentPair !== "classic") {
        table.classList.add("pair-" + currentPair);
    }
}

function startTimer() {
    const timerEl  = document.getElementById("timer");
    const timerBox = document.getElementById("timerBox");

    timerInterval = setInterval(function() {
        totalSeconds--;

        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        timerEl.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs;

        if (totalSeconds <= 30) {
            timerBox.classList.add("urgent");
        }

        if (totalSeconds <= 0) {
            timerEl.textContent = "0:00";
            timerBox.classList.remove("urgent");
            timerBox.classList.add("locked");
            if (gameActive) {
                document.getElementById("message").textContent = "¡Tiempo agotado! Sin ganador.";
                lockGame();
            }
        }
    }, 1000);
}

function resetGame() {
    turn = false;
    gameActive = true;
    totalSeconds = 180;
    boardState = Array(9).fill(null);
    currentPair = document.getElementById("pairSelect").value;

    document.getElementById("message").textContent = "";
    document.getElementById("turnLabel").textContent = "O";
    document.getElementById("timer").textContent = "3:00";

    const timerBox = document.getElementById("timerBox");
    timerBox.classList.remove("urgent", "locked");

    const table = document.getElementById("gameTable");
    const oldLine = document.getElementById("win-overlay");
    if (oldLine) oldLine.remove();
    table.classList.remove("pair-animals", "pair-fruits", "pair-space");
    if (currentPair !== "classic") {
        table.classList.add("pair-" + currentPair);
    }

    document.querySelectorAll("input[type='button']").forEach(btn => {
        btn.value = "";
        btn.disabled = false;
        btn.classList.remove("X", "O");
    });

    clearInterval(timerInterval);
    updateColors();
    startTimer();
}

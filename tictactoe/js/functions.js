// NUEVO: aplica los colores del picker a las variables CSS en tiempo real
function updateColors() {
    const root = document.documentElement;
    root.style.setProperty('--cell-color-odd',  document.getElementById('cellColor1').value);
    root.style.setProperty('--cell-color-even', document.getElementById('cellColor2').value);
    root.style.setProperty('--winner-color',    document.getElementById('winnerColor').value);
    root.style.setProperty('--line-color',      document.getElementById('lineColor').value);
}

// Estado del turno — igual que el original: false = O, true = X
let turn = false;

// Par de imagenes activo (classic = X y O originales)
let currentPair = "classic";

// Tiempo total en segundos (3 minutos)
let totalSeconds = 180;

// Referencia al intervalo del timer
let timerInterval = null;

// Si el juego esta activo (false = bloqueado)
let gameActive = true;

// Arranca el timer al cargar la pagina y aplica colores iniciales de los pickers
window.onload = function() {
    updateColors();
    startTimer();
};

// --- FUNCION ORIGINAL: active() ---
// Mantiene la logica original, solo agrega: bloqueo por tiempo y update de turno
function active(button) {
    if (!gameActive) return;           // NUEVO: no hace nada si el juego esta bloqueado
    if (button.value !== "") return;   // Evita clics en celdas ocupadas — ORIGINAL

    button.disabled = true; // ORIGINAL

    const symbol = turn ? "X" : "O";
    button.value = symbol;
    button.classList.add(symbol);

    // Guarda en el array de estado — indice de la celda por posicion en el DOM
    const allButtons = Array.from(document.querySelectorAll("input[type='button']"));
    boardState[allButtons.indexOf(button)] = symbol;

    turn = !turn;
    document.getElementById("turnLabel").textContent = turn ? "X" : "O";

    verifyWinner();
}

// Board state array — fuente de verdad unica, no leemos el DOM
// Cada celda es null, "X" o "O", indexada 0-8 de izquierda a derecha, arriba a abajo
let boardState = Array(9).fill(null);

// Combos ganadores — definidos una sola vez, fuera de verifyWinner
const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6]             // diagonales
];

// Verifica si hay ganador despues de cada jugada
function verifyWinner() {
    for (let combo of WIN_COMBOS) {
        const [a, b, c] = combo;
        const val = boardState[a];
        if (val && val === boardState[b] && val === boardState[c]) {
            lockGame(); // Bloquea inmediatamente — sin delay, sin clicks extra posibles
            drawWinLine(combo);
            document.getElementById("message").textContent = "¡Gano " + val + "!";
            return;
        }
    }
    // Empate: todas las celdas llenas sin ganador
    if (boardState.every(cell => cell !== null)) {
        document.getElementById("message").textContent = "¡Empate!";
        lockGame();
    }
}

// Dibuja la linea ganadora como un div real encima del tablero
// Calcula posicion exacta desde las celdas — sin pseudoelementos, sin conflictos
function drawWinLine(combo) {
    const table  = document.getElementById("gameTable");
    const cells  = table.querySelectorAll("td");
    const tableRect = table.getBoundingClientRect();

    const cellA = cells[combo[0]].getBoundingClientRect();
    const cellC = cells[combo[2]].getBoundingClientRect();

    // Centro de la primera y ultima celda ganadora
    const x1 = cellA.left + cellA.width  / 2 - tableRect.left;
    const y1 = cellA.top  + cellA.height / 2 - tableRect.top;
    const x2 = cellC.left + cellC.width  / 2 - tableRect.left;
    const y2 = cellC.top  + cellC.height / 2 - tableRect.top;

    // Longitud y angulo de la linea entre los dos centros
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle  = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    // Crea el div y lo posiciona
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

// NUEVO: bloquea todas las celdas y detiene el timer
function lockGame() {
    gameActive = false;
    clearInterval(timerInterval);
    // Deshabilita solo los botones del juego, no los pickers de color
    document.querySelectorAll("input[type='button']").forEach(btn => {
        btn.disabled = true;
    });
}

// NUEVO: cambia el par de imagenes segun el selector
function changePair() {
    currentPair = document.getElementById("pairSelect").value;
    const table = document.getElementById("gameTable");
    // Quita todas las clases de par anteriores
    table.classList.remove("pair-animals", "pair-fruits", "pair-space");
    // Agrega la clase del par seleccionado (si no es classic no agrega nada)
    if (currentPair !== "classic") {
        table.classList.add("pair-" + currentPair);
    }
}

// NUEVO: inicia el temporizador de 3 minutos
function startTimer() {
    const timerEl  = document.getElementById("timer");
    const timerBox = document.getElementById("timerBox");

    timerInterval = setInterval(function() {
        totalSeconds--;

        // Formatea en mm:ss
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        timerEl.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs;

        // Rojo en los ultimos 30 segundos
        if (totalSeconds <= 30) {
            timerBox.classList.add("urgent");
        }

        // Tiempo agotado
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

// NUEVO: reinicia todo el juego al estado inicial
function resetGame() {
    // Reinicia variables
    turn = false;
    gameActive = true;
    totalSeconds = 180;
    boardState = Array(9).fill(null);
    currentPair = document.getElementById("pairSelect").value;

    // Limpia UI
    document.getElementById("message").textContent = "";
    document.getElementById("turnLabel").textContent = "O";
    document.getElementById("timer").textContent = "3:00";

    const timerBox = document.getElementById("timerBox");
    timerBox.classList.remove("urgent", "locked");

    // Limpia la tabla: quita div de linea de victoria y clases residuales
    const table = document.getElementById("gameTable");
    const oldLine = document.getElementById("win-overlay");
    if (oldLine) oldLine.remove();
    table.classList.remove("pair-animals", "pair-fruits", "pair-space");
    if (currentPair !== "classic") {
        table.classList.add("pair-" + currentPair);
    }

    // Reinicia cada boton
    document.querySelectorAll("input[type='button']").forEach(btn => {
        btn.value = "";
        btn.disabled = false;
        btn.classList.remove("X", "O");
    });

    // Reinicia el timer y reaplica colores
    clearInterval(timerInterval);
    updateColors();
    startTimer();
}

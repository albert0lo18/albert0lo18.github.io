const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');
const displayDado = document.getElementById('valorDado');
const displayContador = document.getElementById('contador');
const btnPausa = document.getElementById('btnPausa');
const btnLento = document.getElementById('btnLento');

// Vértices ajustados para canvas de 1200x1200px
const vertices = [
{ x: 600,  y: 60 },   // Superior
{ x: 60,   y: 940 },  // Inferior Izquierdo
{ x: 1140, y: 940 }   // Inferior Derecho
];

let puntoActual = { x: 0, y: 0 };
let iteraciones = 0;
let corriendo = false;
let pausado = false;
let modoLento = false;

function dibujarPunto(x, y, color, tamano = 1) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, tamano, tamano);
}

function iniciarSimulacion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    iteraciones = 0;
    corriendo = true;
    pausado = false;
    
    btnPausa.innerText = "Pausar";
    btnPausa.classList.remove("btn-reanudar");

    // Dibujar los 3 vértices principales
    vertices.forEach(v => dibujarPunto(v.x, v.y, 'red', 5));

    // Punto inicial aleatorio
    puntoActual.x = Math.random() * canvas.width;
    puntoActual.y = Math.random() * canvas.height;

    buclePrincipal();
}

function alternarPausa() {
    if (!corriendo) return;
    pausado = !pausado;

    if (pausado) {
        btnPausa.innerText = "Reanudar";
        btnPausa.classList.add("btn-reanudar");
    } else {
        btnPausa.innerText = "Pausar";
        btnPausa.classList.remove("btn-reanudar");
        buclePrincipal();
    }
}

function alternarModoLento() {
    modoLento = !modoLento;
    if (modoLento) {
        btnLento.innerText = "Modo Lento: ON";
        btnLento.classList.add("activo");
    } else {
        btnLento.innerText = "Modo Lento: OFF";
        btnLento.classList.remove("activo");
        if (corriendo && !pausado) buclePrincipal();
    }
}

function buclePrincipal() {
    if (!corriendo || pausado) return;

    // Si es modo lento, dibuja de 1 en 1. Si no, de 50 en 50 para compensar el tamaño del canvas.
    const puntosPorCuadro = modoLento ? 1 : 50;

    for (let i = 0; i < puntosPorCuadro; i++) {
        const dado = Math.floor(Math.random() * 6) + 1;
        displayDado.innerText = dado;

        let destino;
        if (dado <= 2) destino = vertices[0];
        else if (dado <= 4) destino = vertices[1];
        else destino = vertices[2];

        // Matemáticas del punto medio
        puntoActual.x = (puntoActual.x + destino.x) / 2;
        puntoActual.y = (puntoActual.y + destino.y) / 2;

        dibujarPunto(puntoActual.x, puntoActual.y, 'black');

        iteraciones++;
        displayContador.innerText = iteraciones.toLocaleString();
    }

    if (iteraciones < 500000) {
        if (modoLento) {
            setTimeout(buclePrincipal, 100); // Retraso de 0.1 seg en modo lento
        } else {
            requestAnimationFrame(buclePrincipal);
        }
    }
}
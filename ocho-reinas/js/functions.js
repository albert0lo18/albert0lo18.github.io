// ============================================================
// OCHO REINAS - functions.js
// Incluye: bloqueo de celdas, selección de imagen de reina,
// colores de tablero, rutas de ataque, soluciones, bloqueo visual
// ============================================================

// --- ESTADO GLOBAL ---
var contador = 0;          // cuántas reinas hay en el tablero
var reinaSeleccionada = 1; // qué imagen de reina usar (1, 2 o 3)

// Imágenes de reinas disponibles (3 opciones)
var reinaImagenes = {
    1: "img/reina.png",     // reina original del proyecto
    2: "img/reina-32.png",  // reina más pequeña incluida
    3: null                 // reina como símbolo unicode (♕)
};

// ----------------------------------------------------------------
// CLICK EN CELDA: coloca o quita reina
// Las celdas bajo ataque de otra reina NO pueden recibir reinas
// ----------------------------------------------------------------
function cellClick(celda, r, c) {

    // Si ya hay una reina aquí: la quitamos
    if (celda.classList.contains("con-reina")) {
        quitarReina(celda);
        recalcularAtaques();
        actualizarContador();
        document.getElementById("mensaje-victoria").textContent = "";
        return;
    }

    // Si la celda está bajo ataque: no se puede colocar (celda bloqueada)
    if (celda.classList.contains("atacada")) {
        document.getElementById("mensaje-victoria").textContent = "✗ Celda bajo ataque — no permitido.";
        return;
    }

    // Colocar reina si hay espacio
    if (contador < 8) {
        ponerReina(celda);
        recalcularAtaques();
        actualizarContador();
        document.getElementById("mensaje-victoria").textContent = "";

        // Verificar victoria
        if (contador === 8) {
            document.getElementById("mensaje-victoria").textContent = "¡FELICIDADES! Solución correcta.";
        }
    }
}

// ----------------------------------------------------------------
// PONER REINA: inserta imagen o símbolo en la celda
// ----------------------------------------------------------------
function ponerReina(celda) {
    celda.classList.add("con-reina");
    celda.innerHTML = ""; // limpiar contenido previo

    var src = reinaImagenes[reinaSeleccionada];

    if (src) {
        // Usar imagen
        var img = document.createElement("img");
        img.src = src;
        img.className = "reina-img";
        img.alt = "Reina";
        celda.appendChild(img);
    } else {
        // Usar símbolo unicode
        celda.textContent = "♕";
        celda.style.fontSize = "38px";
        celda.style.color = "#111";
    }

    contador++;
}

// ----------------------------------------------------------------
// QUITAR REINA: limpia la celda
// ----------------------------------------------------------------
function quitarReina(celda) {
    celda.classList.remove("con-reina");
    celda.innerHTML = "";
    celda.style.fontSize = "";
    celda.style.color = "";
    contador--;
}

// ----------------------------------------------------------------
// RECALCULAR ATAQUES: limpia y vuelve a marcar todas las rutas
// ----------------------------------------------------------------
function recalcularAtaques() {
    var tablero = document.getElementById("tablero");

    // 1. Limpiar marcas de ataque en celdas sin reina
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var celda = tablero.rows[i].cells[j];
            if (!celda.classList.contains("con-reina")) {
                celda.classList.remove("atacada");
                celda.classList.remove("marcada-x");
            }
        }
    }

    // 2. Para cada reina, marcar su ruta de ataque
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (tablero.rows[i].cells[j].classList.contains("con-reina")) {
                marcarAtaqueReina(i, j);
            }
        }
    }
}

// ----------------------------------------------------------------
// MARCAR ATAQUE: resalta fila, columna y diagonales de una reina
// ----------------------------------------------------------------
function marcarAtaqueReina(r, c) {
    var tablero = document.getElementById("tablero");

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            // misma fila, misma columna, o diagonal
            if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
                if (!(i === r && j === c)) { // no la celda de la reina misma
                    var celda = tablero.rows[i].cells[j];
                    if (!celda.classList.contains("con-reina")) {
                        celda.classList.add("atacada"); // resaltar con color
                        celda.classList.add("marcada-x");
                    }
                }
            }
        }
    }
}

// ----------------------------------------------------------------
// HOVER: preview de ataque al pasar el mouse (solo celdas vacías)
// ----------------------------------------------------------------
function cambiar(r, c) {
    var tablero = document.getElementById("tablero");
    var celda = tablero.rows[r].cells[c];

    // No mostrar preview si tiene reina o está bajo ataque
    if (celda.classList.contains("con-reina")) return;
    if (celda.classList.contains("atacada")) return;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
                var c2 = tablero.rows[i].cells[j];
                if (!c2.classList.contains("con-reina")) {
                    c2.dataset.hover = "1"; // marcar para limpiar después
                    c2.style.opacity = "0.7"; // efecto visual sutil
                }
            }
        }
    }
}

// ----------------------------------------------------------------
// LIMPIAR HOVER: quita el efecto de preview del mouse
// ----------------------------------------------------------------
function limpiar() {
    var celdas = document.getElementsByTagName("td");
    for (var i = 0; i < celdas.length; i++) {
        if (celdas[i].dataset.hover === "1") {
            celdas[i].style.opacity = "";
            delete celdas[i].dataset.hover;
        }
    }
}

// ----------------------------------------------------------------
// REINICIAR TABLERO: limpia todo, incluyendo bloqueos
// ----------------------------------------------------------------
function reiniciarTablero() {
    var celdas = document.getElementsByTagName("td");
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
        celdas[i].style.fontSize = "";
        celdas[i].style.color = "";
        celdas[i].style.opacity = "";
        celdas[i].classList.remove("con-reina", "atacada", "marcada-x");
        delete celdas[i].dataset.hover;
    }
    contador = 0;
    actualizarContador();
    document.getElementById("mensaje-victoria").textContent = "";
}

// ----------------------------------------------------------------
// ACTUALIZAR CONTADOR: refresca el número en pantalla
// ----------------------------------------------------------------
function actualizarContador() {
    document.getElementById("num-reinas").textContent = contador;
}

// ----------------------------------------------------------------
// CAMBIAR IMAGEN DE REINA: actualiza la variable y redibuja
// ----------------------------------------------------------------
function cambiarImagenReina(num) {
    reinaSeleccionada = parseInt(num);
    // Redibujar todas las reinas existentes con la nueva imagen
    var tablero = document.getElementById("tablero");
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var celda = tablero.rows[i].cells[j];
            if (celda.classList.contains("con-reina")) {
                celda.innerHTML = ""; // limpiar
                var src = reinaImagenes[reinaSeleccionada];
                if (src) {
                    var img = document.createElement("img");
                    img.src = src;
                    img.className = "reina-img";
                    img.alt = "Reina";
                    celda.appendChild(img);
                    celda.style.fontSize = "";
                    celda.style.color = "";
                } else {
                    celda.textContent = "♕";
                    celda.style.fontSize = "38px";
                    celda.style.color = "#111";
                }
            }
        }
    }
}

// ----------------------------------------------------------------
// ACTUALIZAR COLORES DEL TABLERO: aplica los colores elegidos
// ----------------------------------------------------------------
function actualizarTablero() {
    var claro = document.getElementById("colorClaro").value;
    var oscuro = document.getElementById("colorOscuro").value;
    document.documentElement.style.setProperty("--color-claro", claro);
    document.documentElement.style.setProperty("--color-oscuro", oscuro);
}

// ----------------------------------------------------------------
// PONER SOLUCIÓN: carga una solución predefinida en el tablero
// patron = string de 8 dígitos, cada dígito = columna de la reina en esa fila
// ----------------------------------------------------------------
function ponerSolucion(patron) {
    reiniciarTablero(); // limpiar todo primero

    var tablero = document.getElementById("tablero");

    for (var i = 0; i < 8; i++) {
        var col = parseInt(patron[i]); // columna para la fila i
        var celda = tablero.rows[i].cells[col];
        ponerReina(celda); // usar la función principal para consistencia
    }

    // recalcular no marca ataques en soluciones válidas (está ok)
    recalcularAtaques();
    document.getElementById("mensaje-victoria").textContent = "✓ Solución cargada correctamente.";
}

// ----------------------------------------------------------------
// VERIFICAR SOLUCIÓN VÁLIDA: chequea que no haya 2 reinas en la misma línea
// ----------------------------------------------------------------
function verificarSolucionValida() {
    var tablero = document.getElementById("tablero");
    var posiciones = [];

    // Recolectar posiciones de reinas
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (tablero.rows[i].cells[j].classList.contains("con-reina")) {
                posiciones.push([i, j]);
            }
        }
    }

    // Verificar que no haya conflictos entre pares
    for (var a = 0; a < posiciones.length; a++) {
        for (var b = a + 1; b < posiciones.length; b++) {
            var r1 = posiciones[a][0], c1 = posiciones[a][1];
            var r2 = posiciones[b][0], c2 = posiciones[b][1];
            if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                return false; // hay conflicto
            }
        }
    }
    return true; // sin conflictos
}

// ----------------------------------------------------------------
// INIT: al cargar la página, aplicar colores y estado inicial
// ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    actualizarTablero();
});

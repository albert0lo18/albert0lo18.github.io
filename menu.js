// ============================================================
// menu.js - Lógica del menú con previsualización en iframe
// ============================================================

var enlaceActivo = null; // botón que está cargado actualmente en el iframe

// ----------------------------------------------------------------
// PREVISUALIZAR EN IFRAME: cambia el src al pasar el cursor
// ----------------------------------------------------------------
function previsualizarEn(ruta, enlace) {
    var iframe = document.getElementById("preview");
    var placeholder = document.getElementById("placeholder");

    // Cargar la ruta en el iframe
    iframe.src = ruta;

    // Ocultar el placeholder
    placeholder.classList.add("oculto");

    // Marcar visualmente el botón activo
    quitarActivo();
    enlace.classList.add("activo");
    enlaceActivo = enlace;
}

// ----------------------------------------------------------------
// RESTAURAR ACTIVO: al quitar el cursor, mantiene el último cargado
// ----------------------------------------------------------------
function restaurarActivo() {
    // No hace nada — el iframe conserva el último programa cargado
    // El botón activo se mantiene para indicar qué está en pantalla
}

// ----------------------------------------------------------------
// QUITAR ACTIVO: limpia la clase activo de todos los botones
// ----------------------------------------------------------------
function quitarActivo() {
    var botones = document.querySelectorAll(".menu a");
    botones.forEach(function(btn) {
        btn.classList.remove("activo");
    });
}

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
// RESTAURAR ACTIVO: al quitar el cursor, vuelve al estado inicial
// ----------------------------------------------------------------
function restaurarActivo() {
    var iframe = document.getElementById("preview");
    var placeholder = document.getElementById("placeholder");

    // Limpiar el src del iframe (lo deja vacío)
    iframe.src = "about:blank";

    // Mostrar el placeholder quitando la clase que la oculta
    placeholder.classList.remove("oculto");

    // Quitar el estilo resaltado del botón
    quitarActivo();
    enlaceActivo = null;
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
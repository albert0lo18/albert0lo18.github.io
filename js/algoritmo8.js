
function Generar() {
    document.getElementById("cuadrado").innerHTML = "";
    document.getElementById("resultados").innerHTML = ""; // Limpiar resultados previos

    var lados = parseInt(document.getElementById("lados").value);
    var tabla = document.getElementById("cuadrado");

    for (let r = 0; r < lados; r++) {
        var nuevaFila = tabla.insertRow(-1);
        for (let c = 0; c < lados; c++) {
            var celda = nuevaFila.insertCell(-1);
            var entrada = document.createElement("input");
            entrada.setAttribute("type", "number");
            entrada.setAttribute("required", "required");
            entrada.setAttribute("value", Aleatorio());
            celda.appendChild(entrada);
        }
    }
}

function Aleatorio() {
    return Math.floor(Math.random() * 100) + 1;
}

function Calcular() {
    var tabla = document.getElementById("cuadrado");
    var filas = tabla.rows.length;
    var esCuadradoMagico = true;
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores

    // Sumar la primera fila como referencia
    var sumaReferencia = 0;
    for (let i = 0; i < filas; i++) {
        sumaReferencia += parseInt(tabla.rows[0].cells[i].children[0].value);
    }

    // Verificar filas
    for (let r = 1; r < filas; r++) {
        var sumaFila = 0;
        for (let c = 0; c < filas; c++) {
            sumaFila += parseInt(tabla.rows[r].cells[c].children[0].value);
        }
        if (sumaFila !== sumaReferencia) {
            esCuadradoMagico = false;
            break;
        }
    }

    // Verificar columnas
    if (esCuadradoMagico) {
        for (let c = 0; c < filas; c++) {
            var sumaColumna = 0;
            for (let r = 0; r < filas; r++) {
                sumaColumna += parseInt(tabla.rows[r].cells[c].children[0].value);
            }
            if (sumaColumna !== sumaReferencia) {
                esCuadradoMagico = false;
                break;
            }
        }
    }

    // Verificar diagonales
    if (esCuadradoMagico) {
        var sumaDiagonal1 = 0;
        var sumaDiagonal2 = 0;
        for (let i = 0; i < filas; i++) {
            sumaDiagonal1 += parseInt(tabla.rows[i].cells[i].children[0].value);
            sumaDiagonal2 += parseInt(tabla.rows[i].cells[filas - i - 1].children[0].value);
        }
        if (sumaDiagonal1 !== sumaReferencia || sumaDiagonal2 !== sumaReferencia) {
            esCuadradoMagico = false;
        }
    }

    // Mostrar resultados si es cuadrado mágico
    if (esCuadradoMagico) {
        resultadosDiv.innerHTML += "<strong>¡Es un cuadrado mágico!</strong><br><br>";

        // Mostrar operaciones de las filas
        for (let r = 0; r < filas; r++) {
            var sumaFila = 0;
            var operacionesFila = "";
            for (let c = 0; c < filas; c++) {
                var valor = parseInt(tabla.rows[r].cells[c].children[0].value);
                sumaFila += valor;
                operacionesFila += valor + (c < filas - 1 ? " + " : ""); // Construir la operación
            }
            resultadosDiv.innerHTML += operacionesFila + " = " + sumaFila + "<br>";
        }

        // Mostrar operaciones de las columnas
        for (let c = 0; c < filas; c++) {
            var sumaColumna = 0;
            var operacionesColumna = "";
            for (let r = 0; r < filas; r++) {
                var valor = parseInt(tabla.rows[r].cells[c].children[0].value);
                sumaColumna += valor;
                operacionesColumna += valor + (r < filas - 1 ? " + " : ""); // Construir la operación
            }
            resultadosDiv.innerHTML += operacionesColumna + " = " + sumaColumna + "<br>";
        }

        // Mostrar operaciones de las diagonales
        var sumaDiagonal1 = 0, sumaDiagonal2 = 0;
        var operacionesDiagonal1 = "", operacionesDiagonal2 = "";
        for (let i = 0; i < filas; i++) {
            var valorDiagonal1 = parseInt(tabla.rows[i].cells[i].children[0].value);
            var valorDiagonal2 = parseInt(tabla.rows[i].cells[filas - i - 1].children[0].value);
            sumaDiagonal1 += valorDiagonal1;
            sumaDiagonal2 += valorDiagonal2;
            operacionesDiagonal1 += valorDiagonal1 + (i < filas - 1 ? " + " : "");
            operacionesDiagonal2 += valorDiagonal2 + (i < filas - 1 ? " + " : "");
        }
        resultadosDiv.innerHTML += "Diagonal principal: " + operacionesDiagonal1 + " = " + sumaDiagonal1 + "<br>";
        resultadosDiv.innerHTML += "Diagonal secundaria: " + operacionesDiagonal2 + " = " + sumaDiagonal2 + "<br>";

    } else {
        resultadosDiv.innerHTML = "<strong>No es un cuadrado mágico.</strong>";
    }
}
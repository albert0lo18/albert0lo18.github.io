var contador = 0;

function capturar() {
    var valor = parseInt(document.getElementById("elemento").value);
    var mensaje = document.getElementById("mensaje");

    // Oculta el mensaje por defecto
    mensaje.style.display = "none";

    if (isNaN(valor) || !Number.isInteger(valor)) {
        mensaje.innerHTML = "Por favor, ingrese un número válido.";
        mensaje.style.display = "inline"; // Muestra el mensaje
        return;
    }

    // Agregar a la tabla horizontal
    var RenglonIndice = document.getElementById("renglon");
    RenglonIndice.insertCell(-1).innerHTML = `[${contador}]`;
    var RenglonDato = document.getElementById("renglon2");
    RenglonDato.insertCell(-1).innerHTML = valor;

    // Agregar a la tabla vertical
    var Tabla = document.getElementById("vertical");
    var RenglonVertical = Tabla.insertRow(-1);
    RenglonVertical.insertCell(0).innerHTML = `[${contador}]`;
    RenglonVertical.insertCell(1).innerHTML = valor;

    if (contador < 9) {
        document.getElementById("numero").innerHTML = `Elemento [${++contador}]:`;
    } else if (contador == 9) {
        document.getElementById("numero").innerHTML = `Elemento [9]:`;
        document.getElementById("elemento").disabled = true;
        document.getElementById("capturarboton").disabled = true;
    }
}

function random() {
    document.getElementById("elemento").value = Math.floor(Math.random() * 1000);
}

function reiniciar() {
    contador = 0;
    document.getElementById("elemento").value = "";
    document.getElementById("elemento").disabled = false;
    document.getElementById("capturarboton").disabled = false;
    document.getElementById("numero").innerHTML = `Elemento [0]:`;

    // Elimina todas las celdas en las filas horizontales
    document.getElementById("renglon").innerHTML = "";
    document.getElementById("renglon2").innerHTML = "";

    // Elimina todas las filas de las tablas verticales
    document.getElementById("vertical").innerHTML = "";
    document.getElementById("verticalAsc").innerHTML = "";
    document.getElementById("verticalDesc").innerHTML = "";

    // Elimina todas las celdas en las filas horizontales ordenadas
    document.getElementById("renglonAsc").innerHTML = "";
    document.getElementById("renglonAscValores").innerHTML = "";
    document.getElementById("renglonDesc").innerHTML = "";
    document.getElementById("renglonDescValores").innerHTML = "";

    // Reinicia el resultado
    document.getElementById("out").innerHTML = `Resultado: `;
}

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Intercambiar los elementos
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function calcularModa(arr) {
    const frecuencia = {};
    let maxFrecuencia = 0;
    let moda = [];

    for (const num of arr) {
        frecuencia[num] = (frecuencia[num] || 0) + 1;
        if (frecuencia[num] > maxFrecuencia) {
            maxFrecuencia = frecuencia[num];
            moda = [num];
        } else if (frecuencia[num] === maxFrecuencia) {
            moda.push(num);
        }
    }

    if (maxFrecuencia === 1) {
        return [];
    }

    return moda;
}

function calcularMediana(arr) {
    return (arr[4] + arr[5]) / 2;  // Elementos en las posiciones 4 y 5 después de ordenar
}

function Calcular() {
    var Celdas = document.getElementById("renglon2").children;
    var valores = [];

    // Recolectar los valores de la tabla
    for (var i = 0; i < Celdas.length; i++) {
        valores.push(parseInt(Celdas[i].innerHTML));
    }

    // Si no hay valores, muestra un mensaje
    if (valores.length === 0) {
        alert("Por favor, ingresa al menos un valor.");
        return;
    }

    // Ordenar usando Bubble Sort
    var valoresAsc = bubbleSort([...valores]);

    // Obtener valores en orden descendente invirtiendo el array
    var valoresDesc = [...valoresAsc].reverse();

    var menor = valoresAsc[0];
    var mayor = valoresAsc[valoresAsc.length - 1];
    var suma = valoresAsc.reduce((a, b) => a + b, 0);

    // Calcular moda
    var moda = calcularModa(valores);

    // Calcular mediana
    var mediana = calcularMediana(valoresAsc);

    // Mostrar los resultados
    document.getElementById("out").innerHTML = `Resultado: <br>
        Menor: ${menor} <br>
        Mayor: ${mayor} <br>
        Suma: ${suma} <br>
        Moda: ${moda.length > 0 ? moda.join(', ') : 'No hay moda'} <br>
        Mediana: ${mediana}`;

    // Generar las tablas ordenadas
    generarTablasOrdenadas(valoresAsc, valoresDesc);
}

function generarTablasOrdenadas(valoresAsc, valoresDesc) {
    // Limpiar antes de agregar nuevos datos
    document.getElementById("renglonAsc").innerHTML = "";
    document.getElementById("renglonAscValores").innerHTML = "";
    document.getElementById("renglonDesc").innerHTML = "";
    document.getElementById("renglonDescValores").innerHTML = "";
    document.getElementById("verticalAsc").innerHTML = "";
    document.getElementById("verticalDesc").innerHTML = "";

    // Tabla horizontal ordenada de menor a mayor
    var renglonAsc = document.getElementById("renglonAsc");
    for (var i = 0; i < valoresAsc.length; i++) {
        renglonAsc.insertCell(-1).innerHTML = `[${i}]`;
    }
    var renglonAscValores = document.getElementById("renglonAscValores");
    for (var i = 0; i < valoresAsc.length; i++) {
        renglonAscValores.insertCell(-1).innerHTML = valoresAsc[i];
    }

    // Tabla horizontal ordenada de mayor a menor
    var renglonDesc = document.getElementById("renglonDesc");
    for (var i = 0; i < valoresDesc.length; i++) {
        renglonDesc.insertCell(-1).innerHTML = `[${i}]`;
    }
    var renglonDescValores = document.getElementById("renglonDescValores");
    for (var i = 0; i < valoresDesc.length; i++) {
        renglonDescValores.insertCell(-1).innerHTML = valoresDesc[i];
    }

    // Tabla vertical ordenada de menor a mayor
    var tablaAsc = document.getElementById("verticalAsc");
    for (var i = 0; i < valoresAsc.length; i++) {
        var renglon = tablaAsc.insertRow(-1);
        renglon.insertCell(0).innerHTML = `[${i}]`;
        renglon.insertCell(1).innerHTML = valoresAsc[i];
    }

    // Tabla vertical ordenada de mayor a menor
    var tablaDesc = document.getElementById("verticalDesc");
    for (var i = 0; i < valoresDesc.length; i++) {
        var renglon = tablaDesc.insertRow(-1);
        renglon.insertCell(0).innerHTML = `[${i}]`;
        renglon.insertCell(1).innerHTML = valoresDesc[i];
    }
}
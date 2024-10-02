var tarjetas = [
    "1.jpg", "1.jpg", "2.jpg", "2.jpg",
    "3.jpg", "3.jpg", "4.jpg", "4.jpg",
    "5.jpg", "5.jpg", "6.jpg", "6.jpg",
    "7.jpg", "7.jpg", "8.jpg", "8.jpg"
];

var imagen_temporal, esperando = false;
var contador = 0;
var intentos = 0;

function CambiarImagen(imagen, indice) {
    imagen.src = `./img/${tarjetas[indice]}`;
    imagen.removeAttribute("onclick");
     // Aumenta intentos al hacer clic

    if (!esperando) {
        imagen_temporal = imagen;
    } else {
        if (imagen_temporal.src === imagen.src) {
            setTimeout(function() { EliminarPar(imagen_temporal, imagen) }, 500);
            contador++;
            if (contador != 8) {
                document.getElementById("contador").innerHTML = `Pares Encontrados: ${contador} - Intentos: ${intentos}`;
            } else {
                document.getElementById("contador").innerHTML = `¡Ganaste en ${intentos} intentos!`;
            }
        } else {
            setTimeout(function() { Regresar(imagen_temporal, imagen) }, 500);
            intentos++;
            if (contador != 8) {
                document.getElementById("contador").innerHTML = `Pares Encontrados: ${contador} - Intentos: ${intentos}`;
            } else {
                document.getElementById("contador").innerHTML = `¡Ganaste en ${intentos} intentos!`;
            }
        }
    }

    
    esperando = !esperando;
}

function Regresar(imagen1, imagen2) {
    imagen1.src = "./img/0.jpg";
    imagen2.src = "./img/0.jpg";
    imagen1.setAttribute("onclick", `CambiarImagen(this, ${imagen1.id})`);
    imagen2.setAttribute("onclick", `CambiarImagen(this, ${imagen2.id})`);
}

function EliminarPar(imagen1, imagen2) {
    imagen1.style.visibility = "hidden";
    imagen2.style.visibility = "hidden";
    imagen1.removeAttribute("onclick");
    imagen2.removeAttribute("onclick");
   
}

function Revolver() {
    var j = 0;
    for (let i = tarjetas.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [tarjetas[i], tarjetas[j]] = [tarjetas[j], tarjetas[i]];                
    }
}

function CambiarFondo() {
    var fondos = ["fondo1.jpg", "fondo2.jpg", "fondo3.jpg"];
    var fondoAleatorio = fondos[Math.floor(Math.random() * fondos.length)];
    console.log(`Cambiando fondo a: ${fondoAleatorio}`); // Este log te ayudará a ver qué fondo se elige
    document.getElementById("tablita").style.backgroundImage = `url("./img/${fondoAleatorio}")`;
}


function Reiniciar() {
    location.reload();
}
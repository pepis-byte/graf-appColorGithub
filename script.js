/* ==========================================================
   REFERENCIAS A LOS ELEMENTOS HTML
   ========================================================== */


/*
   Sliders RGB
*/

const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const azul = document.getElementById("azul");


/*
   Campos numéricos RGB
*/

const valorRojo = document.getElementById("valorRojo");
const valorVerde = document.getElementById("valorVerde");
const valorAzul = document.getElementById("valorAzul");


/*
   Elementos de visualización
*/

const colorBox = document.getElementById("colorBox");
const aguila = document.getElementById("aguila");

const rgbColor = document.getElementById("rgbColor");
const hexColorText = document.getElementById("hexColorText");


/*
   Selector de color
*/

const colorPicker = document.getElementById("colorPicker");


/*
   Botones
*/

const copiarRGB = document.getElementById("copiarRGB");
const copiarHEX = document.getElementById("copiarHEX");
const restablecer = document.getElementById("restablecer");



/* ==========================================================
   FUNCIÓN RGB → HEX
   ========================================================== */


/*
   Convierte tres valores RGB:

   Ejemplo:

   R = 194
   G = 123
   B = 76

   En:

   #C27B4C
*/

function convertirHexadecimal(r, g, b) {

    const rojoHex = Number(r)
        .toString(16)
        .padStart(2, "0");


    const verdeHex = Number(g)
        .toString(16)
        .padStart(2, "0");


    const azulHex = Number(b)
        .toString(16)
        .padStart(2, "0");


    return `#${rojoHex}${verdeHex}${azulHex}`.toUpperCase();

}



/* ==========================================================
   FUNCIÓN HEX → RGB
   ========================================================== */


/*
   El input type="color" entrega el color
   en formato hexadecimal.

   Ejemplo:

   #C27B4C

   Esta función lo convierte a:

   R = 194
   G = 123
   B = 76
*/

function hexadecimalARgb(hex) {

    /*
       Quitamos el símbolo #
    */

    hex = hex.replace("#", "");


    /*
       Obtenemos el rojo
    */

    const r = parseInt(
        hex.substring(0, 2),
        16
    );


    /*
       Obtenemos el verde
    */

    const g = parseInt(
        hex.substring(2, 4),
        16
    );


    /*
       Obtenemos el azul
    */

    const b = parseInt(
        hex.substring(4, 6),
        16
    );


    /*
       Regresamos los tres valores
    */

    return {
        r: r,
        g: g,
        b: b
    };

}



/* ==========================================================
   ACTUALIZAR COLOR
   ========================================================== */


/*
   Esta es la función principal de la aplicación.

   Se ejecuta cuando:

   - Movemos un slider.
   - Escribimos un número.
   - Elegimos un color.

   Actualiza:

   - Águila
   - Fondo
   - RGB
   - HEX
   - Selector de color
   - Valores numéricos
*/
function actualizarColor() {

    const r = Number(rojo.value);
    const g = Number(verde.value);
    const b = Number(azul.value);

    valorRojo.value = r;
    valorVerde.value = g;
    valorAzul.value = b;

    const colorRGB = `rgb(${r}, ${g}, ${b})`;

    const colorHEX = convertirHexadecimal(r, g, b);


    /* =========================================
       CAMBIAR SOLAMENTE EL FONDO
       ========================================= */

    colorBox.style.backgroundColor = colorRGB;


    /* =========================================
       MOSTRAR RGB
       ========================================= */

    rgbColor.textContent = colorRGB;


    /* =========================================
       MOSTRAR HEX
       ========================================= */

    hexColorText.textContent = colorHEX;


    /* =========================================
       ACTUALIZAR SELECTOR
       ========================================= */

    colorPicker.value = colorHEX;

}



/* ==========================================================
   EVENTOS DE LOS SLIDERS
   ========================================================== */


/*
   Cuando movemos el slider de ROJO,
   actualizamos el color.
*/

rojo.addEventListener(
    "input",
    actualizarColor
);


/*
   Cuando movemos el slider de VERDE.
*/

verde.addEventListener(
    "input",
    actualizarColor
);


/*
   Cuando movemos el slider de AZUL.
*/

azul.addEventListener(
    "input",
    actualizarColor
);



/* ==========================================================
   EVENTOS DE LOS CAMPOS NUMÉRICOS
   ========================================================== */


/*
   Función auxiliar para asegurarnos
   de que el valor esté entre 0 y 255.
*/

function limitarValor(valor) {

    if (valor < 0) {

        return 0;

    }


    if (valor > 255) {

        return 255;

    }


    return valor;

}



/* ==========================================================
   CAMPO ROJO
   ========================================================== */

valorRojo.addEventListener(
    "input",
    function () {


        /*
           Convertimos el texto a número
        */

        let valor = Number(valorRojo.value);


        /*
           Limitamos entre 0 y 255
        */

        valor = limitarValor(valor);


        /*
           Actualizamos el número
        */

        valorRojo.value = valor;


        /*
           Actualizamos el slider
        */

        rojo.value = valor;


        /*
           Actualizamos el color
        */

        actualizarColor();

    }
);



/* ==========================================================
   CAMPO VERDE
   ========================================================== */

valorVerde.addEventListener(
    "input",
    function () {


        let valor = Number(valorVerde.value);


        valor = limitarValor(valor);


        valorVerde.value = valor;


        verde.value = valor;


        actualizarColor();

    }
);



/* ==========================================================
   CAMPO AZUL
   ========================================================== */

valorAzul.addEventListener(
    "input",
    function () {


        let valor = Number(valorAzul.value);


        valor = limitarValor(valor);


        valorAzul.value = valor;


        azul.value = valor;


        actualizarColor();

    }
);



/* ==========================================================
   SELECTOR DE COLOR
   ========================================================== */


/*
   El selector entrega HEX.

   Ejemplo:

   #FF0000

   Lo convertimos a:

   R = 255
   G = 0
   B = 0
*/

colorPicker.addEventListener(
    "input",
    function () {


        /*
           Obtener HEX
        */

        const hex = colorPicker.value;


        /*
           Convertir HEX → RGB
        */

        const rgb = hexadecimalARgb(hex);



        /*
           Actualizar sliders
        */

        rojo.value = rgb.r;

        verde.value = rgb.g;

        azul.value = rgb.b;



        /*
           actualizarColor() se encarga
           del resto de elementos.
        */

        actualizarColor();

    }
);



/* ==========================================================
   COPIAR RGB
   ========================================================== */


/*
   Al presionar "Copiar RGB",
   copiamos el valor mostrado.
*/

copiarRGB.addEventListener(
    "click",
    function () {


        navigator.clipboard.writeText(
            rgbColor.textContent
        );


        /*
           Cambiamos temporalmente el texto
           del botón para indicar que se copió.
        */

        const textoOriginal = copiarRGB.innerHTML;


        copiarRGB.innerHTML =
            '<i class="bi bi-check-lg"></i> Copiado';


        setTimeout(
            function () {

                copiarRGB.innerHTML = textoOriginal;

            },
            1500
        );

    }
);



/* ==========================================================
   COPIAR HEX
   ========================================================== */

copiarHEX.addEventListener(
    "click",
    function () {


        navigator.clipboard.writeText(
            hexColorText.textContent
        );


        const textoOriginal = copiarHEX.innerHTML;


        copiarHEX.innerHTML =
            '<i class="bi bi-check-lg"></i> Copiado';


        setTimeout(
            function () {

                copiarHEX.innerHTML = textoOriginal;

            },
            1500
        );

    }
);



/* ==========================================================
   RESTABLECER
   ========================================================== */


/*
   Valores iniciales:

   R = 194
   G = 123
   B = 76

   HEX = #C27B4C
*/

restablecer.addEventListener(
    "click",
    function () {


        rojo.value = 194;

        verde.value = 123;

        azul.value = 76;


        valorRojo.value = 194;

        valorVerde.value = 123;

        valorAzul.value = 76;


        colorPicker.value = "#C27B4C";


        actualizarColor();

    }
);



/* ==========================================================
   INICIALIZAR APLICACIÓN
   ========================================================== */


/*
   Ejecutamos la función una vez al cargar
   la página para que todos los valores
   estén sincronizados.
*/

actualizarColor();
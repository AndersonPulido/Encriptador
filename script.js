// Guarda un historial de los mensajes originales junto con los encriptados
const encryptedMessages = [];

// Función para encriptar el texto ingresado por el usuario
function encryptText() {
    const input = document.getElementById('inputText').value; // Obtiene el texto ingresado por el usuario
    if (input.trim() === "" || !/^[a-z\s]*$/.test(input)) { // Verifica si el texto está vacío o contiene caracteres no permitidos
        alert("Por favor, ingresa solo texto en minúsculas sin acentos ni caracteres especiales."); // Muestra una alerta si no cumple los requisitos
        return; // Sale de la función si no hay texto válido
    }

    const encrypted = input
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat"); // Realiza las sustituciones para encriptar

    document.getElementById('decryptInput').value = encrypted; // Muestra el texto encriptado en el área de desencriptado
    encryptedMessages.push({ original: input, encrypted: encrypted }); // Guarda el mensaje original y encriptado en el historial
    addEncryptedMessageToList(input, encrypted); // Añade el mensaje encriptado a la lista visual en la página
}

// Función para desencriptar el texto ingresado por el usuario
function decryptText() {
    const encrypted = document.getElementById('decryptInput').value; // Obtiene el texto encriptado ingresado
    if (encrypted.trim() === "" || !/^[a-z\s]*$/.test(encrypted)) { // Verifica si el texto está vacío o contiene caracteres no permitidos
        alert("Por favor, ingresa solo texto en minúsculas sin acentos ni caracteres especiales."); // Muestra una alerta si no cumple los requisitos
        return; // Sale de la función si no hay texto válido
    }

    const decrypted = encrypted
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u"); // Realiza las sustituciones para desencriptar

    document.getElementById('decryptedText').innerText = decrypted; // Muestra el resultado desencriptado
    document.getElementById('decryptedText').classList.remove('warning'); // Remueve la clase de advertencia si estaba presente
}

// Añade un mensaje encriptado a la lista visual en la página
function addEncryptedMessageToList(original, encrypted) {
    const list = document.getElementById('encryptedMessagesList'); // Obtiene la lista donde se mostrarán los mensajes encriptados
    const listItem = document.createElement('li'); // Crea un nuevo elemento de lista
    listItem.textContent = encrypted; // Establece el texto del elemento de lista como el mensaje encriptado

    // Añade un evento al hacer clic para mostrar el mensaje original
    listItem.onclick = () => {
        alert(`Mensaje original: ${original}`); // Muestra el mensaje original en una alerta
    };

    // Crea un botón para copiar el mensaje encriptado
    const copyButton = document.createElement('button');
    copyButton.textContent = "Copiar"; // Texto del botón
    copyButton.classList.add('copy-btn'); // Añade una clase CSS al botón
    copyButton.onclick = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón active el clic en el listItem
        copyToClipboard(encrypted); // Copia el mensaje encriptado al portapapeles
        alert("Texto encriptado copiado al portapapeles."); // Muestra una alerta confirmando la copia
    };

    listItem.appendChild(copyButton); // Añade el botón de copiar al elemento de lista
    list.appendChild(listItem); // Añade el elemento de lista a la lista visual
}

// Función para eliminar todos los mensajes encriptados
function deleteAllMessages() {
    encryptedMessages.length = 0; // Limpia el array que almacena los mensajes encriptados
    document.getElementById('encryptedMessagesList').innerHTML = ''; // Limpia la lista visual en la página
    alert("Todos los mensajes encriptados han sido eliminados."); // Muestra una alerta confirmando la eliminación
}

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    const textarea = document.createElement('textarea'); // Crea un elemento de texto oculto
    textarea.value = text; // Establece el valor del textarea como el texto a copiar
    document.body.appendChild(textarea); // Añade el textarea al DOM
    textarea.select(); // Selecciona el texto dentro del textarea
    document.execCommand('copy'); // Ejecuta el comando de copiar
    document.body.removeChild(textarea); // Remueve el textarea del DOM
}

// Variables de estado (Cerebro del timer)
let timeLeft = 25 * 60; // 25 minutos convertidos a segundos
let timerId = null;     // Aquí guardaremos el intervalo para poder detenerlo

// Capturamos los elementos del HTML
const display = document.getElementById('timer-display');
const btn = document.getElementById('timer-btn');

// Función 1: Actualizar lo que el usuario ve
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // padStart asegura que siempre veamos 05:09 en lugar de 5:9
    display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Función 2: La lógica de iniciar/pausar
function toggleTimer() {
    if (timerId) {
        // Si el timer ya está corriendo, lo PAUSAMOS
        clearInterval(timerId);
        timerId = null;
        btn.innerText = "REANUDAR";
        btn.classList.add('bg-indigo-100', 'text-brand'); // Cambio visual
    } else {
        // Si está detenido, lo INICIAMOS
        btn.innerText = "PAUSAR";
        btn.classList.remove('bg-indigo-100');
        
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--; // Restamos 1 segundo
                updateDisplay();
            } else {
                // Se acabó el tiempo
                clearInterval(timerId);
                alert("¡Buen trabajo, Mauro! Tómate un descanso.");
                timeLeft = 25 * 60; // Reiniciamos
                updateDisplay();
            }
        }, 1000); // Se ejecuta cada 1000 milisegundos (1 segundo)
    }
}

// Escuchamos el click del botón
btn.addEventListener('click', toggleTimer);

// Inicializamos la vista en 25:00
updateDisplay();
// Usamos una función para envolver todo y asegurar que el DOM exista
function initTimer() {
    // Obtener referencias a los elementos del DOM
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('timer-btn');
    const timeInput = document.getElementById('timer-input');

    // Verificación de seguridad: si no existen, no ejecutes nada
    if (!display || !btn || !timeInput) return;

    // Convertir el tiempo de minutos a segundos
    let timeLeft = parseInt(timeInput.value) * 60; 
    let timerId = null;

    // Función para actualizar el display del temporizador
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Cambiamos 'change' por 'input' para que sea instantáneo
    timeInput.addEventListener('input', () => {
        if (!timerId) {
            let value = parseInt(timeInput.value);
            if (isNaN(value) || value < 1) value = 0;
            timeLeft = value * 60;
            updateDisplay();
        }
    });

    // Función para iniciar o pausar el temporizador
    function toggleTimer() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            btn.innerText = "REANUDAR";
            timeInput.disabled = false;
        } else {
            // Si el tiempo es 0, no iniciar
            if (timeLeft <= 0) return alert("Ingresa un tiempo válido");

            btn.innerText = "PAUSAR";
            timeInput.disabled = true;

            // Iniciar el temporizador
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerId);
                    alert("¡Sesión terminada, Mauro!");
                    btn.innerText = "INICIAR";
                    timeInput.disabled = false;
                    timeLeft = parseInt(timeInput.value) * 60;
                    updateDisplay();
                }
            }, 1000);
        }
    }
    // Agregar el evento al botón para iniciar/pausar el temporizador
    btn.addEventListener('click', toggleTimer);
    updateDisplay();
}
// Ejecutar la función cuando el DOM esté completamente cargado
// 🚀 LA CLAVE: Esperar a que el HTML esté cargado
document.addEventListener('DOMContentLoaded', initTimer);
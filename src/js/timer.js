function initTimer() {
    // REFERENCIAS A LOS ELEMENTOS DEL DOM
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('timer-btn');
    const timeInput = document.getElementById('timer-input');

    // 1. CREAR EL OBJETO DE AUDIO
    const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg');
    alarmSound.volume = 1.0; 

    // Verificación de seguridad
    if (!display || !btn || !timeInput) return;

    // INICIALIZAR EL TEMPORIZADOR
    let timeLeft = parseInt(timeInput.value) * 60; 
    let timerId = null;

    // FUNCION PARA ACTUALIZAR EL DISPLAY (El texto que ve el usuario)
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // --- NUEVO: ESCUCHADOR PARA SINCRONIZAR EN TIEMPO REAL ---
    timeInput.addEventListener('input', () => {
        // Solo permitimos el cambio si el reloj NO está corriendo
        if (!timerId) {
            let value = parseInt(timeInput.value);

            // Si el usuario borra el número o pone algo inválido, lo tratamos como 0
            if (isNaN(value) || value < 0) {
                timeLeft = 0;
            } else {
                timeLeft = value * 60;
            }
            
            updateDisplay(); // <--- Esta línea es la que actualiza el número grande
        }
    });

    // FUNCION PARA INICIAR/PAUSAR EL TEMPORIZADOR
    function toggleTimer() {
        if (timerId) {
            // Lógica de Pausa
            clearInterval(timerId);
            timerId = null;
            btn.innerText = "REANUDAR";
            timeInput.disabled = false;
        } else {
            // Lógica de Inicio
            if (timeLeft <= 0) return alert("Por favor, ingresa un tiempo válido");

            btn.innerText = "PAUSAR";
            timeInput.disabled = true; // Bloqueamos el input para que no lo cambien mientras corre
            
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    // El tiempo llegó a cero
                    clearInterval(timerId);
                    timerId = null;
                    
                    alarmSound.play(); 

                    // Resetear la interfaz
                    btn.innerText = "INICIAR";
                    timeInput.disabled = false;
                    
                    // Volvemos a cargar el tiempo que el usuario dejó en el input
                    let resetValue = parseInt(timeInput.value);
                    timeLeft = (isNaN(resetValue) ? 25 : resetValue) * 60;
                    updateDisplay();
                }
            }, 1000);
        }
    }

    // Evento de clic en el botón
    btn.addEventListener('click', toggleTimer);
    
    // Primera actualización al cargar para que coincida con el input inicial
    updateDisplay();
}

// Ejecutar cuando el navegador termine de cargar el HTML
document.addEventListener('DOMContentLoaded', initTimer);
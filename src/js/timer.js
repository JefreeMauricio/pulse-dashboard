function initTimer() {
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('timer-btn');
    const timeInput = document.getElementById('timer-input');

    // 1. CREAR EL OBJETO DE AUDIO
    // Puedes usar una ruta local como 'assets/alarm.mp3'
    const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg');

    if (!display || !btn || !timeInput) return;

    let timeLeft = parseInt(timeInput.value) * 60; 
    let timerId = null;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // ... (el resto de los eventos se mantienen igual)

    function toggleTimer() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            btn.innerText = "REANUDAR";
            timeInput.disabled = false;
        } else {
            if (timeLeft <= 0) return;

            btn.innerText = "PAUSAR";
            timeInput.disabled = true;
            
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerId);
                    
                    // 2. REPRODUCIR EL SONIDO EN LUGAR DEL ALERT
                    alarmSound.play(); 
                    
                    btn.innerText = "INICIAR";
                    timeInput.disabled = false;
                    timeLeft = parseInt(timeInput.value) * 60;
                    updateDisplay();
                }
            }, 1000);
        }
    }

    btn.addEventListener('click', toggleTimer);
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', initTimer);
// src/js/main.js

function initDashboard() {
    // Este archivo se encarga de la lógica principal del dashboard
    const greetingElement = document.getElementById('greeting');
    const dateElement = document.getElementById('current-date');
   
    // Obtener la fecha actual para personalizar el saludo
    const now = new Date();
    // Obtener la hora para determinar el saludo adecuado
    const hours = now.getHours();
    
    // 1. Saludo Dinámico
    let message = "";
    if (hours >= 5 && hours < 12) message = "¡Buenos días! ☕";
    else if (hours >= 12 && hours < 18) message = "¡Buenas tardes! 🚀";
    else message = "¡Buenas noches! 🌙";

    // Mostrar el saludo en el dashboard
    greetingElement.innerText = message;

    // 2. Fecha con formato elegante (Ej: martes, 31 de marzo)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateElement.innerText = now.toLocaleDateString('es-ES', options);
}

// Ejecutar cuando el HTML esté listo
document.addEventListener('DOMContentLoaded', initDashboard);
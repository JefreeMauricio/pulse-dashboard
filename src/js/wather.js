async function initWeather() {
    const API_KEY = '17ea2551131285e1435bb476898f6d79'; 
    const CITY = 'Ibague,CO';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=es&appid=${API_KEY}`;

    const tempElement = document.getElementById('temp');
    const cityElement = document.getElementById('city');
    // Capturamos el elemento donde está el emoji (asegúrate que tenga este ID en el HTML)
    const iconElement = document.getElementById('weather-icon');

    try {
        // Mientras esperamos la respuesta, mostramos un mensaje de carga
        cityElement.innerText = "Actualizando clima...";
        
        // Hacemos la petición a la API de OpenWeatherMap
        const response = await fetch(URL);
        
        // Manejo de errores específico para la activación de la API Key
        if (response.status === 401) {
            throw new Error('La API Key aún se está activando (espera 30 min)');
        }
        // Manejo de otros posibles errores de red o de la API
        if (!response.ok) throw new Error('No se pudo conectar con el servidor');

        // Si todo va bien, procesamos los datos recibidos
        const data = await response.json();


        // --- INICIO DE LA LÓGICA DE ICONOS ---
        const weatherIcons = {
            "Clear": "☀️",
            "Clouds": "☁️",
            "Rain": "🌧️",
            "Drizzle": "🌦️",
            "Thunderstorm": "⚡",
            "Snow": "❄️",
            "Mist": "🌫️",
            "Smoke": "🌫️",
            "Haze": "🌫️"
        };

        // Obtenemos el estado principal del clima para determinar el ícono
        const mainStatus = data.weather[0].main;

        //  Si el estado no está en nuestro objeto, usamos un ícono genérico
        const icon = weatherIcons[mainStatus] || "🌡️"; 
        // --- FIN DE LA LÓGICA DE ICONOS ---

        // ÉXITO: Pintamos los datos en el HTML
        tempElement.innerText = `${Math.round(data.main.temp)}°C`;
        
        // Capitalizamos la descripción del clima (ej: "cielo claro" -> "Cielo claro")
        const description = data.weather[0].description;
        cityElement.innerText = `Ibagué: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
        
        // Actualizamos el icono si el elemento existe
        if (iconElement) {
            iconElement.innerText = icon;
        }
    
    } catch (error) {
        console.warn("Aviso Clima:", error.message);
        cityElement.innerText = "API en proceso de activación...";
        tempElement.innerText = "--°C";
    }
}
// Ejecutamos la función cuando el contenido del HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', initWeather);
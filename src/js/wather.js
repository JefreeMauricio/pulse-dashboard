async function initWeather() {
    const API_KEY = '17ea2551131285e1435bb476898f6d79'; 
    const CITY = 'Ibague,CO';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=es&appid=${API_KEY}`;

    const tempElement = document.getElementById('temp');
    const cityElement = document.getElementById('city');
    // Capturamos el elemento donde está el emoji (asegúrate que tenga este ID en el HTML)
    const iconElement = document.getElementById('weather-icon');

    try {
        cityElement.innerText = "Actualizando clima...";
        
        const response = await fetch(URL);
        
        if (response.status === 401) {
            throw new Error('La API Key aún se está activando (espera 30 min)');
        }

        if (!response.ok) throw new Error('No se pudo conectar con el servidor');

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

        const mainStatus = data.weather[0].main;
        const icon = weatherIcons[mainStatus] || "🌡️"; 
        // --- FIN DE LA LÓGICA DE ICONOS ---

        // ÉXITO: Pintamos los datos en el HTML
        tempElement.innerText = `${Math.round(data.main.temp)}°C`;
        
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

document.addEventListener('DOMContentLoaded', initWeather);
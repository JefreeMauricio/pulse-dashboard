async function initWeather() {
    const API_KEY = 'TU_LLAVE_AQUÍ'; 
    const CITY = 'Ibague,CO';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=es&appid=${API_KEY}`;

    const tempElement = document.getElementById('temp');
    const cityElement = document.getElementById('city');

    try {
        // Mostramos un estado de "Cargando"
        cityElement.innerText = "Actualizando clima...";
        
        const response = await fetch(URL);
        
        // Si la llave no se ha activado, entrará aquí (Error 401)
        if (response.status === 401) {
            throw new Error('La API Key aún se está activando (espera 30 min)');
        }

        if (!response.ok) throw new Error('No se pudo conectar con el servidor');

        const data = await response.json();

        // ÉXITO: Pintamos los datos
        tempElement.innerText = `${Math.round(data.main.temp)}°C`;
        const description = data.weather[0].description;
        cityElement.innerText = `Ibagué: ${description.charAt(0).toUpperCase() + description.slice(1)}`;

    } catch (error) {
        console.warn("Aviso Clima:", error.message);
        // Si falla, ponemos un mensaje amigable en lugar de dejarlo vacío
        cityElement.innerText = "API en proceso de activación...";
        tempElement.innerText = "--°C";
    }
}

document.addEventListener('DOMContentLoaded', initWeather);
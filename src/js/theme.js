function initTheme() {
    const themeBtn = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement; // Accedemos a <html>

    // 1. Verificar si ya había una preferencia guardada
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
        themeIcon.innerText = '☀️';
    }

    // 2. Evento al hacer clic en el botón
    themeBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        let theme = 'light';
        
        if (htmlElement.classList.contains('dark')) {
            theme = 'dark';
            themeIcon.innerText = '☀️';
        } else {
            themeIcon.innerText = '🌙';
        }

        // 3. Guardar la elección en el navegador
        localStorage.setItem('theme', theme);
    });
}

document.addEventListener('DOMContentLoaded', initTheme);
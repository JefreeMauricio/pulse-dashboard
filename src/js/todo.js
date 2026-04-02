function initTodo() {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('todo-add');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');

    // 1. Cargar tareas guardadas
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2`;
            
            // Dentro de la función renderTasks...
            li.innerHTML = `
                <div class="flex items-center gap-3">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} 
                        class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        onchange="toggleTask(${index})">
                    <span class="${task.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'} font-medium">
                        ${task.text}
                    </span>
                </div>
            
            <button onclick="deleteTask(${index})" class="text-slate-400 hover:text-red-500 transition-colors p-1" title="Eliminar tarea">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            `;
            todoList.appendChild(li);
        });
        updateCount();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Funciones globales para que el HTML (onclick) las vea
    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks = tasks.filter((_, i) => i !== index);
        renderTasks();
    };

    function updateCount() {
        const pending = tasks.filter(t => !t.completed).length;
        taskCount.innerText = `${pending} pendientes`;
    }

    addBtn.addEventListener('click', () => {
        if (input.value.trim() === '') return;
        tasks.push({ text: input.value, completed: false });
        input.value = '';
        renderTasks();
    });

    // Añadir con la tecla Enter
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    renderTasks();
}

document.addEventListener('DOMContentLoaded', initTodo);
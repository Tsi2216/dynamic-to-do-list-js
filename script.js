document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task event listener
    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving again
    }

    function addTask(taskText, save = true) {
        const trimmedText = taskText.trim();
        if (trimmedText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = trimmedText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(trimmedText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = ""; // Clear input
        updateLocalStorage();
    }

    function updateLocalStorage() {
        const tasks = [];
        for (let i = 0; i < taskList.children.length; i++) {
            tasks.push(taskList.children[i].firstChild.textContent);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
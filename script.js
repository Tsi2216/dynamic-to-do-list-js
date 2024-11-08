document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task event listener
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = ""; // Clear input

        updateLocalStorage();
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn';
            removeButton.onclick = function() {
                taskList.removeChild(li);
                updateLocalStorage();
            };

            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    function updateLocalStorage() {
        const tasks = [];
        for (let i = 0; i < taskList.children.length; i++) {
            tasks.push(taskList.children[i].firstChild.textContent);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
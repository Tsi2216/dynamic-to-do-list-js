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

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving again
    }

    function addTask() {
        const taskText = taskInput.value.trim(); // Retrieve and trim the input value
        if (taskText === "") {
            alert("Please enter a task."); // Alert if the input is empty
            return;
        }

        const li = document.createElement('li'); // Create a new list item
        li.textContent = taskText; // Set the text content to the task text

        const removeButton = document.createElement('button'); // Create a remove button
        removeButton.textContent = "Remove"; // Set button text
        removeButton.className = 'remove-btn'; // Assign a class name
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the list item when clicked
            updateLocalStorage();
        };

        li.appendChild(removeButton); // Append the remove button to the list item
        taskList.appendChild(li); // Append the list item to the task list

        // Save the new task to local storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

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
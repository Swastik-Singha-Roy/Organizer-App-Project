document.getElementById('createtodo').addEventListener('click', createTask);
let taskNum = 0;


window.onload = loadTasks;

function createTask() {
    let taskName = document.getElementById('todoinput').value;
    if (taskName === '') return; 
    taskNum++;

    if (taskNum === 1) {
        document.getElementById('todocreatedcontainer').innerText = '';
    }

    addTaskToDOM(taskName);
    saveTasks();

    document.getElementById('todoinput').value = '';
}

function addTaskToDOM(taskName) {
    let taskNameElement = document.createElement('input');
    taskNameElement.type = 'checkbox';
    taskNameElement.className = 'task-checkbox'; 

    let label = document.createElement('label');
    label.innerText = taskName;
    label.className = 'task-label'; 

    let taskNameDiv = document.createElement('div');
    taskNameDiv.className = 'task-div'; 
    taskNameDiv.appendChild(taskNameElement);
    taskNameDiv.appendChild(label);

    let deleteTask = document.createElement('button');
    deleteTask.innerText = 'x';
    deleteTask.className = 'task-delete-button'; 
    deleteTask.addEventListener('click', function() {
        taskNameDiv.remove();
        taskNum--;
        saveTasks();
        if (taskNum === 0) {
            document.getElementById('todocreatedcontainer').innerText = 'Your Tasks will appear here!';
        }
    });
    taskNameDiv.appendChild(deleteTask);

    let taskContainer = document.getElementById('todocreatedcontainer');
    taskContainer.appendChild(taskNameDiv);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('.task-div').forEach(taskDiv => {
        let taskLabel = taskDiv.querySelector('.task-label').innerText;
        tasks.push(taskLabel);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    taskNum = tasks.length;
    if (taskNum > 0) {
        document.getElementById('todocreatedcontainer').innerText = '';
    }
    tasks.forEach(task => addTaskToDOM(task));
}

if (taskNum === 0) {
    document.getElementById('todocreatedcontainer').innerText = 'Your Tasks will appear here!';
}

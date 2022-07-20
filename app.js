//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();

function loadEventListeners() {
    // dom load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clrBtn.addEventListener('click', clearTasks)
    //filter task event
    filter.addEventListener('keyup', filterTasks)
    
}

// Get Tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        // Create li el 
        const li = document.createElement('li');
        // Add cladd
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fas fa-remove"></i>';
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);

    })
}

// Filter Tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block'
        }
        else {
            task.style.display = 'none'
        }
    })
}

// Clear Tasks
function clearTasks(){
    if(confirm('Are you sure?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
    }

    localStorage.clear();
}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove()
            //rm from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
        return
    }

    // Create li el
    const li = document.createElement('li');
    // Add cladd
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-remove"></i>';
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    //Store in ls

    storeInLocalStorage(taskInput.value)

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
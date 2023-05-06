// Initialize tasks array
let tasks = [];

// Function to add a new task
function addTask(taskText) {
  // Create a new task object with a unique ID
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  // Add the task to the tasks array
  tasks.push(task);

  // Render the tasks
  renderTasks();
}

// Function to render the tasks
function renderTasks(filter = 'all') {
  // Get the tasks container element
  const tasksContainer = document.getElementById('tasks-container');

  // Filter the tasks based on the selected filter
  let tasksToShow = tasks;
  if (filter === 'completed') {
    tasksToShow = tasks.filter(task => task.completed);
  } else if (filter === 'active') {
    tasksToShow = tasks.filter(task => !task.completed);
  }

  // Clear the tasks container
  tasksContainer.innerHTML = '';

  // Loop through the tasks to create HTML elements for each task
  tasksToShow.forEach(task => {
    // Create a div element for the task
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    // Add a class of 'completed' if the task is completed
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    // Create a div element for the task text
    const taskText = document.createElement('div');
    taskText.classList.add('task-text');
    taskText.textContent = task.text;

    // Create a button element to toggle the task completion status
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle-btn');
    toggleBtn.textContent = task.completed ? 'Uncheck' : 'Check';
    toggleBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks(filter);
    });

    // Create a button element to delete the task
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks(filter);
    });

    // Append the task text and buttons to the task item element
    taskItem.appendChild(taskText);
    taskItem.appendChild(toggleBtn);
    taskItem.appendChild(deleteBtn);

    // Append the task item element to the tasks container
    tasksContainer.appendChild(taskItem);
  });
}

// Add event listener to the add task button
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
  // Get the input box value
  const inputBox = document.getElementById('input-box');
  const taskText = inputBox.value.trim();

  // Add the task if it is not empty
  if (taskText !== '') {
    addTask(taskText);

    // Clear the input box
    inputBox.value = '';
  }
});

// Add event listeners to the filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove the active class from all filter buttons
    filterBtns.forEach(b => b.classList.remove('active'));

    // Add the active class to the clicked filter button
    btn.classList.add('active');

    // Render the tasks with the selected filter
    renderTasks(btn.dataset.filter);
  });
});

// Render the tasks on page load
renderTasks();

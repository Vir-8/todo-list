import { contentHeader, taskContainer, newTaskForm, cancelTask } from "../..";

export const loadProject = (newProject) => {
    contentHeader.textContent = "";
    showProjectTasks(newProject);
}

function createProjectTaskButton(newProject) {
    let newProjectTaskButton = document.createElement('button');
    newProjectTaskButton.textContent = "new button!";
    newProjectTaskButton.onclick = function() {
        newProjectTask(newProjectTaskButton, newProject);
    };
    return newProjectTaskButton;
}

function newProjectTask(newProjectTaskButton, newProject) {
    // Position the form exactly where the button is
    var buttonRect = newProjectTaskButton.getBoundingClientRect();
    var buttonTop = buttonRect.top;
    var buttonLeft = buttonRect.left;
    newTaskForm.style.top = buttonTop + 'px';
    newTaskForm.style.left = buttonLeft + 'px';

    newProjectTaskButton.style.display = 'none';
    newTaskForm.style.visibility = 'visible';

    newTaskForm.onsubmit = function(e) {
        console.log('submit new task clicked')
        addNewProjectTask(newProject); //create new task card
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        console.log('cancel task clicked')
        e.preventDefault();
    }
}

function addNewProjectTask(newProject) {
    let newTask = document.createElement('div');
    newTask.classList.add('newTask');

    let check = document.createElement('input');
    check.type = "checkbox";
    newTask.append(check);

    let taskName = document.createElement('h3');
    taskName.textContent = document.getElementById('taskName').value;
    newTask.append(taskName);

    newTask.setAttribute("data-index", newProject.tasks.length);

    newProject.tasks.push(newTask);
    document.getElementById('taskName').value = "";
    newTaskForm.style.visibility = 'hidden';
    showProjectTasks(newProject);
    console.log(newProject.tasks);
}

function showProjectTasks(newProject) {
    taskContainer.textContent = "";
    for (let i = 0; i < newProject.tasks.length; i++)
    {
        taskContainer.append(newProject.tasks[i]);
    }
    let newTaskButton = createProjectTaskButton(newProject);
    newTaskButton.classList.add('newTaskButton');
    taskContainer.append(newTaskButton);
}
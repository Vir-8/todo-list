import { newTaskForm, cancelTask, myProjects, subTaskForm } from "../..";
import { loadProject } from "./loadProject";

export function newProjectTask(newProjectTaskButton, newProject) {
    window.addEventListener('resize', updateWidth(newProjectTaskButton));

    cleanPage(newProjectTaskButton);

    newTaskForm.onsubmit = function(e) {
        addNewProjectTask(newProject); //create new task card

        newProjectTaskButton.style.display = 'block';
        newTaskForm.reset();
        newTaskForm.style.display = 'none';
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        newProjectTaskButton.style.display = 'block';
        newTaskForm.reset();
        newTaskForm.style.display = 'none';
        e.preventDefault();
    }
}

function addNewProjectTask(newProject) {

    let projectTask = {
        id: newProject.tasks.length,
        mainTaskData: {
            mainTaskName: document.getElementById('taskName').value,
            mainTaskDate: document.getElementById('taskDate').value,
        },
        subTasks: []
    }

    newProject.tasks.push(projectTask);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
    loadProject(newProject);
}

function cleanPage(newProjectTaskButton) {
    // Position the form exactly where the button is
    var buttonRect = newProjectTaskButton.getBoundingClientRect();

    var buttonTop = buttonRect.top;
    var buttonLeft = buttonRect.left;
    newTaskForm.style.top = buttonTop + 'px';
    newTaskForm.style.left = buttonLeft + 'px';
    
    newTaskForm.style.display = 'block';
    newTaskForm.style.width = getComputedStyle(newProjectTaskButton).width;
    newProjectTaskButton.style.display = 'none';

    document.getElementById('taskName').focus();
    document.getElementById('taskDate').addEventListener('click', function() {
        taskDate.showPicker();
    });
    
    const dateInput = document.getElementById('taskDate');

    dateInput.removeAttribute('min');
    dateInput.removeAttribute('max');

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    dateInput.value = `${year}-${month}-${day}`;

    subTaskForm.reset();
    subTaskForm.style.display = 'none';
}

function updateWidth(newProjectTaskButton) {
    newProjectTaskButton.style.display = 'block';
    newTaskForm.style.width = getComputedStyle(newProjectTaskButton).width;
    newProjectTaskButton.style.display = 'none';
}

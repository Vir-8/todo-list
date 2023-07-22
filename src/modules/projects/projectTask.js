import { newTaskForm, cancelTask, myProjects, subTaskForm } from "../..";
import { loadProject, showProjectTasks } from "./loadProject";
import { getTaskDate } from "../tasks/tasks";
import { displayMenu } from "../tasks/taskMenu";

export function newProjectTask(newProjectTaskButton, newProject) {


    window.addEventListener('resize', updateWidth(newProjectTaskButton));

    cleanPage(newProjectTaskButton);

    newTaskForm.onsubmit = function(e) {
        console.log('submit new task clicked')
        addNewProjectTask(newProject); //create new task card

        newProjectTaskButton.style.display = 'block';
        newTaskForm.reset();
        newTaskForm.style.display = 'none';
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        console.log('cancel task clicked')

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

    subTaskForm.reset();
    subTaskForm.style.display = 'none';
}

function updateWidth(newProjectTaskButton) {
    newProjectTaskButton.style.display = 'block';
    newTaskForm.style.width = getComputedStyle(newProjectTaskButton).width;
    newProjectTaskButton.style.display = 'none';
}

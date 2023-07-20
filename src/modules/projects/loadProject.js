import { contentHeader, taskContainer, newTaskForm, cancelTask, taskList, newTaskButtonContainer, subTaskForm } from "../..";
import { newProjectTask } from "./projectTask";


export const loadProject = (newProject) => {

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    projectHeader(newProject);
    showProjectTasks(newProject);
}

function projectHeader(newProject) {

    contentHeader.textContent = "";

    let header = document.createElement('h1')
    header.textContent = newProject.name;
    header.classList.add('pageHeader');

    contentHeader.append(header);
}

export function showProjectTasks(newProject) {
    newTaskButtonContainer.textContent = "";
    taskList.textContent = "";
    for (let i = 0; i < newProject.tasks.length; i++)
    {
        let projectTasks = newProject.tasks[i];

        let mainTaskDiv = projectTasks.mainTaskDiv;
        let newTaskDiv = projectTasks.newTaskDiv;
        let subTaskDiv = projectTasks.subTaskDiv;

        mainTaskDiv.append(newTaskDiv);
        mainTaskDiv.append(subTaskDiv);
        taskList.append(mainTaskDiv);
    }


    let newProjectTaskButton = document.createElement('button');
    newProjectTaskButton.textContent = "new button!";

    newProjectTaskButton.onclick = function() {
        newProjectTask(newProjectTaskButton, newProject);
    };

    newProjectTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newProjectTaskButton);
}
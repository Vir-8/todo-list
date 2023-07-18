import { contentHeader, taskContainer, newTaskForm, cancelTask, taskList } from "../..";
import { newProjectTask } from "./projectTask";

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

export function showProjectTasks(newProject) {
    taskContainer.textContent = "";
    for (let i = 0; i < newProject.tasks.length; i++)
    {
        taskContainer.append(newProject.tasks[i]);
    }
    let newTaskButton = createProjectTaskButton(newProject);
    newTaskButton.classList.add('newTaskButton');
    taskContainer.append(newTaskButton);
}
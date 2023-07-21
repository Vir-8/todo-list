import { myTasks, taskContainer, contentHeader, taskList, newTaskButtonContainer, newTaskForm, subTaskForm } from "..";
import { newTask } from "./tasks/tasks";
import { highLightButton } from "./sideBar.js";
import { displayMenu } from "./tasks/taskMenu";
import { createTasks } from "./tasks/taskCreation";
import { setCurrentProject } from "./projects/createProject";

const loadInbox = () => {
    cleanPage();
    inboxHeader();
    showAllTasks();
}

function inboxHeader() {

    let header = document.createElement('h1')
    header.textContent = "Inbox";
    header.classList.add('pageHeader');

    contentHeader.append(header);
}


export function showAllTasks() {
    newTaskButtonContainer.textContent = "";
    taskList.textContent = "";

    for (let i = 0; i < myTasks.length; i++)
    {
        createTasks(i, 'inbox');
    }

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "new button!";
    newTaskButton.onclick = function() {
        newTask(newTaskButton, 'inbox');
    };
    
    newTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newTaskButton);
}

function cleanPage() {
    setCurrentProject('');

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    const dateInput = document.getElementById('taskDate');

    dateInput.removeAttribute('min');
    dateInput.removeAttribute('max');
}

export default loadInbox;
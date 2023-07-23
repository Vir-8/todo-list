import { myTasks, contentHeader, taskList, newTaskButtonContainer, newTaskForm, subTaskForm } from "..";
import { newTask } from "./tasks/tasks";
import { createTasks } from "./tasks/taskCreation";
import { setCurrentProject } from "./projects/createProject";

const loadInbox = (taskContainerID) => {
    cleanPage();
    inboxHeader();
    showAllTasks(taskContainerID);
}

function inboxHeader() {
    let header = document.createElement('h1')
    header.textContent = "Inbox";
    header.classList.add('pageHeader');

    contentHeader.append(header);
}


export function showAllTasks(taskContainerID) {
    newTaskButtonContainer.textContent = "";
    taskList.textContent = "";

    for (let i = 0; i < myTasks.length; i++)
    {
        createTasks(i, 'inbox', taskContainerID);
    }

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "+ New Task";
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

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    dateInput.value = `${year}-${month}-${day}`;
}

export default loadInbox;
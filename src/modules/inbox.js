import { myTasks, contentHeader, contentHolder, taskList, newTaskButtonContainer, newTaskForm, subTaskForm } from "..";
import { newTask } from "./tasks/tasks";
import { createTasks } from "./tasks/taskCreation";
import { setCurrentProject } from "./projects/createProject";
import { resetDate } from "./today";

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

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "+ New Task";
    newTaskButton.onclick = function() {
        newTask(newTaskButton, 'inbox');
    };
    
    newTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newTaskButton);

    for (let i = 0; i < myTasks.length; i++)
    {
        createTasks(i, 'inbox', taskContainerID);
    }
}

function cleanPage() {
    setCurrentProject('');

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";
    contentHolder.scrollTop = 0;

    const dateInput = document.getElementById('taskDate');
    dateInput.min = '';
    dateInput.max = '';
    resetDate();
}

export default loadInbox;
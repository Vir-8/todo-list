import { myTasks, taskContainer, contentHeader, taskList, newTaskButtonContainer, newTaskForm, subTaskForm } from "..";
import { newTask } from "./tasks/tasks";
import { highLightButton } from "./sideBar.js";

const loadInbox = () => {

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

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
        let mainTaskDiv = myTasks[i].mainTaskDiv;
        let newTaskDiv = myTasks[i].newTaskDiv;
        let subTaskDiv = myTasks[i].subTaskDiv;

        mainTaskDiv.append(newTaskDiv);
        mainTaskDiv.append(subTaskDiv);
        taskList.append(mainTaskDiv);

        console.log(myTasks[i]);
    }

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "new button!";
    newTaskButton.onclick = function() {
        newTask(newTaskButton);
    };
    
    newTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newTaskButton);
}

export default loadInbox;
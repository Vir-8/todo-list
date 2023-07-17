import { myTasks, taskContainer, contentHeader, newTaskForm, submitNewTask } from "..";
import { newTask, addNewTask } from "./tasks/tasks";

const loadInbox = () => {
    contentHeader.textContent = "";
    showAllTasks();
}

function createButton() {
    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "new button!";
    newTaskButton.onclick = function() {
        newTask(newTaskButton);
    };
    return newTaskButton;
}


export function showAllTasks() {
    taskContainer.textContent = "";
    for (let i = 0; i < myTasks.length; i++)
    {
        taskContainer.append(myTasks[i]);
    }
    let newTaskButton = createButton();
    newTaskButton.classList.add('newTaskButton');
    taskContainer.append(newTaskButton);
}

export default loadInbox;
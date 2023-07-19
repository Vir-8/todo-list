import { myTasks, taskContainer, contentHeader, taskList } from "..";
import { newTask } from "./tasks/tasks";
import { highLightButton } from "./sideBar.js";

const loadInbox = () => {

    contentHeader.textContent = "";
    createButton();
    showAllTasks();
}

function createButton() {
    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "new button!";
    newTaskButton.onclick = function() {
        newTask(newTaskButton);
    };
    
    newTaskButton.classList.add('newTaskButton');
    contentHeader.append(newTaskButton);
}


export function showAllTasks() {
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
}

export default loadInbox;
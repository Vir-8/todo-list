import { contentHeader, myTasks, taskList, newTaskForm, subTaskForm, newTaskButtonContainer } from "..";
import { createTasks } from "./tasks/taskCreation";
import { setCurrentProject } from "./projects/createProject";
import { newTask } from "./tasks/tasks";

const loadToday = (taskContainerID) => {

    cleanPage();
    let currentDate = new Date();

    const dateInput = document.getElementById('taskDate');

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    dateInput.min = formattedDate;
    dateInput.max = formattedDate;

    dateInput.value = formattedDate;

    for (let i = 0; i < myTasks.length; i++)
    {
        let task = myTasks[i];
        let taskDate = new Date(task.mainTaskData.mainTaskDate);

        if (
            currentDate.getFullYear() === taskDate.getFullYear() &&
            currentDate.getMonth() === taskDate.getMonth() &&
            currentDate.getDate() === taskDate.getDate()
        ) {
            createTasks(i, 'today', taskContainerID);
        }
    }        
}

function cleanPage() {
    setCurrentProject('');

    newTaskForm.reset();
    newTaskForm.style.display = 'none';
    newTaskButtonContainer.textContent = "";

    const dateInput = document.getElementById('taskDate');

    // Remove the min and max attributes to allow selecting any date
    dateInput.removeAttribute('min');
    dateInput.removeAttribute('max');

    subTaskForm.reset();
    subTaskForm.style.display = 'none';
    
    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    let header = document.createElement('h1')
    header.textContent = "Today";
    header.classList.add('pageHeader');

    contentHeader.append(header);

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "+ New Task";
    newTaskButton.onclick = function() {
        newTask(newTaskButton, 'today');
    };
    
    newTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newTaskButton);
}


export default loadToday;
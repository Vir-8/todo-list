import { contentHeader, myTasks, taskList, newTaskForm, subTaskForm, newTaskButtonContainer } from "..";
import { createTasks } from "./tasks/taskCreation";
import { setCurrentProject } from "./projects/createProject";
import { newTask } from "./tasks/tasks";

const loadWeek = (taskContainerID) => {

    cleanPage();

    let currentDate = new Date();
    let currentDayOfWeek = currentDate.getDay();
    
    // Calculate the start of the week
    let startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Calculate the end of the week
    let endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDayOfWeek) + 1);
    endOfWeek.setHours(23, 59, 59, 999);

    //set date input limit
    const dateInput = document.getElementById('taskDate');

    const minYear = startOfWeek.getFullYear();
    const minMonth = String(startOfWeek.getMonth() + 1).padStart(2, '0');
    const minDay = String(startOfWeek.getDate()).padStart(2, '0');
    const minDate = `${minYear}-${minMonth}-${minDay}`;

    const maxYear = endOfWeek.getFullYear();
    const maxMonth = String(endOfWeek.getMonth() + 1).padStart(2, '0');
    const maxDay = String(endOfWeek.getDate()).padStart(2, '0');
    const maxDate = `${maxYear}-${maxMonth}-${maxDay}`;

    dateInput.min = minDate;
    dateInput.max = maxDate;

    for (let i = 0; i < myTasks.length; i++)
    {
        let task = myTasks[i];
        let taskDate = new Date(task.mainTaskData.mainTaskDate);

        if (taskDate >= startOfWeek && taskDate <= endOfWeek)
        {
            createTasks(i, 'week', taskContainerID);
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

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    dateInput.value = `${year}-${month}-${day}`;

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    let header = document.createElement('h1')
    header.textContent = "This Week";
    header.classList.add('pageHeader');

    contentHeader.append(header);

    let newTaskButton = document.createElement('button');
    newTaskButton.textContent = "+ New Task";
    newTaskButton.onclick = function() {
        newTask(newTaskButton, 'week');
    };
    
    newTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newTaskButton);
}

export default loadWeek;
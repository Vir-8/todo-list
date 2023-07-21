import { contentHeader, myTasks, taskList, newTaskForm, subTaskForm } from "..";
import { createTasks } from "./tasks/taskCreation";

const loadWeek = () => {

    newTaskForm.reset();
    newTaskForm.style.display = 'none';
    
    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    let header = document.createElement('h1')
    header.textContent = "This Week";
    header.classList.add('pageHeader');

    contentHeader.append(header);

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

    console.log('todayDate is ' + currentDate);
    console.log('week start is ' + startOfWeek + ' and week end is ' + endOfWeek);

    for (let i = 0; i < myTasks.length; i++)
    {
        let task = myTasks[i];
        let taskDate = new Date(task.mainTaskData.mainTaskDate);

        if (taskDate >= startOfWeek && taskDate <= endOfWeek)
        {
            createTasks(i, 'week');
        }
    }
}

export default loadWeek;
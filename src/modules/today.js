import { contentHeader, myTasks, taskList, newTaskForm, subTaskForm } from "..";
import { createTasks } from "./tasks/taskCreation";

const loadToday = () => {

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';
    
    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    let header = document.createElement('h1')
    header.textContent = "Today";
    header.classList.add('pageHeader');

    contentHeader.append(header);

    let currentDate = new Date();

    console.log('todayDate is ' + currentDate);

    for (let i = 0; i < myTasks.length; i++)
    {
        let task = myTasks[i];
        let taskDate = new Date(task.mainTaskData.mainTaskDate);

        if (
            currentDate.getFullYear() === taskDate.getFullYear() &&
            currentDate.getMonth() === taskDate.getMonth() &&
            currentDate.getDate() === taskDate.getDate()
        ) {
            createTasks(i, 'today');
        }
    }        
}

export default loadToday;
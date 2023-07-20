import { contentHeader, myTasks, taskList, newTaskForm, subTaskForm } from "..";

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
        let taskDate = task.taskDate;

        console.log('this task data-date is ' + taskDate)
        if (
            currentDate.getFullYear() === taskDate.getFullYear() &&
            currentDate.getMonth() === taskDate.getMonth() &&
            currentDate.getDate() === taskDate.getDate()
        ) {
            let mainTaskDiv = task.mainTaskDiv;
            let newTaskDiv = task.newTaskDiv;
            let subTaskDiv = task.subTaskDiv;
    
            mainTaskDiv.append(newTaskDiv);
            mainTaskDiv.append(subTaskDiv);
            taskList.append(mainTaskDiv);
        }
    }
}

export default loadToday;
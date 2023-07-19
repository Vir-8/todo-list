import { contentHeader, myTasks, taskList } from "..";

const loadWeek = () => {
    taskList.textContent = "";
    contentHeader.textContent = "";

    let header = document.createElement('h1')
    header.textContent = "this week";
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
        let taskDate = task.taskDate;
        console.log('this task data-date is ' + taskDate )

        if (taskDate >= startOfWeek && taskDate <= endOfWeek)
        {
            let mainTaskDiv = task.mainTaskDiv;
            let newTaskDiv = task.newTaskDiv;
            let subTaskDiv = task.subTaskDiv;
    
            mainTaskDiv.append(newTaskDiv);
            mainTaskDiv.append(subTaskDiv);
            taskList.append(mainTaskDiv);
        }
    }
}

export default loadWeek;
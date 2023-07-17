import { contentHeader, taskContainer, myTasks } from "..";

const loadToday = () => {
    taskContainer.textContent = "";

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; // January is 0, so we add 1
    let year = date.getFullYear();
  
    let todayDate = day + '-' + month + '-' + year;
    console.log('todayDate is ' + todayDate);

    for (let i = 0; i < myTasks.length; i++)
    {
        let task = myTasks[i];
        console.log('this task data-date is ' + task.getAttribute('data-date') )
        if (todayDate == task.getAttribute('data-date'))
        {
            taskContainer.append(task);
        }
    }


}

export default loadToday;
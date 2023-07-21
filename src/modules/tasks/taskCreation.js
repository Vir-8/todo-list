import { myTasks, taskList } from "../..";
import { displayMenu } from "./taskMenu";
import loadInbox from "../inbox";
import loadToday from "../today";
import loadWeek from "../week";


export function createTasks(i, page) {
    let task = myTasks[i];

    let mainTaskContainer = document.createElement('div');
    mainTaskContainer.setAttribute("data-index", i);
    mainTaskContainer.classList.add('mainTaskContainer');

    let newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('newTask');

    let check = document.createElement('input');
    check.type = "checkbox";
    newTaskContainer.append(check);

    let newTaskContent = document.createElement('div');
    newTaskContent.classList.add('newTaskContent');

    let taskName = document.createElement('input');
    taskName.type = 'text';
    taskName.value = task.mainTaskData.mainTaskName;
    newTaskContent.append(taskName);

    let taskDate = document.createElement('input');
    taskDate.type = 'date';
    taskDate.value = task.mainTaskData.mainTaskDate;
    newTaskContent.append(taskDate);

    taskDate.addEventListener('change', function() {
        task.mainTaskData.mainTaskDate = taskDate.value;
        localStorage.setItem('myTasks', JSON.stringify(myTasks));
    });

    newTaskContainer.append(newTaskContent);

    let subTaskContainer = document.createElement('div');
    subTaskContainer.classList.add('subTaskContainer');

    mainTaskContainer.append(newTaskContainer);
    mainTaskContainer.append(subTaskContainer);

    let projectID = 'none';
    displayMenu(mainTaskContainer, projectID);
    taskList.append(mainTaskContainer);

    for (let j = 0; j < task.subTasks.length; j++) 
    {
        let newSubTask = document.createElement('div');
        newSubTask.classList.add('subTask');
        newSubTask.setAttribute("data-index", task.subTasks[j].id);
    
        let check = document.createElement('input');
        check.type = "checkbox";
        newSubTask.append(check);
    
        let taskName = document.createElement('input');
        taskName.type = 'text';
        taskName.value = task.subTasks[j].name;
        newSubTask.append(taskName);

        subTaskContainer.append(newSubTask);

        if(task.subTasks[j].isChecked) {
            check.checked = true;
            newSubTask.classList.add('subTaskDone');
        } else {
            check.checked = false;
            newSubTask.classList.remove('subTaskDone');
        }

        check.addEventListener('change', function() {
            if (check.checked) {
                // Mark task as completed
                newSubTask.classList.add('subTaskDone');
                task.subTasks[j].isChecked = true;
                localStorage.setItem('myTasks', JSON.stringify(myTasks));
            } else {
                newSubTask.classList.remove('subTaskDone');
                task.subTasks[j].isChecked = false;
                localStorage.setItem('myTasks', JSON.stringify(myTasks));
            }
        });
    }

    check.addEventListener('change', function() {
        if (check.checked) {
        // Mark task as completed
        console.log("checked task with id " + i + " and data-index " + mainTaskContainer.getAttribute("data-index"));
        myTasks.splice(i, 1);

        if (page == 'inbox') {
            loadInbox();
        } else if (page == 'today') {
            loadToday();
        } else if (page == 'week') {
            loadWeek();
        }

        localStorage.setItem('myTasks', JSON.stringify(myTasks));
        } 
    });

    console.log(myTasks[i]);
}
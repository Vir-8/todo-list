import { myTasks, taskList } from "../..";
import { displayMenu, loadMenu } from "./taskMenu";
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

    let rightSide = document.createElement('div');
    rightSide.classList.add('right-side');

    let taskDate = document.createElement('input');
    taskDate.type = 'date';
    taskDate.value = task.mainTaskData.mainTaskDate;
    rightSide.append(taskDate);

    let menuDropDown = document.createElement('div');
    menuDropDown.classList.add('menuDropDown');
    let svgImage = document.createElement('img');
    svgImage.src = '../src/assets/menu.svg'; 

    menuDropDown.appendChild(svgImage);
    rightSide.append(menuDropDown);

    newTaskContent.append(rightSide);
    newTaskContainer.append(newTaskContent);

    let subTaskContainer = document.createElement('div');
    subTaskContainer.classList.add('subTaskContainer');

    mainTaskContainer.append(newTaskContainer);
    mainTaskContainer.append(subTaskContainer);

    displayMenu(mainTaskContainer, page);

    taskDate.addEventListener('change', function() {
        task.mainTaskData.mainTaskDate = taskDate.value;
        localStorage.setItem('myTasks', JSON.stringify(myTasks));

        if (page == 'today') {
            loadToday();
        } else if (page == 'week') {
            loadWeek();
        }
    });

    taskDate.addEventListener('click', function() {
        taskDate.showPicker();
    });

    taskName.addEventListener('change', function() {
        task.mainTaskData.mainTaskName = taskName.value;
        localStorage.setItem('myTasks', JSON.stringify(myTasks));
    });

    menuDropDown.addEventListener('click', function() {
        loadMenu(mainTaskContainer, page, 'menuDropDown')
    });

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

        mainTaskContainer.classList.add('start-animation')
        mainTaskContainer.addEventListener('animationend', function() {
            if (page == 'inbox') {
                loadInbox();
            } else if (page == 'today') {
                loadToday();
            } else if (page == 'week') {
                loadWeek();
            }
          }, { once: true });

        localStorage.setItem('myTasks', JSON.stringify(myTasks));
        } 
    });

    console.log(myTasks[i]);
}
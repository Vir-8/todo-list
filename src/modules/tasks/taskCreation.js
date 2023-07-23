import { myTasks, subTaskForm, taskList, newTaskForm, projectForm } from "../..";
import { displayMenu, loadMenu } from "./taskMenu";
import loadInbox from "../inbox";
import loadToday from "../today";
import loadWeek from "../week";
import menuImg from '../../assets/menu.svg';
import { newSubTask } from "./subTasks";

export function createTasks(i, page, taskContainerID) {
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
    svgImage.src = menuImg; 

    menuDropDown.appendChild(svgImage);
    rightSide.append(menuDropDown);

    newTaskContent.append(rightSide);
    newTaskContainer.append(newTaskContent);

    let subTaskContainer = document.createElement('div');
    subTaskContainer.classList.add('subTaskContainer');

    mainTaskContainer.append(newTaskContainer);
    mainTaskContainer.append(subTaskContainer);

    let addSubTaskButton = document.createElement('button');
    addSubTaskButton.classList.add('addSubTaskButton');
    addSubTaskButton.textContent = "+ Add Subtask";
    mainTaskContainer.append(addSubTaskButton);

    displayMenu(mainTaskContainer, page);
    taskList.append(mainTaskContainer);

    if (typeof taskContainerID !== 'undefined' && taskContainerID == i) {
        newSubTask(mainTaskContainer, page);
    }

    loadSubtasks(task, mainTaskContainer, subTaskContainer, page, addSubTaskButton);

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

    mainTaskContainer.addEventListener('click', function(e) {
        if (e.target.type !== 'checkbox' && e.target.tagName !== 'BUTTON')
        {
            let subTaskButtons = document.querySelectorAll('.addSubTaskButton');
            subTaskButtons.forEach(button => button.style.display = 'none');
            if (subTaskForm.style.display !== 'block') {
                addSubTaskButton.style.display = 'flex';
            }   
        }
        e.stopPropagation();
    });

    addSubTaskButton.addEventListener('click', function() {
        newSubTask(mainTaskContainer, page);
        addSubTaskButton.style.display = 'none';
    });

    document.addEventListener('click', function(e) {
        if (!mainTaskContainer.contains(e.target)) {
            addSubTaskButton.style.display = 'none';
        }
    }, {once: true});

    check.addEventListener('change', function() {
        if (check.checked) {
        // Mark task as completed
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
}


function loadSubtasks(task, mainTaskContainer, subTaskContainer, page) {
    subTaskContainer.textContent = "";
    for (let j = 0; j < task.subTasks.length; j++) 
    {
        let newSubTask = document.createElement('div');
        newSubTask.classList.add('subTask');
        newSubTask.setAttribute("data-index", j);
    
        let check = document.createElement('input');
        check.type = "checkbox";
        newSubTask.append(check);
    
        let taskName = document.createElement('input');
        taskName.type = 'text';
        taskName.value = task.subTasks[j].name;
        newSubTask.append(taskName);

        subTaskContainer.append(newSubTask);

        let deleteSubTaskButton = document.createElement('button');
        deleteSubTaskButton.textContent = "-";
        deleteSubTaskButton.classList.add('deleteSubTaskButton');

        newSubTask.append(deleteSubTaskButton);

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

        deleteSubTaskButton.addEventListener('click', function() {
            task.subTasks.splice(j, 1);
            newSubTask.classList.add('subTaskDelete-animation');

            localStorage.setItem('myTasks', JSON.stringify(myTasks));

            newSubTask.addEventListener('animationend', function() {
                loadSubtasks(task, mainTaskContainer, subTaskContainer, page);
            });

            if (subTaskForm.style.display == 'block') {
                document.getElementById('subTaskName').focus();
            } else if (newTaskForm.style.display == 'block') {
                document.getElementById('taskName').focus();
            } else if (projectForm.style.display == 'flex') {
                document.getElementById('projectName').focus();
            }
        });
    }
}
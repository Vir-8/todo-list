import { myTasks, newTaskForm, cancelTask, subTaskForm, projectForm } from "../..";
import loadInbox from "../inbox";
import loadToday from "../today";
import loadWeek from "../week";
import { resetDate } from "../today";

function newTask(newTaskButton, page) {

    cleanPage(newTaskButton);
    window.addEventListener('resize', function() {
        updateWidth(newTaskButton);
    });

    newTaskForm.onsubmit = function(e) {
        addNewTask(newTaskButton, page); //create new task card
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        newTaskButton.style.display = 'block';
        newTaskForm.reset();
        newTaskForm.style.display = 'none';
        e.preventDefault();
    }
}

function addNewTask(newTaskButton, page) {

    let task = {
        id: myTasks.length,
        mainTaskData: {
            mainTaskName: document.getElementById('taskName').value,
            mainTaskDate: document.getElementById('taskDate').value,
        },
        subTasks: []
    }

    myTasks.push(task);
    localStorage.setItem('myTasks', JSON.stringify(myTasks));

    document.getElementById('taskName').value = "";
    newTaskForm.style.display = 'none';
    newTaskButton.style.display = 'block';
    
    if (page == 'inbox') {
        loadInbox();
    } else if (page == 'today') {
        loadToday();
    } else if (page == 'week') {
        loadWeek();
    }
}

function cleanPage(newTaskButton) {
    var buttonRect = newTaskButton.getBoundingClientRect();
    
    var buttonTop = buttonRect.top;
    var buttonLeft = buttonRect.left;
    newTaskForm.style.top = buttonTop + 'px';
    newTaskForm.style.left = buttonLeft + 'px';

    newTaskForm.style.display = 'block';
    newTaskForm.style.width = getComputedStyle(newTaskButton).width;
    newTaskButton.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    projectForm.reset();
    projectForm.style.display = 'none';

    resetDate();
    document.getElementById('taskName').focus();
    document.getElementById('taskDate').addEventListener('click', function() {
        taskDate.showPicker();
    });
}

function updateWidth(newTaskButton) {
    newTaskButton.style.display = 'block';
    newTaskForm.style.width = getComputedStyle(newTaskButton).width;
    newTaskButton.style.display = 'none';
}

export { newTask };
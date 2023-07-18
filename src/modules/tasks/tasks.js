import { myTasks, newTaskForm, cancelTask, taskContainer } from "../..";
import loadInbox from "../inbox";
import { displayMenu } from "./taskMenu";


function newTask(newTaskButton) {
    // Position the form exactly where the button is
    var buttonRect = newTaskButton.getBoundingClientRect();
    
    var buttonTop = buttonRect.top;
    var buttonLeft = buttonRect.left;
    newTaskForm.style.top = buttonTop + 'px';
    newTaskForm.style.left = buttonLeft + 'px';

    newTaskButton.style.display = 'none';
    newTaskForm.style.visibility = 'visible';

    newTaskForm.onsubmit = function(e) {
        console.log('submit new task clicked')
        addNewTask(newTaskButton); //create new task card
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        console.log('cancel task clicked')
        e.preventDefault();
        cancelTaskCreation(newTaskButton);
    }
}

function addNewTask(newTaskButton) {
    let mainTaskContainer = document.createElement('div');
    mainTaskContainer.classList.add('mainTaskContainer');

    let newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('newTask');

    let check = document.createElement('input');
    check.type = "checkbox";
    newTaskContainer.append(check);

    let taskName = document.createElement('input');
    taskName.type = 'text';
    taskName.value = document.getElementById('taskName').value;
    newTaskContainer.append(taskName);

    let taskDate = document.createElement('input');
    taskDate.type = 'date';
    taskDate.value = document.getElementById('taskDate').value;
    newTaskContainer.append(taskDate);

    taskDate.addEventListener('change', function() {
        let newTaskDate = new Date(taskDate.value);
        // Update the task object with the new task date
        task.taskDate = newTaskDate;
    });

    let subTaskContainer = document.createElement('div');
    subTaskContainer.classList.add('subTaskContainer');

    let task = {
        id: myTasks.length,
        mainTaskDiv: mainTaskContainer,
        newTaskDiv: newTaskContainer,
        subTaskDiv: subTaskContainer,
        taskDate: getTaskDate(),
        subTasks: []
    }

    displayMenu(task);
    myTasks.push(task);

    check.addEventListener('change', function() {
        if (check.checked) {
          // Mark task as completed
          myTasks.splice(task.id, 1);
          loadInbox();
          console.log(myTasks);
        } 
    });

    document.getElementById('taskName').value = "";
    newTaskForm.style.visibility = 'hidden';
    newTaskButton.style.display = 'block';
    loadInbox();
    console.log(myTasks);
}


export function getTaskDate() {
    let date = document.getElementById('taskDate').value;
    let taskDate = new Date(date);

    // let day = taskDate.getDate();
    // let month = taskDate.getMonth() + 1; // January is 0, so we add 1
    // let year = taskDate.getFullYear();
  
    // taskDate = day + '-' + month + '-' + year;
    return taskDate;
}

function cancelTaskCreation(newTaskButton) {
    newTaskButton.style.display = 'block';
    newTaskForm.style.visibility = 'hidden';
}

export { newTask };
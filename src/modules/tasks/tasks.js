import { myTasks, newTaskForm, cancelTask } from "../..";
import { showAllTasks } from "../inbox";


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
        addNewTask(); //create new task card
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        console.log('cancel task clicked')
        e.preventDefault();
        cancelTaskCreation(newTaskButton);
    }
}

function addNewTask() {
    let newTask = document.createElement('div');
    newTask.classList.add('newTask');

    let check = document.createElement('input');
    check.type = "checkbox";
    newTask.append(check);

    let taskName = document.createElement('h3');
    taskName.textContent = document.getElementById('taskName').value;
    newTask.append(taskName);

    let taskDate = getTaskDate();
    newTask.setAttribute("data-date", taskDate);
    newTask.setAttribute("data-index", myTasks.length);

    // let taskDetails = createTaskDetails();
    // newTask.append(taskDetails);
    // newTask.onclick = function() {
    //     showTaskDetails(taskDetails);
    // }

    myTasks.push(newTask);
    document.getElementById('taskName').value = "";
    newTaskForm.style.visibility = 'hidden';
    showAllTasks();
    console.log(myTasks);
}




function getTaskDate() {
    let date = document.getElementById('taskDate').value;
    let taskDate = new Date(date);

    let day = taskDate.getDate();
    let month = taskDate.getMonth() + 1; // January is 0, so we add 1
    let year = taskDate.getFullYear();
  
    taskDate = day + '-' + month + '-' + year;
    return taskDate;
}

// function createTaskDetails() {
//     let taskDetails = document.createElement('div');
//     taskDetails.classList.add('taskDetails');
//     let taskDesc = document.createElement('p'); 
//     taskDesc.textContent = document.getElementById('taskDesc').value;
//     taskDetails.append(taskDesc);

//     return taskDetails;
// }

// function showTaskDetails(taskDetails) {
//     taskDetails.style.visibility = 'visible';
// }

function cancelTaskCreation(newTaskButton) {
    newTaskButton.style.display = 'block';
    newTaskForm.style.visibility = 'hidden';
}

export { newTask };
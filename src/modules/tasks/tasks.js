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

    newTaskForm.style.display = 'block';
    newTaskForm.style.width = getComputedStyle(newTaskButton).width;
    newTaskButton.style.display = 'none';

    window.addEventListener('resize', updateWidth);

    function updateWidth() {
        newTaskButton.style.display = 'block';
        newTaskForm.style.width = getComputedStyle(newTaskButton).width;
        newTaskButton.style.display = 'none';
    
    }

    newTaskForm.onsubmit = function(e) {
        console.log('submit new task clicked')
        addNewTask(newTaskButton); //create new task card
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        console.log('cancel task clicked')
        newTaskButton.style.display = 'block';
        newTaskForm.reset();
        newTaskForm.style.display = 'none';
        e.preventDefault();
    }
}

function addNewTask(newTaskButton) {

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
    loadInbox();
    console.log(myTasks);
}

export { newTask };
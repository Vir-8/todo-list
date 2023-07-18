import { subTaskForm, cancelSubTask } from "../..";
import { showAllTasks } from "../inbox";


export function newSubTask(task) {

    task.subTaskDiv.insertAdjacentElement('afterend', subTaskForm);

    subTaskForm.style.visibility = 'visible';

    subTaskForm.onsubmit = function(e) {
        console.log('submit subtask clicked')
        addNewSubTask(task); //create new subtask card
        e.preventDefault();
    };

    cancelSubTask.onclick = function(e) {
        console.log('cancel task clicked')
        e.preventDefault();
    }
}

function addNewSubTask(task) {

    let newSubTask = document.createElement('div');
    newSubTask.classList.add('subTask');

    let check = document.createElement('input');
    check.type = "checkbox";
    newSubTask.append(check);

    let taskName = document.createElement('h3');
    taskName.textContent = document.getElementById('subTaskName').value;
    newSubTask.append(taskName);

    newSubTask.setAttribute("data-index", task.subTasks.length);

    task.subTasks.push(newSubTask);
    task.subTaskDiv.append(newSubTask);
    showAllTasks();

    subTaskForm.reset();
    subTaskForm.style.visibility = 'hidden';
    console.log(task.subTasks);
}
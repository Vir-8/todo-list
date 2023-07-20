import { subTaskForm, cancelSubTask, myTasks } from "../..";
import { showAllTasks } from "../inbox";


export function newSubTask(task) {

    task.subTaskDiv.insertAdjacentElement('afterend', subTaskForm);

    subTaskForm.style.display = 'block';

    subTaskForm.onsubmit = function(e) {
        console.log('submit subtask clicked')
        addNewSubTask(task); //create new subtask card
        e.preventDefault();
    };

    cancelSubTask.onclick = function(e) {
        console.log('cancel task clicked')
        subTaskForm.reset();
        subTaskForm.style.display = 'none';
        e.preventDefault();
    }
}

function addNewSubTask(task) {

    let newSubTask = document.createElement('div');
    newSubTask.classList.add('subTask');

    let check = document.createElement('input');
    check.type = "checkbox";
    newSubTask.append(check);

    let taskName = document.createElement('input');
    taskName.type = 'text';
    taskName.value = document.getElementById('subTaskName').value;
    newSubTask.append(taskName);

    newSubTask.setAttribute("data-index", task.subTasks.length);

    task.subTasks.push(newSubTask);
    task.subTaskDiv.append(newSubTask);

    check.addEventListener('change', function() {
        if (check.checked) {
          // Mark task as completed
          newSubTask.classList.add('subTaskDone');
          
          console.log(myTasks);
        } else {
            newSubTask.classList.remove('subTaskDone');
        }
    });

    subTaskForm.reset();
    subTaskForm.style.display = 'none';
    console.log(task.subTasks);
}
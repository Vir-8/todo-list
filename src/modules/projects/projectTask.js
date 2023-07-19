import { newTaskForm, cancelTask, myProjects } from "../..";
import { showProjectTasks } from "./loadProject";
import { getTaskDate } from "../tasks/tasks";
import { displayMenu } from "../tasks/taskMenu";

export function newProjectTask(newProjectTaskButton, newProject) {
    // Position the form exactly where the button is
    var buttonRect = newProjectTaskButton.getBoundingClientRect();

    var buttonTop = buttonRect.top;
    var buttonLeft = buttonRect.left;
    newTaskForm.style.top = buttonTop + 'px';
    newTaskForm.style.left = buttonLeft + 'px';

    newProjectTaskButton.style.display = 'none';
    newTaskForm.style.visibility = 'visible';

    newTaskForm.onsubmit = function(e) {
        console.log('submit new task clicked')
        addNewProjectTask(newProject); //create new task card

        newProjectTaskButton.style.display = 'block';
        newTaskForm.reset();
        newTaskForm.style.visibility = 'hidden';
        e.preventDefault();
    };

    cancelTask.onclick = function(e) {
        console.log('cancel task clicked')

        newProjectTaskButton.style.display = 'block';
        newTaskForm.reset();
        newTaskForm.style.visibility = 'hidden';
        e.preventDefault();
    }
}

function addNewProjectTask(newProject) {
    let mainTaskContainer = document.createElement('div');
    mainTaskContainer.classList.add('mainTaskContainer');

    let newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('newTask');

    let subTaskContainer = document.createElement('div');
    subTaskContainer.classList.add('subTaskContainer');

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

    let projectTask = {
        id: newProject.tasks.length,
        taskDate: getTaskDate(),
        subTasks: [],
        mainTaskDiv: mainTaskContainer,
        newTaskDiv: newTaskContainer,
        subTaskDiv: subTaskContainer
    }

    //displayMenu(projectTask);

    taskDate.addEventListener('change', function() {
        let newTaskDate = new Date(taskDate.value);
        // Update the task object with the new task date
        projectTask.taskDate = newTaskDate;
    });


    check.addEventListener('change', function() {
        if (check.checked) {
          // Mark task as completed
          let projectId = newProject.id;
          let taskIndex = newProject.tasks.indexOf(projectTask);
      
          if (taskIndex > -1) {
            myProjects[projectId].tasks.splice(taskIndex, 1);
          }

          showProjectTasks(newProject);
        } 
    });

    displayMenu(projectTask);
    newProject.tasks.push(projectTask);

    showProjectTasks(newProject);
}
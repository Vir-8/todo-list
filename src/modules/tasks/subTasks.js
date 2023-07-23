import { subTaskForm, cancelSubTask, myTasks, myProjects, newTaskForm, projectForm } from "../..";
import loadInbox from "../inbox";
import loadToday from "../today";
import loadWeek from "../week";
import { loadProject, showProjectTasks } from "../projects/loadProject";

export function newSubTask(mainTaskContainer, pageID) {

    mainTaskContainer.append(subTaskForm);
    cleanPage();

    let addSubTaskButton = subTaskForm.previousElementSibling;

    subTaskForm.onsubmit = function(e) {
        addNewSubTask(mainTaskContainer, pageID); //create new subtask card
        e.preventDefault();
    };

    cancelSubTask.onclick = function(e) {
        subTaskForm.reset();
        addSubTaskButton.style.display = 'flex';
        subTaskForm.style.display = 'none';
        e.preventDefault();
    }
}

function addNewSubTask(mainTaskContainer, pageID) {

    let taskContainerID = mainTaskContainer.getAttribute("data-index");

    if(pageID === 'inbox' || pageID === 'today' || pageID === 'week') {

        let subTask = {
            id: myTasks[taskContainerID].subTasks.length,
            name: document.getElementById('subTaskName').value,
            isChecked: false
        }
        myTasks[taskContainerID].subTasks.push(subTask);
    
        if (pageID == 'inbox') {
            loadInbox(taskContainerID);
        } else if (pageID == 'today') {
            loadToday(taskContainerID);
        } else if (pageID == 'week') {
            loadWeek(taskContainerID);
        }
        localStorage.setItem('myTasks', JSON.stringify(myTasks));
    } else {
        let subTask = {
            id: myProjects[pageID].tasks[taskContainerID].subTasks.length,
            name: document.getElementById('subTaskName').value,
            isChecked: false
        }
    
        myProjects[pageID].tasks[taskContainerID].subTasks.push(subTask);
        localStorage.setItem('myProjects', JSON.stringify(myProjects));

        let newProject = myProjects[pageID];
        showProjectTasks(newProject, taskContainerID);
        console.log("loading shit with taskcontainerid " + taskContainerID);
    }
}

function cleanPage() {
    subTaskForm.style.display = 'block';
    subTaskForm.reset();
    document.getElementById('subTaskName').focus();

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    projectForm.reset();
    projectForm.style.display = 'none';

    let newTaskButton = document.querySelector('.newTaskButton');
    newTaskButton.style.display = 'block';
}
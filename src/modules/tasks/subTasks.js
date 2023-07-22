import { subTaskForm, cancelSubTask, myTasks, myProjects, newTaskForm, projectForm } from "../..";
import loadInbox from "../inbox";
import loadToday from "../today";
import loadWeek from "../week";
import { loadProject } from "../projects/loadProject";

export function newSubTask(mainTaskContainer, pageID) {

    mainTaskContainer.append(subTaskForm);
    cleanPage();

    subTaskForm.onsubmit = function(e) {
        console.log('submit subtask clicked')
        addNewSubTask(mainTaskContainer, pageID); //create new subtask card
        e.preventDefault();
    };

    cancelSubTask.onclick = function(e) {
        console.log('cancel task clicked')
        subTaskForm.reset();
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
            loadInbox();
        } else if (pageID == 'today') {
            loadToday();
        } else if (pageID == 'week') {
            loadWeek();
        }

        localStorage.setItem('myTasks', JSON.stringify(myTasks));
    }
    else {

        console.log("project subtask???/")
        let subTask = {
            id: myProjects[pageID].tasks[taskContainerID].subTasks.length,
            name: document.getElementById('subTaskName').value,
            isChecked: false
        }
    
        myProjects[pageID].tasks[taskContainerID].subTasks.push(subTask);
        localStorage.setItem('myProjects', JSON.stringify(myProjects));

        let newProject = myProjects[pageID];
        loadProject(newProject);
    }

    subTaskForm.reset();
    subTaskForm.style.display = 'none';
}

function cleanPage() {
    subTaskForm.style.display = 'block';
    document.getElementById('subTaskName').focus();

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    projectForm.reset();
    projectForm.style.display = 'none';

    document.querySelector('.newTaskButton').style.display = 'block';
}
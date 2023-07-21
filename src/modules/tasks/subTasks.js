import { subTaskForm, cancelSubTask, myTasks, myProjects } from "../..";
import { showAllTasks } from "../inbox";
import loadInbox from "../inbox";
import { loadProject } from "../projects/loadProject";

export function newSubTask(mainTaskContainer, projectID) {

    mainTaskContainer.insertAdjacentElement('afterend', subTaskForm);

    subTaskForm.style.display = 'block';

    subTaskForm.onsubmit = function(e) {
        console.log('submit subtask clicked')
        addNewSubTask(mainTaskContainer, projectID); //create new subtask card
        e.preventDefault();
    };

    cancelSubTask.onclick = function(e) {
        console.log('cancel task clicked')
        subTaskForm.reset();
        subTaskForm.style.display = 'none';
        e.preventDefault();
    }
}

function addNewSubTask(mainTaskContainer, projectID) {

    let taskContainerID = mainTaskContainer.getAttribute("data-index");

    if(projectID == 'none') {
        let subTask = {
            id: myTasks[taskContainerID].subTasks.length,
            name: document.getElementById('subTaskName').value,
            isChecked: false
        }
    
        myTasks[taskContainerID].subTasks.push(subTask);
    
        loadInbox();
        localStorage.setItem('myTasks', JSON.stringify(myTasks));
    }
    else {

        console.log("project subtask???/")
        let subTask = {
            id: myProjects[projectID].tasks[taskContainerID].subTasks.length,
            name: document.getElementById('subTaskName').value,
            isChecked: false
        }
    
        myProjects[projectID].tasks[taskContainerID].subTasks.push(subTask);
        localStorage.setItem('myProjects', JSON.stringify(myProjects));

        let newProject = myProjects[projectID];
        loadProject(newProject);
        
    }


    subTaskForm.reset();
    subTaskForm.style.display = 'none';
}
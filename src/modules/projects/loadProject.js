import { contentHeader, taskContainer, newTaskForm, cancelTask, taskList, newTaskButtonContainer, subTaskForm, myProjects } from "../..";
import { newProjectTask } from "./projectTask";
import { displayMenu } from "../tasks/taskMenu";

export const loadProject = (newProject) => {

    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    projectHeader(newProject);
    showProjectTasks(newProject);
}

function projectHeader(newProject) {

    contentHeader.textContent = "";

    let header = document.createElement('h1')
    header.textContent = newProject.name;
    header.classList.add('pageHeader');

    contentHeader.append(header);
}

export function showProjectTasks(newProject) {
    newTaskButtonContainer.textContent = "";
    taskList.textContent = "";
    for (let i = 0; i < newProject.tasks.length; i++)
    {
        let projectTask = newProject.tasks[i];
        let projectID = newProject.id;

        let mainTaskContainer = document.createElement('div');
        mainTaskContainer.setAttribute("data-index", i);
        mainTaskContainer.classList.add('mainTaskContainer');
    
        let newTaskContainer = document.createElement('div');
        newTaskContainer.classList.add('newTask');
    
        let subTaskContainer = document.createElement('div');
        subTaskContainer.classList.add('subTaskContainer');
    
        let check = document.createElement('input');
        check.type = "checkbox";
    
        let newTaskContent = document.createElement('div');
        newTaskContent.classList.add('newTaskContent');
    
        let taskName = document.createElement('input');
        taskName.type = 'text';
        taskName.value = projectTask.mainTaskData.mainTaskName;
    
        let taskDate = document.createElement('input');
        taskDate.type = 'date';
        taskDate.value = projectTask.mainTaskData.mainTaskDate;

        newTaskContainer.append(check);

        newTaskContent.append(taskName);
        newTaskContent.append(taskDate);
    
        newTaskContainer.append(newTaskContent);

        mainTaskContainer.append(newTaskContainer);
        mainTaskContainer.append(subTaskContainer);

        taskDate.addEventListener('change', function() {
            projectTask.mainTaskData.mainTaskDate = taskDate.value;
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
        });

        displayMenu(mainTaskContainer, projectID);
        taskList.append(mainTaskContainer)

        for (let j = 0; j < projectTask.subTasks.length; j++) 
        {
            let newSubTask = document.createElement('div');
            newSubTask.classList.add('subTask');
            newSubTask.setAttribute("data-index", projectTask.subTasks[j].id);
        
            let check = document.createElement('input');
            check.type = "checkbox";
            newSubTask.append(check);
        
            let taskName = document.createElement('input');
            taskName.type = 'text';
            taskName.value = projectTask.subTasks[j].name;
            newSubTask.append(taskName);

            subTaskContainer.append(newSubTask);

            if(projectTask.subTasks[j].isChecked) {
                check.checked = true;
                newSubTask.classList.add('subTaskDone');
            } else {
                check.checked = false;
                newSubTask.classList.remove('subTaskDone');
            }

            check.addEventListener('change', function() {
                if (check.checked) {
                    // Mark task as completed
                    newSubTask.classList.add('subTaskDone');
                    projectTask.subTasks[j].isChecked = true;
                    localStorage.setItem('myProjects', JSON.stringify(myProjects));
                } else {
                    newSubTask.classList.remove('subTaskDone');
                    projectTask.subTasks[j].isChecked = false;
                    localStorage.setItem('myProjects', JSON.stringify(myProjects));
                }
            });
        }

        check.addEventListener('change', function() {
            if (check.checked) {
            
            newProject.tasks.splice(i, 1);
            loadProject(newProject);
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
            } 
        });
    }

    let newProjectTaskButton = document.createElement('button');
    newProjectTaskButton.textContent = "new button!";

    newProjectTaskButton.onclick = function() {
        newProjectTask(newProjectTaskButton, newProject);
    };

    newProjectTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newProjectTaskButton);
}
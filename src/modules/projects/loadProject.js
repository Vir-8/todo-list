import { contentHeader, newTaskForm, taskList, newTaskButtonContainer, subTaskForm, myProjects, projectForm } from "../..";
import { newProjectTask } from "./projectTask";
import { displayMenu, loadMenu } from "../tasks/taskMenu";
import { loadProjectSideBar } from "../sideBar";
import menuImg from '../../assets/menu.svg';
import { resetDate } from "../today";
import { newSubTask } from "../tasks/subTasks";

export const loadProject = (newProject, taskContainerID) => {
    cleanPage();
    projectHeader(newProject);
    showProjectTasks(newProject, taskContainerID);
}

function projectHeader(newProject) {

    contentHeader.textContent = "";
    let header = document.createElement('input')
    header.type = "text";
    header.value = newProject.name;
    header.classList.add('projectPageHeader');
    contentHeader.append(header);

    header.addEventListener('change', function(){
        const inputValue = header.value.trim();

        if (inputValue.length < 1)
        {
            alert("Project name cannot be empty!");
            header.value = newProject.name;
        }
        else 
        {
            newProject.name = header.value;
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
            loadProjectSideBar();
        }
    });
}

function showProjectTasks(newProject, taskContainerID) {
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
    
        let check = document.createElement('input');
        check.type = "checkbox";
        newTaskContainer.append(check);
    
        let newTaskContent = document.createElement('div');
        newTaskContent.classList.add('newTaskContent');
    
        let taskName = document.createElement('input');
        taskName.type = 'text';
        taskName.value = projectTask.mainTaskData.mainTaskName;
        newTaskContent.append(taskName);
    
        let rightSide = document.createElement('div');
        rightSide.classList.add('right-side');
    
        let taskDate = document.createElement('input');
        taskDate.type = 'date';
        taskDate.value = projectTask.mainTaskData.mainTaskDate;
        rightSide.append(taskDate);
    
        let menuDropDown = document.createElement('div');
        menuDropDown.classList.add('menuDropDown');
        let svgImage = document.createElement('img');
        svgImage.src = menuImg; 
    
        menuDropDown.appendChild(svgImage);
    
        rightSide.append(menuDropDown);

        newTaskContent.append(rightSide);
        newTaskContainer.append(newTaskContent);
    
        let subTaskContainer = document.createElement('div');
        subTaskContainer.classList.add('subTaskContainer');
    
        mainTaskContainer.append(newTaskContainer);
        mainTaskContainer.append(subTaskContainer);
    
        let addSubTaskButton = document.createElement('button');
        addSubTaskButton.classList.add('addSubTaskButton');
        addSubTaskButton.textContent = "+ Add Subtask";
        mainTaskContainer.append(addSubTaskButton);

        displayMenu(mainTaskContainer, projectID);
        taskList.append(mainTaskContainer);

        if (i == taskContainerID) {
            newSubTask(mainTaskContainer, projectID, addSubTaskButton)
        }

        loadSubtasks(projectTask, mainTaskContainer, subTaskContainer, projectID);

        taskDate.addEventListener('change', function() {
            projectTask.mainTaskData.mainTaskDate = taskDate.value;
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
        });

        taskDate.addEventListener('click', function() {
            taskDate.showPicker();
        });

        taskName.addEventListener('change', function() {
            projectTask.mainTaskData.mainTaskName = taskName.value;
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
        });
    
        menuDropDown.addEventListener('click', function() {
            loadMenu(mainTaskContainer, projectID, 'menuDropDown');
        });
        
        mainTaskContainer.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox' && e.target.tagName !== 'BUTTON')
            {
                let subTaskButtons = document.querySelectorAll('.addSubTaskButton');
                subTaskButtons.forEach(button => button.style.display = 'none');
                if (subTaskForm.style.display !== 'block') {
                    addSubTaskButton.style.display = 'flex';
                }   
            }
            e.stopPropagation();
        });

        addSubTaskButton.addEventListener('click', function() {
            newSubTask(mainTaskContainer, projectID, addSubTaskButton);
            addSubTaskButton.style.display = 'none';
        });

        document.addEventListener('click', function(e) {
            if (!mainTaskContainer.contains(e.target)) {
                addSubTaskButton.style.display = 'none';
            }
        });

        check.addEventListener('change', function() {
            if (check.checked) {
            
            newProject.tasks.splice(i, 1);

            mainTaskContainer.classList.add('start-animation')
            mainTaskContainer.addEventListener('animationend', function() {
                loadProject(newProject);
            }, { once: true });
              
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
            } 
        });
    }

    let newProjectTaskButton = document.createElement('button');
    newProjectTaskButton.textContent = "+ New Task";

    newProjectTaskButton.onclick = function() {
        newProjectTask(newProjectTaskButton, newProject);
    };

    newProjectTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newProjectTaskButton);
}


function loadSubtasks(projectTask, mainTaskContainer, subTaskContainer, projectID) {

    subTaskContainer.textContent = "";
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

        let deleteSubTaskButton = document.createElement('button');
        deleteSubTaskButton.textContent = "-";
        deleteSubTaskButton.classList.add('deleteSubTaskButton');

        newSubTask.append(deleteSubTaskButton);

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

        deleteSubTaskButton.addEventListener('click', function() {
            projectTask.subTasks.splice(j, 1);
            newSubTask.classList.add('subTaskDelete-animation')

            localStorage.setItem('myProjects', JSON.stringify(myProjects));

            newSubTask.addEventListener('animationend', function() {
                loadSubtasks(projectTask, mainTaskContainer, subTaskContainer, projectID);
            });

            if (subTaskForm.style.display == 'block') {
                document.getElementById('subTaskName').focus();
            } else if (newTaskForm.style.display == 'block') {
                document.getElementById('taskName').focus();
            } else if (projectForm.style.display == 'flex') {
                document.getElementById('projectName').focus();
            }
        });
    }
}


function cleanPage() {
    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";

    resetDate();
}
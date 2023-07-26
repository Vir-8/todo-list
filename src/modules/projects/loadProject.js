import { contentHeader, newTaskForm, taskList, newTaskButtonContainer, subTaskForm, myProjects, projectForm, contentHolder } from "../..";
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

    let newProjectTaskButton = document.createElement('button');
    newProjectTaskButton.textContent = "+ New Task";

    newProjectTaskButton.onclick = function() {
        newProjectTask(newProjectTaskButton, newProject);
    };

    newProjectTaskButton.classList.add('newTaskButton');
    newTaskButtonContainer.append(newProjectTaskButton);

    taskList.textContent = "";
    for (let i = 0; i < newProject.tasks.length; i++)
    {
        let projectTask = newProject.tasks[i];
        let projectID = newProject.id;

        let {mainTaskContainer, subTaskContainer, check, taskName, taskDate, addSubTaskButton, menuDropDown} = createProjectTaskElement(projectTask, i);

        displayMenu(mainTaskContainer, projectID);
        taskList.append(mainTaskContainer);

        loadSubtasks(projectTask, mainTaskContainer, subTaskContainer, projectID);

        try {
            // Code that might cause an error, including the part that uses taskContainerID
            if (typeof taskContainerID !== 'undefined' && taskContainerID == i) {
                newSubTask(mainTaskContainer, projectID)
            }
        } catch (error) {
            // Handle the error here or log it to the console
            console.error("An error occurred:", error);
        }

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
            newSubTask(mainTaskContainer, projectID);
            addSubTaskButton.style.display = 'none';
        });

        document.addEventListener('click', function(e) {
            if (!mainTaskContainer.contains(e.target)) {
                addSubTaskButton.style.display = 'none';
            }
        }, {once: true});

        check.addEventListener('change', function() {
            let scrollYPosition = contentHolder.scrollTop;
            if (check.checked) {
            newProject.tasks.splice(i, 1);

            mainTaskContainer.classList.add('start-animation')
            mainTaskContainer.addEventListener('animationend', function() {
                loadProject(newProject);
                contentHolder.scrollTop = scrollYPosition;
            }, { once: true });
              
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
            } 
        });
    }
}


function loadSubtasks(projectTask, mainTaskContainer, subTaskContainer, projectID) {

    subTaskContainer.textContent = "";
    for (let j = 0; j < projectTask.subTasks.length; j++) 
    {
        let {newSubTask, taskName, check, deleteSubTaskButton} = createProjectSubTaskElements(projectTask, j);
        subTaskContainer.append(newSubTask);

        if(projectTask.subTasks[j].isChecked) {
            check.checked = true;
            newSubTask.classList.add('subTaskDone');
        } else {
            check.checked = false;
            newSubTask.classList.remove('subTaskDone');
        }

        taskName.addEventListener('change', function() {
            projectTask.subTasks[j].name = taskName.value;
            localStorage.setItem('myProjects', JSON.stringify(myProjects));
        });

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

function createProjectTaskElement(projectTask, i) {
    let mainTaskContainer = document.createElement('div');
    mainTaskContainer.setAttribute("data-index", i);
    mainTaskContainer.classList.add('mainTaskContainer');

    let newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('newTask');

    let check = document.createElement('input');
    check.type = "checkbox";

    let newTaskContent = document.createElement('div');
    newTaskContent.classList.add('newTaskContent');

    let taskName = document.createElement('input');
    taskName.type = 'text';
    taskName.value = projectTask.mainTaskData.mainTaskName;

    let rightSide = document.createElement('div');
    rightSide.classList.add('right-side');

    let taskDate = document.createElement('input');
    taskDate.type = 'date';
    taskDate.value = projectTask.mainTaskData.mainTaskDate;

    let menuDropDown = document.createElement('div');
    menuDropDown.classList.add('menuDropDown');
    let svgImage = document.createElement('img');
    svgImage.src = menuImg; 

    let subTaskContainer = document.createElement('div');
    subTaskContainer.classList.add('subTaskContainer');

    let addSubTaskButton = document.createElement('button');
    addSubTaskButton.classList.add('addSubTaskButton');
    addSubTaskButton.textContent = "+ Add Subtask";

    newTaskContainer.append(check);
    newTaskContainer.append(newTaskContent);

    newTaskContent.append(taskName);
    newTaskContent.append(rightSide);

    rightSide.append(taskDate);
    rightSide.append(menuDropDown);
    menuDropDown.appendChild(svgImage);

    mainTaskContainer.append(newTaskContainer);
    mainTaskContainer.append(subTaskContainer);
    mainTaskContainer.append(addSubTaskButton);

    return {mainTaskContainer, subTaskContainer, check, taskName, taskDate, addSubTaskButton, menuDropDown};
}

function createProjectSubTaskElements(projectTask, j) {
    let newSubTask = document.createElement('div');
    newSubTask.classList.add('subTask');
    newSubTask.setAttribute("data-index", projectTask.subTasks[j].id);

    let check = document.createElement('input');
    check.type = "checkbox";

    let taskName = document.createElement('input');
    taskName.type = 'text';
    taskName.value = projectTask.subTasks[j].name;

    let deleteSubTaskButton = document.createElement('button');
    deleteSubTaskButton.textContent = "-";
    deleteSubTaskButton.classList.add('deleteSubTaskButton');

    newSubTask.append(check);
    newSubTask.append(taskName);
    newSubTask.append(deleteSubTaskButton);

    return {newSubTask, taskName, check, deleteSubTaskButton};
}

function cleanPage() {
    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    taskList.textContent = "";

    contentHeader.style.display = "flex";
    contentHeader.textContent = "";
    contentHolder.scrollTop = 0;

    const dateInput = document.getElementById('taskDate');
    dateInput.min = '';
    dateInput.max = '';
    resetDate();
}
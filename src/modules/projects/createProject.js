import { myProjects, projectForm, cancelProject, newTaskForm, subTaskForm } from "../..";
import { loadProject } from "./loadProject";
import { highLightButton, loadProjectSideBar } from "../sideBar.js";

let currentProject;

export const getCurrentProject = () => currentProject;

export const setCurrentProject = (newProject) => {
  currentProject = newProject;
};

export function showProjectForm() {

    cleanPage();

    projectForm.onsubmit = function(e) {
        createNewProject();
        hideProjectForm(e);
        e.preventDefault();
    };

    cancelProject.onclick = hideProjectForm;
}

function hideProjectForm(e) {
    projectForm.reset();
    projectForm.style.display = 'none';
    e.preventDefault();
}

function createNewProject() {

    let newProject = {
        id: myProjects.length,
        name: document.getElementById('projectName').value,
        tasks: []
    }

    myProjects.push(newProject);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));

    highLightButton();
    loadProjectSideBar();
}

function cleanPage() {
    newTaskForm.reset();
    newTaskForm.style.display = 'none';

    document.querySelector('.newTaskButton').style.display = 'block';

    subTaskForm.reset();
    subTaskForm.style.display = 'none';

    projectForm.style.display = 'flex';
    document.getElementById('projectName').focus();
}


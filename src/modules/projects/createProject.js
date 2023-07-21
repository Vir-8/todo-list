import { myProjects, projectForm, cancelProject, projectContainer } from "../..";
import { loadProject } from "./loadProject";
import { highLightButton, loadProjectSideBar } from "../sideBar.js";

let currentProject;

export const getCurrentProject = () => currentProject;

export const setCurrentProject = (newProject) => {
  currentProject = newProject;
};

export function showProjectForm() {
    projectForm.style.display = 'flex';
    
    projectForm.onsubmit = function(e) {
        createNewProject();
        projectForm.reset();
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



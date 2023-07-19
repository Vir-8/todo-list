import { myProjects, projectForm, cancelProject, projectContainer } from "../..";
import { loadProject } from "./loadProject";
import { highLightButton } from "../sideBar.js";

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
    let newProjectButton = document.createElement('button');
    newProjectButton.classList.add('newProject');
    newProjectButton.classList.add('sideBarButton');
    newProjectButton.textContent = document.getElementById('projectName').value;
    
    let newProject = {
        id: myProjects.length,
        tasks: []
    }

    projectContainer.append(newProjectButton);
    myProjects.push(newProject);

    highLightButton();

    newProjectButton.addEventListener('click', function() {
        loadProject(newProject);
    });
}



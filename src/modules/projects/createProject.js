import { myProjects, projectForm, addProject, cancelProject, projectContainer } from "../..";
import { loadProject } from "./loadProject";

export function showProjectForm() {
    projectForm.style.display = 'block';
    
    projectForm.onsubmit = function(e) {
        createNewProject();
        e.preventDefault();
    };
    cancelProject.onclick = hideProjectForm;
}

function hideProjectForm(e) {
  projectForm.style.display = 'none';
  e.preventDefault();
}

function createNewProject() {
    let newProjectButton = document.createElement('button');
    newProjectButton.classList.add('newProject');
    newProjectButton.textContent = document.getElementById('projectName').value;
    
    let newProject = {
        id: myProjects.length,
        tasks: []
    }
    
    newProjectButton.addEventListener('click', function() {
        loadProject(newProject);
    });

    projectContainer.append(newProjectButton);
    myProjects.push(newProject);
}



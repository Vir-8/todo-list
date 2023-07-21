import { myProjects, myTasks, projectContainer } from "..";
import loadInbox from "./inbox";
import { loadProject } from "./projects/loadProject";

export let currentProject;

export function highLightButton() {

    let buttons = document.querySelectorAll('.sideBarButton');

    buttons.forEach(button => {

        button.onclick = () => {
            buttons = document.querySelectorAll('.sideBarButton');

            buttons.forEach(button => button.classList.remove('highlight-button'));
            button.classList.add('highlight-button');
        };
    });
}


export function loadProjectSideBar() {
    projectContainer.textContent = ""
    for (let i = 0; i < myProjects.length; i++)
    {
        myProjects[i].id = i;

        let newProjectButton = document.createElement('button');
        newProjectButton.classList.add('newProject');
        newProjectButton.classList.add('sideBarButton');
    
        let deleteProjectButton = document.createElement('button');

        newProjectButton.textContent = myProjects[i].name;
        newProjectButton.append(deleteProjectButton);

        projectContainer.append(newProjectButton);
        
        newProjectButton.addEventListener('click', function(e) {
            if (!deleteProjectButton.contains(e.target)) {
                loadProject(myProjects[i]);
                currentProject = i;
            }
        });

        deleteProjectButton.addEventListener('click', function() {
            myProjects.splice(i, 1);
            console.log("deleting task " + i);
            loadProjectSideBar();

            if (currentProject == i) {
                loadInbox();
            }
        });
    }
}
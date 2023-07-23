import { myProjects, myTasks, projectContainer } from "..";
import loadInbox from "./inbox";
import { loadProject } from "./projects/loadProject";
import { getCurrentProject, setCurrentProject } from "./projects/createProject";

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
        deleteProjectButton.textContent = "-";
        deleteProjectButton.classList.add('deleteProjectButton');

        newProjectButton.textContent = myProjects[i].name;
        newProjectButton.append(deleteProjectButton);

        projectContainer.append(newProjectButton);
        
        newProjectButton.addEventListener('click', function(e) {
            if (!deleteProjectButton.contains(e.target)) {
                loadProject(myProjects[i]);
                setCurrentProject(i);
            }
        });

        deleteProjectButton.addEventListener('click', function() {
            myProjects.splice(i, 1);
            console.log("deleting task " + i);

            newProjectButton.classList.add('deleteProject-animation');
            deleteProjectButton.classList.add('deleteProject-animation');
            newProjectButton.addEventListener('animationend', function() {
                loadProjectSideBar();
            }, { once: true });

            localStorage.setItem('myProjects', JSON.stringify(myProjects));
            
            if (getCurrentProject() === i) {
                loadInbox();
                document.querySelector('.inbox').classList.add('highlight-button');
            }
        });
    }
    highLightButton();
}
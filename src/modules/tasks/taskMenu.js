import { menu, myTasks, myProjects } from "../..";
import loadInbox from "../inbox";
import { newSubTask } from "./subTasks";
import { showProjectTasks } from "../projects/loadProject";

export function displayMenu(task) {
  task.newTaskDiv.addEventListener('contextmenu', function(e) {
      e.preventDefault(); // Prevent the default right-click menu from appearing
      
      // Set the position of the custom menu based on the mouse coordinates
      menu.style.display = 'block';
      menu.style.left = `${e.pageX}px`;
      menu.style.top = `${e.pageY}px`;

      const menuItem1 = menu.querySelector('#menu-item-1');
      const menuItem2 = menu.querySelector('#menu-item-2');
    
      menuItem1.onclick = function() {
        newSubTask(task);
        menu.style.display = 'none';
      };
    
      menuItem2.onclick = function() 
      {
        if (myTasks.includes(task)) {
          myTasks.splice(task.id, 1);
          loadInbox();
        }
        else {
          // let projectId = newProject.id;
          // let taskIndex = newProject.tasks.indexOf(projectTask);

          let taskID = task.id;
          let parentProject = myProjects.find(project => project.tasks && project.tasks.includes(task));
        
          if (taskID > -1) {
            myProjects[parentProject.id].tasks.splice(taskID, 1);
          }
  
          showProjectTasks(parentProject);
        }  
        menu.style.display = 'none';  
      };
      // Append the menu to the document body
      document.body.appendChild(menu);
  });

}
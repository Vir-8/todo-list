import { menu, myTasks, myProjects } from "../..";
import loadInbox from "../inbox";
import { newSubTask } from "./subTasks";
import { showProjectTasks } from "../projects/loadProject";
import { loadProject } from "../projects/loadProject";

export function displayMenu(mainTaskContainer, pageID) {
  mainTaskContainer.addEventListener('contextmenu', function(e) {

    e.preventDefault(); 
    loadMenu(mainTaskContainer, pageID, e);
  });
}

export function loadMenu(mainTaskContainer, pageID, e) {

  let menuDropDown = mainTaskContainer.querySelector('.menuDropDown');

  const menuDropDownRect = menuDropDown.getBoundingClientRect();
  const topOffset = window.scrollY || document.documentElement.scrollTop;
  const leftOffset = window.scrollX || document.documentElement.scrollLeft;

  menu.style.display = 'block';

  const viewportWidth = window.innerWidth;
  const menuWidth = menu.offsetWidth;

  if (e === 'menuDropDown') {
    menu.style.top = (menuDropDownRect.top + topOffset + 25) + 'px';
    menu.style.left = (menuDropDownRect.left + leftOffset - menuWidth + 10) + 'px';
    
  }
  else {
    menu.style.top = `${e.pageY}px`;

    if (e.pageX + menuWidth < viewportWidth) {
      menu.style.left = `${e.pageX}px`;
    } else {
      menu.style.left = `${e.pageX - menuWidth}px`;
    }
  }

  const menuItem1 = menu.querySelector('#menu-item-1');
  const menuItem2 = menu.querySelector('#menu-item-2');

  menuItem1.onclick = function() {
    newSubTask(mainTaskContainer, pageID);
    menu.style.display = 'none';
  };

  menuItem2.onclick = function() {
    deleteTask(mainTaskContainer, pageID);
    menu.style.display = 'none';
  };

  document.body.appendChild(menu);

  document.body.onclick = (e) => {
    console.log("clicked");
    if (!menu.contains(e.target) && !menuDropDown.contains(e.target)) {
      console.log("clicked outside task");
      menu.style.display = 'none'; // Hide the custom menu
    }
  }

  window.addEventListener('resize', function() {
    menu.style.display = 'none'
  });
}

function deleteTask(mainTaskContainer, pageID) {

  let taskContainerID = mainTaskContainer.getAttribute("data-index");

  if(pageID === 'inbox' || pageID === 'today' || pageID === 'week') {

    myTasks.splice(taskContainerID, 1);

    if (pageID == 'inbox') {
      loadInbox();
    } else if (pageID == 'today') {
      loadToday();
    } else if (pageID == 'week') {
      loadWeek();
    }

    localStorage.setItem('myTasks', JSON.stringify(myTasks));
  }
  else {
    myProjects[pageID].tasks.splice(taskContainerID, 1);
    localStorage.setItem('myProjects', JSON.stringify(myProjects));

    let newProject = myProjects[pageID];
    loadProject(newProject);
  }


  // if (myTasks.includes(task)) {
  //   myTasks.splice(task.id, 1);
  //   localStorage.setItem('myTasks', JSON.stringify(myTasks));

  //   if (page == 'inbox') {
  //     loadInbox();
  //   } else if (page == 'today') {
  //     loadToday();
  //   } else if (page == 'week') {
  //     loadWeek();
  //   }
  // }
  // else {
  //   let taskID = task.id;
  //   let parentProject = myProjects.find(project => project.tasks && project.tasks.includes(task));
  
  //   if (taskID > -1) {
  //     myProjects[parentProject.id].tasks.splice(taskID, 1);
  //   }
  //   showProjectTasks(parentProject);
  // }  


  menu.style.display = 'none';  
}
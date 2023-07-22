import { menu, myTasks, myProjects } from "../..";
import loadInbox from "../inbox";
import { newSubTask } from "./subTasks";
import { showProjectTasks } from "../projects/loadProject";

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

  if (e === 'menuDropDown') {
    menu.style.top = (menuDropDownRect.top + topOffset + 30) + 'px';
    menu.style.left = (menuDropDownRect.left + leftOffset) + 'px';
  }
  else {
    menu.style.top = `${e.pageY}px`;
    menu.style.left = `${e.pageX}px`;
  }

  const menuItem1 = menu.querySelector('#menu-item-1');
  const menuItem2 = menu.querySelector('#menu-item-2');

  menuItem1.onclick = function() {
    newSubTask(mainTaskContainer, pageID);
    menu.style.display = 'none';
  };

  menuItem2.onclick = deleteTask();
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

function deleteTask() {
  console.log("deleting task");
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
  // menu.style.display = 'none';  
}
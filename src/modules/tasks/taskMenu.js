import { menu, myTasks, myProjects, contentHolder } from "../..";
import loadInbox from "../inbox";
import loadToday from "../today";
import loadWeek from "../week";
import { newSubTask } from "./subTasks";
import { loadProject } from "../projects/loadProject";

export function displayMenu(mainTaskContainer, pageID) {
  mainTaskContainer.addEventListener('contextmenu', function(e) {
    e.preventDefault(); 
    const subtaskContainers = document.querySelectorAll('.subTaskContainer');
    // Check if any subtask container includes the e.target
    const isInSubtaskContainer = Array.from(subtaskContainers).some(container => container.contains(e.target));
    if (!isInSubtaskContainer) {
      loadMenu(mainTaskContainer, pageID, e);
    }
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
    
  } else {
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
    if (!menu.contains(e.target) && !menuDropDown.contains(e.target)) {
      menu.style.display = 'none'; // Hide the custom menu
    }
  }

  window.addEventListener('resize', function() {
    menu.style.display = 'none'
  });
}

function deleteTask(mainTaskContainer, pageID) {

  let taskContainerID = mainTaskContainer.getAttribute("data-index");
  let scrollYPosition = contentHolder.scrollTop;

  if(pageID === 'inbox' || pageID === 'today' || pageID === 'week') {

    myTasks.splice(taskContainerID, 1);
    mainTaskContainer.classList.add('taskDelete-animation')

    mainTaskContainer.addEventListener('animationend', function() {
      if (pageID == 'inbox') {
        loadInbox();
      } else if (pageID == 'today') {
        loadToday();
      } else if (pageID == 'week') {
        loadWeek();
      }
      contentHolder.scrollTop = scrollYPosition;
    }, { once: true });
    localStorage.setItem('myTasks', JSON.stringify(myTasks));
  }
  else {
    myProjects[pageID].tasks.splice(taskContainerID, 1);
    mainTaskContainer.classList.add('taskDelete-animation')
    mainTaskContainer.addEventListener('animationend', function() {
      let newProject = myProjects[pageID];
      loadProject(newProject);
      contentHolder.scrollTop = scrollYPosition;
    });
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
  }
  menu.style.display = 'none';  
}
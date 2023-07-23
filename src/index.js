import './style.css';
import './font.css';

import loadInbox from "./modules/inbox";
import loadToday from "./modules/today";
import loadWeek from "./modules/week";
import { showProjectForm } from './modules/projects/createProject';
import { highLightButton } from './modules/sideBar.js';
import { getStoredData } from './modules/localStorage';
import loadImages from './modules/imageLoader.js'

loadImages();

const contentHolder = document.querySelector('#content');
const contentHeader = document.querySelector('.contentHeader');

const taskContainer = document.querySelector('.taskContainer');
const newTaskButtonContainer = document.querySelector('.newTaskButtonContainer');
const taskList = document.querySelector('.taskList');
const projectContainer = document.getElementById('projectContainer')

const newTaskForm = document.querySelector('.newTaskForm');
const submitNewTask = document.getElementById('submitNewTask');
const cancelTask = document.getElementById('cancelTask');

const subTaskForm = document.querySelector('.subTaskForm');
const submitSubTask = document.getElementById('submitSubTask');
const cancelSubTask = document.getElementById('cancelSubTask');

const projectForm = document.querySelector('.projectForm');

const addProject = document.getElementById('addProject');
const cancelProject = document.getElementById('cancelProject');
const menu = document.getElementById('custom-menu');

const myTasks = [];
const myProjects = [];

getStoredData();

let inboxButton = document.querySelector('.inbox');
inboxButton.addEventListener('click', loadInbox);

let todayButton = document.querySelector('.today');
todayButton.addEventListener('click', loadToday);

let weeklyButton = document.querySelector('.week');
weeklyButton.addEventListener('click', loadWeek);

let newProjectButton = document.querySelector('.newProject');
newProjectButton.onclick = showProjectForm;

highLightButton();

export { contentHeader, contentHolder, myTasks, taskContainer, taskList, 
    newTaskForm, submitNewTask, cancelTask, subTaskForm, submitSubTask, cancelSubTask,
    myProjects, projectForm, addProject, cancelProject, projectContainer,
    menu, newTaskButtonContainer 
};

    
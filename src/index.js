import './style.css';

import loadInbox from "./modules/inbox";
import loadToday from "./modules/today";
import loadWeek from "./modules/week";
import { showProjectForm, hideProjectForm, createNewProject } from './modules/projects/createProject';

const contentHolder = document.querySelector('#content');
const contentHeader = document.querySelector('.contentHeader');

const taskContainer = document.querySelector('.taskContainer');
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

let inboxButton = document.querySelector('.inbox');
inboxButton.onclick = loadInbox;

let todayButton = document.querySelector('.today');
todayButton.onclick = loadToday;

let weeklyButton = document.querySelector('.week');
weeklyButton.onclick = loadWeek;

let newProjectButton = document.querySelector('.newProject');
newProjectButton.onclick = showProjectForm;

console.log("works lol");

export { contentHolder, myTasks, taskContainer, taskList, contentHeader, newTaskForm, submitNewTask, cancelTask,
    myProjects, projectForm, addProject, cancelProject, projectContainer,
    subTaskForm, submitSubTask, cancelSubTask, menu };
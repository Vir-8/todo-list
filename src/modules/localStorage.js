import { myTasks, myProjects } from "..";
import { displayMenu } from "./tasks/taskMenu";
import loadInbox from "./inbox";
import { loadProjectSideBar } from "./sideBar";

export function getStoredData() {
    try {
        const storedTasks = localStorage.getItem('myTasks');
        const parsedTasks = JSON.parse(storedTasks);
        console.log(parsedTasks);

        if (Array.isArray(parsedTasks)) {
            myTasks.splice(0);

            parsedTasks.forEach((parsedTask) => {

                let task = {
                    id: parsedTask.id,
                    mainTaskData: {
                        mainTaskName: parsedTask.mainTaskData.mainTaskName,
                        mainTaskDate: parsedTask.mainTaskData.mainTaskDate,
                    },
                    taskDate: parsedTask.taskDate,
                    subTasks: parsedTask.subTasks,
                }
                myTasks.push(task);
            });
        } else {
          console.error('The stored data is not a valid array.');
        }
    } catch (error) {
        console.error('Error retrieving or parsing myTasks from localStorage:', error);
    }


    try {
        const storedProjects = localStorage.getItem('myProjects');
        const parsedProjects = JSON.parse(storedProjects);
        console.log(parsedProjects);

        if (Array.isArray(parsedProjects)) {
            myProjects.splice(0);

            parsedProjects.forEach((parsedProject) => {

                let newProject = {
                    id: parsedProject.id,
                    name: parsedProject.name,
                    tasks: parsedProject.tasks
                }

                myProjects.push(newProject);
            });

        } else {
          console.error('The stored data is not a valid array.');
        }
    } catch (error) {
        console.error('Error retrieving or parsing myTasks from localStorage:', error);
    }

    loadInbox();
    document.querySelector('.inbox').classList.add('highlight-button')
    loadProjectSideBar();
}
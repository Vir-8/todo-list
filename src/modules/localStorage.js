import { myTasks, myProjects } from "..";
import { displayMenu } from "./tasks/taskMenu";
import loadInbox from "./inbox";

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
            
                //displayMenu(task);
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
    
        if (Array.isArray(parsedProjects)) {
            myProjects.splice(0);
            myProjects.push(...parsedProjects);
        } else {
          console.error('The stored data is not a valid array.');
        }
    } catch (error) {
        console.error('Error retrieving or parsing myProjects from localStorage:', error);
    }
}
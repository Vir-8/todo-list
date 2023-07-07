import loadInbox from "./modules/inbox";
import loadToday from "./modules/today";
import loadWeek from "./modules/week";

const contentHolder = document.querySelector('#content');

let inboxButton = document.querySelector('.inbox');
inboxButton.onclick = loadInbox;

let todayButton = document.querySelector('.today');
todayButton.onclick = loadToday;

let weeklyButton = document.querySelector('.week');
weeklyButton.onclick = loadWeek;

console.log("works lol");

export { contentHolder };
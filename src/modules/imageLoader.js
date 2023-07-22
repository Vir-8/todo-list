import inboxImg from '../assets/icons/inbox.svg';
import todayImg from '../assets/icons/today.svg';
import weekImg from '../assets/icons/week.svg';
import projectsImg from '../assets/icons/projects.svg';
import logoImg from '../assets/logo.svg';


function loadImages() {
    document.getElementById('inboxImage').src = inboxImg;
    document.getElementById('todayImage').src = todayImg;
    document.getElementById('weekImage').src = weekImg;
    document.getElementById('projectsImage').src = projectsImg;
    document.getElementById('logoImage').src = logoImg;
}

export default loadImages;
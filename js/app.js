/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

//navigation bar 
const navbarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// this function will add (your-active-class) class to section that referenced by the given link
const activateSection = (sectionLink) => {

    // get all sections
    const sections = document.querySelectorAll('main section');

    // remove (your-active-class) class from all sections
    for (let section of sections) {
        section.classList.remove('your-active-class');
    }

    // add (your-active-class) class to the current section
    const sectionID = sectionLink.getAttribute('href');
    const section = document.querySelector(sectionID);
    section.classList.add('your-active-class');
}

// this function will add (activeSectionItem) class to list item that referenced by the given link, and change the color of the given link
const activateSectionLink = (sectionLink) => {

    //get all li elements from navigation bar
    const linkItems = document.querySelectorAll('.navbar__menu li');

    // remove (activeSectionItem) class from all li elements, and set link color to default
    for (let linkItem of linkItems) {
        linkItem.classList.remove('activeSectionItem');
        linkItem.firstChild.setAttribute('style', '');
    }

    // add (activeSectionItem) class to the li reference to current section, and change link color
    sectionLink.setAttribute('style', 'color: rgba(0, 13, 60, 1);');
    const activeSectionItem = sectionLink.parentElement;
    activeSectionItem.classList.add('activeSectionItem');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavbar = () => {

    // get all the sections dynamically
    const main = document.querySelector('main');
    const sections = main.getElementsByTagName('section');

    // create li and a elements for each section, then append them to the navigation bar
    for (let i = 0; i < sections.length; i++) {
        const sectionItem = document.createElement('li');
        sectionItem.innerHTML = `<a href="#section${i+1}">${sections[i].getAttribute('data-nav')}</a>`;
        navbarList.appendChild(sectionItem);
    }
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {

    // prevent default jump to the referenced element
    event.preventDefault();

    // scroll to section element referenced by the link
    if (event.target.nodeName === 'A') {
        const sectionID = event.target.getAttribute('href');
        document.querySelector(sectionID).scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Add class 'active' to section when near top of viewport

// activate section and section link when the section link is clicked
const setActiveClassClick = (event) => {

    // get the clicked link
    const sectionLink = event.target;
    if (sectionLink.nodeName === 'A') {
        activateSection(sectionLink);
        activateSectionLink(sectionLink);
    }
}

// activate section and section link when near top of viewport of the section
const setActiveClassScroll = () => {

    // get current postion
    const currentPostion = document.querySelector('html').scrollTop;

    // get all a elements from navigation bar
    const links = document.querySelectorAll('.navbar__menu li a');

    // loop through links to determine the offset for each sections those referenced by links
    for (let link of links) {
        const currentLink = link;
        const refranceSection = document.querySelector(currentLink.getAttribute('href'));

        // compare between the current postion and the section offset to activate the section
        if (refranceSection.offsetTop - 200 <= currentPostion && refranceSection.offsetTop - 200 + refranceSection.offsetHeight > currentPostion) {
            activateSection(currentLink);
            activateSectionLink(currentLink)
        } else {
            link.parentElement.classList.remove('activeSectionItem');
            currentLink.setAttribute('style', '');
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
// navigation will be built when the document is loaded
document.addEventListener('load', buildNavbar()); 

// Scroll to section on link click
//the browser will scroll when the section link is clicked
navbarList.addEventListener('click', (event) => { scrollToSection(event); }); 

// Set sections as active
// the section will be activated when the section link is clicked
navbarList.addEventListener('click', (event) => { setActiveClassClick(event); }); 

// the section will be activated when near top of viewport of the section
window.addEventListener('scroll', () => { setActiveClassScroll(); }); 


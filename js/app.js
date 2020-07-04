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

const navbarList = document.getElementById('navbar__list'); //navigation bar 



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const activateSection = (secttion , sectionLink) => {

}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavbar = () => {
    const navbarList = document.getElementById('navbar__list');
    const main = document.querySelector('main');
    const sections = main.getElementsByTagName('section');
    let i = 1;
    for(let section of sections){
       const sectionItem = document.createElement('li');
       sectionItem.innerHTML = `<a href="#section${i}">Section ${i}</a>`;
       navbarList.appendChild(sectionItem);
       i++;
    }

}



// Add class 'active' to section when near top of viewport

const addClassActive = (event) => {
    const activeSection = event.target;
    
    if(activeSection.nodeName==='A'){
        //section
        const sections = document.querySelectorAll('main section');

        for(let section of sections){
            section.classList.remove('your-active-class');
        }

        const sectionID = activeSection.getAttribute('href');
        const section = document.querySelector(sectionID);

    
            section.classList.add('your-active-class');

        
    
        // links
        const linkItems = document.querySelectorAll('.navbar__menu li');

        for(let linkItem of linkItems){
            linkItem.classList.remove('activeSectionItem');
            linkItem.firstChild.setAttribute('style','');
        }

        activeSection.setAttribute('style','color: rgba(0, 13, 60, 1);');
      const  activeSectionItem = activeSection.parentElement;
        activeSectionItem.classList.add('activeSectionItem');
        
    }
}

// Scroll to anchor ID using scrollTO event

const scrollToSection = (event) => {
    event.preventDefault();
    if(event.target.nodeName==='A'){
    const sectionID = event.target.getAttribute('href');

    document.querySelector(sectionID).scrollIntoView({
        behavior: 'smooth'
      });
    }
}

const changeActiveSection = (event) => {
    const currentPostion = document.querySelector('html').scrollTop;
   
    
    const links = document.querySelectorAll('.navbar__menu li a');
    
    
    
    for(let link of links){

        let currentLink = link;
        let refranceSection = document.querySelector(currentLink.getAttribute('href'));
    
        if(refranceSection.offsetTop-200 <= currentPostion && refranceSection.offsetTop-200 + refranceSection.offsetHeight > currentPostion){

                //sections
        const sections = document.querySelectorAll('main section');

        for(let section of sections){
            section.classList.remove('your-active-class');
        }

            refranceSection.classList.add('your-active-class');

        //

            for(let linkItem of links){
                link.parentElement.classList.remove('activeSectionItem');
                linkItem.setAttribute('style','');
            }
            currentLink.parentElement.classList.add('activeSectionItem');
            currentLink.setAttribute('style','color: rgba(0, 13, 60, 1);');
        }else{
            link.parentElement.classList.remove('activeSectionItem');
            currentLink.setAttribute('style','');
        }

        
      
        }

    }

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('load',buildNavbar()); // navigation will be built when the document is loaded

// Scroll to section on link click
navbarList.addEventListener('click',(event) => { scrollToSection(event); }); //the browser will scroll when the user click on section link
// Set sections as active

navbarList.addEventListener('click',(event) => { addClassActive(event); });

window.addEventListener('scroll',(event) =>{ changeActiveSection(event); });


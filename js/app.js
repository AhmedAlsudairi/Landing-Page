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
const navbarList = document.getElementById('navbar__list');
//
const numOfSections = 5;

const sectionsList = [5];

let activeSection='main__hero';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



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
    const homeItem = document.createElement('li');
    homeItem.innerHTML='<a href="#top">Home</a>';
    navbarList.appendChild(homeItem);
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

        if(section != null){
            section.classList.add('your-active-class');
        }
        
    
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
    if(sectionID=='#top'){
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
        return;
    }
    document.querySelector(sectionID).scrollIntoView({
        behavior: 'smooth'
      });
    }
}

const changeActiveSection = (event) => {
    // const currentPostion = $(document).scrollTop();
    // console.log(currentPostion);
    
    // const links = document.querySelectorAll('.navbar__menu li a');
    
    
    
    // for(let link of links){

    //     let currentLink = link;
        
    //     if(currentLink.innerHTML!=='Home'){
    //           let refranceSection = document.querySelector(currentLink.getAttribute('href'));
        
    //     if(refranceSection.getBoundingClientRect().top <= currentPostion && refranceSection.getBoundingClientRect().top+refranceSection.getBoundingClientRect().height > currentPostion){

    //         for(let linkItem of links){
    //             linkItem.setAttribute('style','');
    //         }
    //         currentLink.setAttribute('style','color: green');
    //     }else{
    //         currentLink.setAttribute('style','');
    //     }

    //     }
      
    //     }
    var scrollPos = $(document).scrollTop();
    $('.navbar__menu li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        
        if(currLink.attr("href") !=='#top'){
            console.log(refElement);
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.navbar__menu li a').attr('style','');
            currLink.attr('style','color: green');
        }
        else{
            currLink.attr('style','');
        }
    }
    });

        // for(let section of sections){
        //     const sectionOffset = section.getBoundingClientRect().top;
        //     console.log(sectionOffset);
            
        //     if(sectionOffset<200 && sectionOffset>=-200){
        //         section.classList.add('your-active-class');
        //         items[i].classList.add('activeSectionItem')
        //     }
        //     i++;
    }

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('load',buildNavbar());

// Scroll to section on link click
navbarList.addEventListener('click',(event) => { scrollToSection(event); });
// Set sections as active

navbarList.addEventListener('click',(event) => { addClassActive(event); });

window.addEventListener('scroll',(event) =>{ changeActiveSection(event); });


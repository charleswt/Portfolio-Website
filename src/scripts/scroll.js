const skillsSlide = document.querySelector('.skills-slide');
const projectUl = document.querySelector('.project-ul-position');
const projects = Array.from(document.querySelectorAll('.projects-transition'));
const projectDetails = Array.from(document.querySelectorAll('.project-details'));

let position = JSON.parse(localStorage.getItem("pos")) ?? 0;

if (window.scrollY > 190) skillsSlide.style.left = '0';

document.getElementById("increment-btn").addEventListener("click", () => {
    position = (position + 1) % projects.length;
    projectClassManager(position);
});

document.getElementById("decrement-btn").addEventListener("click", () => {
    position = (position - 1 + projects.length) % projects.length;
    projectClassManager(position);
});

const projectClassManager = (pos = position) => {
    projectUl.style.left = (window.innerWidth /= pos)
    projects.forEach((proj, index) => {
        
        if (index === pos) {
            proj.classList.remove("projects-tilt-right", "projects-tilt-left");
            proj.style.zIndex = 12;

            const detail = proj.querySelector('.project-details');
            if (detail) {
                detail.style.height = "75%";
                detail.classList.add('show');
            }
        } else {
            proj.style.zIndex = (index > pos) ? -index + 6 : index + 6;
            proj.classList.toggle("projects-tilt-left", index > pos);
            proj.classList.toggle("projects-tilt-right", index < pos);

            const detail = proj.querySelector('.project-details');
            if (detail) {
                detail.style.height = 0;
                detail.classList.remove('show');
            }
        }
    });

    localStorage.setItem("pos", JSON.stringify(pos));
};

projectClassManager();

window.addEventListener("scroll", () => {
    if (window.scrollY > 190) skillsSlide.style.left = '0';
});

const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
});
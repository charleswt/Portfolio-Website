const skillsSlide = document.querySelector('.skills-slide');

const project1 = document.getElementById('project-1');
const project2 = document.getElementById('project-2');
const project3 = document.getElementById('project-3');
const project4 = document.getElementById('project-4');
const project5 = document.getElementById('project-5');
const project6 = document.getElementById('project-6');

const projectUl = document.getElementsByClassName("project-ul-position")

const ids = [project1, project2, project3, project4, project5, project6]

let position = JSON.parse(localStorage.getItem("pos")) ?? 0;

document.getElementById("increment-btn")
.addEventListener("click", ()=>{
    position === 5? 
    position = 0:
    position++

    classManager(position)
})

document.getElementById("decrement-btn")
.addEventListener("click", ()=>{
    position === 0? 
    position = 5:
    position--

    classManager(position)
})

const classManager = (pos)=>{
    let zIndex = 10
    ids.forEach((proj, index)=>{
        if(index === pos){
            proj.classList.remove("projects-tilt-right")
            proj.classList.remove("projects-tilt-left")
            proj.style.zIndex = 16
        }
        if(index > pos){
            proj.style.zIndex = zIndex--
            proj.classList.add("projects-tilt-left")
            proj.classList.remove("projects-tilt-right")
        } else if (index < pos){
            proj.style.zIndex = zIndex++
            proj.classList.add("projects-tilt-right")
            proj.classList.remove("projects-tilt-left")
        }
        localStorage.setItem("pos", JSON.stringify(pos))
        })
}

ids.forEach((proj, index)=>{
    if(index > position){
        proj.classList.add("projects-tilt-left")
    } else if (index < position){
        proj.classList.add("projects-tilt-right")
    }
    })

if(window.scrollY > 190){
    skillsSlide.style.left = 0;
}

  const menu = document.querySelector('.menu');

  menu.addEventListener('click', function() {
    menu.classList.toggle('menu-open');
  });

  window.addEventListener("scroll", (e) => {
    console.log(scrollY)
    if(window.scrollY > 190) skillsSlide.style.left = 0;
});


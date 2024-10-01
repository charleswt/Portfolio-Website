const skillsSlide = document.querySelector(".skills-slide");
const projects = Array.from(document.querySelectorAll(".projects-transition"));
const projectsUl = Array.from(document.querySelectorAll(".project-ul-position"));

let position = JSON.parse(localStorage.getItem("pos")) ?? 0;

if (window.scrollY > 190) skillsSlide.style.left = "0";

const incrementBtns = document.querySelectorAll(".increment-btn");
const decrementBtns = document.querySelectorAll(".decrement-btn");

incrementBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    position = (position + 1) % projects.length;
    imgPositionClassManager(position);
    detailsClassManager(position);
  });
});

decrementBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    position = (position - 1 + projects.length) % projects.length;
    imgPositionClassManager(position);
    detailsClassManager(position);
  });
});

function detailsClassManager (pos = position) {
    
  projects.forEach((proj, index) => {
    const detail = proj.querySelector(".project-details");
    const btn1 = proj.querySelector(".increment-btn");
    const btn2 = proj.querySelector(".decrement-btn");

    if (index === pos) {
      proj.classList.remove("projects-tilt-right", "projects-tilt-left");
      proj.style.zIndex = 12;
      proj.style.left = "none"
      proj.style.right = "none"
      if (detail) {
        detail.style.height = "75%";
        btn1.style.height = "75%";
        btn2.style.height = "75%";
        detail.classList.add("show");
        btn1.classList.add("show");
        btn2.classList.add("show");
      }
    } else {
      proj.style.zIndex = index > pos ? -index + 6 : index + 6;
      proj.classList.toggle("projects-tilt-left", index > pos);
      proj.classList.toggle("projects-tilt-right", index < pos);

      if (detail) {
        detail.style.height = 0;
        btn1.style.height = 0;
        btn2.style.height = 0;
        detail.classList.remove("show");
        btn1.classList.remove("show");
        btn2.classList.remove("show");
      }
    }
  });

  localStorage.setItem("pos", JSON.stringify(pos));
}

const imgPositionClassManager = (pos = position) => {
  projectsUl.forEach((proj, index) => {
    if (index === pos) {
      proj.classList.add("selected-project-position");
    } else {
      proj.classList.remove("selected-project-position");
    }
  });
};

detailsClassManager();
imgPositionClassManager()

window.addEventListener("scroll", () => {
  if (window.scrollY > 190) skillsSlide.style.left = "0";
});

const menu = document.querySelector(".menu");

menu.addEventListener("click", (event) => {
  event.stopPropagation();
  menu.classList.toggle("menu-open");
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target)) {
    menu.classList.remove("menu-open");
  }
});

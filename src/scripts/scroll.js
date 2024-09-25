const topButton = document.querySelector('.top');
const skillsSlide = document.querySelector('.skills-slide');


function checkPosition() {
    if (window.scrollY >=31 && topButton.style.display !== "block") {
        topButton.style.display = 'block';
    } else if (window.scrollY <= 30){
        topButton.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

topButton.addEventListener('click', scrollToTop);


  const menu = document.querySelector('.menu');

  menu.addEventListener('click', function() {
    menu.classList.toggle('menu-open');
  });

  window.addEventListener("scroll", (e) => {
    console.log(scrollY)
    if(window.scrollY > 190){
        skillsSlide.style.left = 0;
    }
});
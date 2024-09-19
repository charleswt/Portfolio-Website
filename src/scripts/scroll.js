const topButton = document.querySelector('.top');

function checkPosition() {
    let position = window.scrollY
    if (window.scrollY >=31 && topButton.style.display !== "block") {
        topButton.style.display = 'block';
        console.log('its working')
    } else if (window.scrollY <=30){
        topButton.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

topButton.addEventListener('click', scrollToTop);
document.addEventListener('scroll', checkPosition);
checkPosition();

  const menu = document.querySelector('.menu');

  menu.addEventListener('click', function() {
    menu.classList.toggle('menu-open');
  });
// Archivo javascript para la funcionalidad requerida

window.onscroll = function() {
  stickyNav();
}

const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;

function stickyNav() {
  window.scrollY > sticky ?
    navbar.classList.add('sticky-top','nav-sticky-focus') : navbar.classList.remove('sticky-top', 'nav-sticky-focus');
}
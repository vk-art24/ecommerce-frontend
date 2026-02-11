const samosa = document.querySelector('.samosa');
const navLinks = 
document.querySelector(".nav-links");

samosa.addEventListener('click', () => {
    navLinks.classList.toggle("show-menu");
});

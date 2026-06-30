document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const toggleIcon = menuToggle ? menuToggle.querySelector("i") : null;

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      
      if (toggleIcon) {
        if (navLinks.classList.contains("active")) {
          toggleIcon.className = "fa-solid fa-xmark";
        } else {
          toggleIcon.className = "fa-solid fa-bars";
        }
      }
    });

    // Close navigation menu if clicked outside of container
    document.addEventListener("click", function (event) {
      const isClickInside = menuToggle.contains(event.target) || navLinks.contains(event.target);

      if (!isClickInside && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (toggleIcon) {
          toggleIcon.className = "fa-solid fa-bars";
        }
      }
    });
  }
});
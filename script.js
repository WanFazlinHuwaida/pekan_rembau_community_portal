document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // 1. Set Menu Aktif Mengikut Muka Surat Semasa (Active Link)
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop().toLowerCase();
    const normalizedCurrent = currentPath || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.classList.remove("active");

      const href = (link.getAttribute("href") || "").split("?")[0].split("#")[0].toLowerCase();
      const linkPage = href.split("/").pop() || "index.html";
      const isCurrentPage = linkPage === normalizedCurrent ||
        (normalizedCurrent === "" || normalizedCurrent === "index.html") && linkPage === "index.html";

      if (isCurrentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  setActiveNavLink();

  // 2. Fungsi Buka/Tutup Menu Mudah Alih (Telah digabungkan untuk elak ralat bertindih)
  if (menuToggle && navLinks) {
    const toggleIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation(); // Menghentikan klik daripada terus dikesan oleh pelayar
      navLinks.classList.toggle("active");

      if (toggleIcon) {
        if (navLinks.classList.contains("active")) {
          toggleIcon.className = "fa-solid fa-xmark"; // Tukar kepada ikon pangkah (X)
        } else {
          toggleIcon.className = "fa-solid fa-bars"; // Tukar kepada ikon garis tiga
        }
      }
    });

    // Menutup menu secara automatik jika pengguna klik di mana-mana kawasan luar menu
    document.addEventListener("click", function (event) {
      if (navLinks.classList.contains("active")) {
        const isClickInside = menuToggle.contains(event.target) || navLinks.contains(event.target);

        if (!isClickInside) {
          navLinks.classList.remove("active");
          if (toggleIcon) {
            toggleIcon.className = "fa-solid fa-bars";
          }
        }
      }
    });
  }
});
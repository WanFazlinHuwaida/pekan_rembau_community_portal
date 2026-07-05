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

// 3. Fungsi Penapis Kategori Makanan (Food Filter Tabs)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const foodCards = document.querySelectorAll(".food-card");

  if (filterButtons.length > 0 && foodCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", function () {
        // Buang kelas aktif daripada butang lama, masukkan pada butang yang ditekan
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        foodCards.forEach(card => {
          const cardCategory = card.getAttribute("data-category");
          
          if (filterValue === "all" || cardCategory === filterValue) {
            card.style.display = "flex";
            // Animasi masuk lembut
            card.style.opacity = "0";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transition = "opacity 0.4s ease";
            }, 50);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
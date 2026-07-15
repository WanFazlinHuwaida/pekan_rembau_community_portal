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

  // 2. Fungsi Buka/Tutup Menu Mudah Alih
  if (menuToggle && navLinks) {
    const toggleIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation(); 
      navLinks.classList.toggle("active");

      if (toggleIcon) {
        if (navLinks.classList.contains("active")) {
          toggleIcon.className = "fa-solid fa-xmark"; 
        } else {
          toggleIcon.className = "fa-solid fa-bars"; 
        }
      }
    });

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

  // 3. Cipta elemen Modal secara automatik untuk Pop-up
  const modalHTML = `
  <div id="globalModal" class="modal-overlay">
    <div class="modal-content">
      <i class="fa-solid fa-xmark modal-close" onclick="closeModal()"></i>
      <h2 id="modalTitle" class="modal-title"></h2>
      <div id="modalBody" class="modal-body"></div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // 4. Fungsi Tutup Modal
  window.closeModal = function() {
    document.getElementById('globalModal').classList.remove('active');
    document.getElementById('modalBody').innerHTML = ''; 
  }

  document.getElementById('globalModal').addEventListener('click', function(e) {
    if(e.target === this) closeModal();
  });

  // 5. Modal Biodata (Untuk muka surat People)
  document.querySelectorAll('.clickable-card[data-bio]').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      const bio = card.getAttribute('data-bio');
      document.getElementById('modalTitle').innerText = name;
      document.getElementById('modalBody').innerHTML = `<p>${bio}</p>`;
      document.getElementById('globalModal').classList.add('active');
    });
  });

  // 6. Modal Peta (Dengan butang "Buka di Google Maps")
  document.querySelectorAll('.btn-view-details, .clickable-card[data-map]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if(btn.tagName === 'A') e.preventDefault(); 
      
      const place = btn.getAttribute('data-place');
      if(!place) return; 
      
      const phone = btn.getAttribute('data-phone');
      const mapUrl = btn.getAttribute('data-map');
      
      document.getElementById('modalTitle').innerText = place;
      
      let bodyHTML = '';
      if(phone) {
        bodyHTML += `<div class="modal-meta-item"><i class="fa-solid fa-phone"></i> <span>${phone}</span></div>`;
      }
      if(mapUrl) {
        // Jika link google maps jenis pendek (maps.app.goo.gl), letak butang URL
        if (mapUrl.includes("maps.app.goo.gl") || mapUrl.includes("goo.gl")) {
          bodyHTML += `
            <div style="margin-top: 20px; text-align: center;">
              <a href="${mapUrl}" target="_blank" class="btn-premium" style="display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%;">
                <i class="fa-solid fa-map-location-dot"></i> Buka di Google Maps
              </a>
            </div>`;
        } else {
          // Jika link jenis embed iframe panjang
          bodyHTML += `<div class="modal-map"><iframe src="${mapUrl}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
        }
      }
      
      document.getElementById('modalBody').innerHTML = bodyHTML;
      document.getElementById('globalModal').classList.add('active');
    });
  });
});
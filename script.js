// Initialize particles with responsive adjustments
function initParticles(count = 60) {
    if (typeof particlesJS !== "function") {
      console.warn("particlesJS not loaded");
      return;
    }
  
    particlesJS("particles-js", {
      particles: {
        number: { value: count, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.35 },
        size: { value: 2, random: true },
        move: { enable: true, speed: 0.8, direction: "none", out_mode: "out" },
        line_linked: { enable: false }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: false }
        },
        modes: {
          repulse: { distance: 100 }
        }
      },
      retina_detect: true
    });
  }
  
  // Choose fewer particles on small screens
  if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
    initParticles(20);
  } else {
    initParticles(60);
  }


  function activateCard(card) {
    const isActive = card.classList.contains("active");

    // Remove active from all cards
    document
      .querySelectorAll(".tech-card")
      .forEach((c) => c.classList.remove("active"));

    // Remove active from all buttons
    document
      .querySelectorAll(".tech-bottom-nav button")
      .forEach((btn) => btn.classList.remove("active"));

    // If it wasn't active before, activate it
    if (!isActive) {
      card.classList.add("active");

      const btnId = "btn-" + card.id;
      const activeBtn = document.getElementById(btnId);
      if (activeBtn) activeBtn.classList.add("active");
    }
  }

  function scrollToCard(id) {
    const card = document.getElementById(id);
    card.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    activateCard(card);
  }

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 60) {
        // 60 = nav height
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  const form = document.getElementById("suggestionForm");
  const submitBtn = document.getElementById("submitBtn");
  const url =
    "https://script.google.com/macros/s/AKfycby1NWJ2xfOrXF3umP5Gv-K8rlTAczL8RMautNyrLW-a_GYPmB5MZG8xm0YbgAvhogo/exec";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const data = {
      name: form.name.value,
      suggestion: form.suggestion.value,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await res.json();

      // Success message
      const status = document.getElementById("statusMessage");
      status.textContent = "Suggestion submitted! Thank you.";

      // Reset form
      form.reset();

      // Confetti 🎉
      const duration = 3 * 1000; // 3 seconds
      const animationEnd = Date.now() + duration;
      const colors = ["#00bfff", "#00ffbf", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          gravity: 0.5,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          gravity: 0.5,
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (err) {
      document.getElementById("statusMessage").textContent =
        "Error submitting suggestion.";
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });


  const modal = document.getElementById('badgeModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.badge-card').forEach(card => {
    card.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = card.dataset.img;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
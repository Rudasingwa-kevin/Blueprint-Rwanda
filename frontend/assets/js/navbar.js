(() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    const willOpen = !hamburger.classList.contains("active");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = willOpen ? "hidden" : "";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      closeMenu();
    }
  });
})();

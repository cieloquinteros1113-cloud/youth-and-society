
// ======================================
// YOUTH & SOCIETY — WEBSITE INTERACTIONS
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  // LANGUAGE SYSTEM
  const languageButtons = document.querySelectorAll(".language-switch button");
  const translatableElements = document.querySelectorAll("[data-en][data-es]");

  function setLanguage(language) {
    document.documentElement.lang = language;

    translatableElements.forEach((element) => {
      element.textContent = element.dataset[language];
    });

    languageButtons.forEach((button) => {
      const isActive = button.dataset.lang === language;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll("[data-placeholder-en][data-placeholder-es]")
      .forEach((element) => {
        element.placeholder =
          element.dataset[`placeholder${language.toUpperCase()}`];
      });

    try {
      localStorage.setItem("ys-language", language);
    } catch (error) {
      // The website still works if local storage is unavailable.
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.lang;
      if (language === "en" || language === "es") {
        setLanguage(language);
      }
    });
  });

  let savedLanguage = "en";

  try {
    savedLanguage = localStorage.getItem("ys-language") || "en";
  } catch (error) {
    savedLanguage = "en";
  }

  setLanguage(savedLanguage);

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  // ARTICLE FILTERS
  const filterButtons = document.querySelectorAll(".filter");
  const articleCards = document.querySelectorAll(".article-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      articleCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        card.hidden = !shouldShow;
      });
    });
  });

  // CURRENT YEAR
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // SMOOTH SCROLL FOR INTERNAL LINKS
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

/* =========================================
   MSAFIRI PROJECT PORTFOLIO v1.0
   JavaScript
========================================= */

// Replace with your WhatsApp number.
// Tanzania example format: 255679481907
// Do not include +, spaces, or the leading 0.

const WHATSAPP_NUMBER = "255679481907";


// =========================================
// 1. MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );
  });

  // Close the mobile menu after a navigation link is selected.
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );
    });
  });

  // Close the menu when the user switches back to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      mainNav.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );
    }
  });
}


// =========================================
// 2. AUTOMATIC COPYRIGHT YEAR
// =========================================

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================================
// 3. DARK / LIGHT THEME
// =========================================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");

    if (themeIcon) {
      themeIcon.textContent = isLightMode ? "☾" : "☀";
    }

    themeToggle.setAttribute(
      "aria-label",
      isLightMode
        ? "Switch to dark theme"
        : "Switch to light theme"
    );

    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        isLightMode ? "#f5f7fc" : "#0b1020"
      );
    }
  });
}


// =========================================
// 4. PROJECT FILTERS
// =========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Update the selected filter button.
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;

      filterButton.classList.toggle(
        "is-active",
        isSelected
      );

      filterButton.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

    // Show only projects matching the chosen category.
    projectCards.forEach((card) => {
      const category = card.dataset.category;

      const shouldShow =
        selectedFilter === "all" ||
        selectedFilter === category;

      card.hidden = !shouldShow;
    });
  });
});


// =========================================
// 5. WHATSAPP CONTACT LINKS
// =========================================

const isConfiguredWhatsAppNumber =
  /^\d{10,15}$/.test(WHATSAPP_NUMBER) &&
  !WHATSAPP_NUMBER.startsWith("0");

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message =
    link.dataset.message ||
    "Hello Msafiri. I visited your portfolio and would like to discuss a project.";

  if (!isConfiguredWhatsAppNumber) {
    link.href = "#contact";

    link.addEventListener("click", (event) => {
      event.preventDefault();

      alert(
        "WhatsApp contact has not been configured yet.\n\n" +
        "Open script.js and replace 255XXXXXXXXX with your " +
        "WhatsApp number in international format, without +, " +
        "spaces, or the leading 0."
      );
    });

    return;
  }

  link.href =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  link.target = "_blank";
  link.rel = "noopener noreferrer";
});


// =========================================
// 6. PORTFOLIO INITIALIZATION
// =========================================

console.log(
  "Msafiri Project Portfolio v1.0 initialized successfully."
);
/* ==============================================
   MSAFIRI GROUP OF COMPANIES — SPLASH CONTROLLER
================================================ */

(() => {
  "use strict";

  function initializeMsafiriSplash() {
    const splash = document.getElementById("brand-splash");
    const skipButton = document.getElementById("splash-skip");

    // Continue normally if the splash HTML is missing.
    if (!splash) return;

    const STORAGE_KEY = "msafiriGroupSplashV3";
    const forceIntro =
      new URLSearchParams(window.location.search).get("intro") === "1";

    let alreadySeen = false;
    let finished = false;
    let hideTimer = null;

    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) === "yes";
    } catch (error) {
      // Storage may be unavailable; the website must still work.
    }

    // Show the intro once per tab session.
    if (alreadySeen && !forceIntro) {
      splash.classList.add("is-hidden");
      return;
    }

    splash.classList.remove("is-hidden");
    splash.classList.remove("is-leaving");

    function finishIntro() {
      if (finished) return;
      finished = true;

      if (hideTimer !== null) {
        window.clearTimeout(hideTimer);
      }

      splash.classList.add("is-leaving");

      try {
        sessionStorage.setItem(STORAGE_KEY, "yes");
      } catch (error) {
        // Intro can finish even without browser storage.
      }

      window.setTimeout(() => {
        splash.classList.add("is-hidden");
      }, 700);
    }

    if (skipButton) {
      skipButton.addEventListener("click", finishIntro);
    }

    // Allow the user to skip using the Escape key.
    document.addEventListener("keydown", function handleEscape(event) {
      if (event.key === "Escape" && !finished) {
        finishIntro();
      }
    });

    // Automatically close the splash after about 4.3 seconds.
    hideTimer = window.setTimeout(finishIntro, 4300);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeMsafiriSplash,
      { once: true }
    );
  } else {
    initializeMsafiriSplash();
  }
})();

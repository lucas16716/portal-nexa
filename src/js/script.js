/* ==========================================================================
   script.js - Portal de Vagas Nexa
   --------------------------------------------------------------------------
   - Código encapsulado em uma IIFE para evitar poluição do escopo global.
   - Interações separadas em módulos (Accordion, ThemeToggle).
   - Seguro: manipulação do DOM sem innerHTML para prevenir XSS.
   - Performático: cache de seletores do DOM.
   ========================================================================== */

(() => {
  "use strict";

  // Armazena referências aos elementos do DOM para evitar buscas repetidas.
  const dom = {
    themeToggleButton: document.getElementById("theme-toggle"),
    accordionButtons: document.querySelectorAll(".accordion"),
    body: document.body,
  };

  /**
   * Módulo para gerenciar a funcionalidade de Accordion.
   */
  const Accordion = (() => {
    function togglePanel(button) {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !isExpanded);

      const panel = document.getElementById(
        button.getAttribute("aria-controls")
      );
      if (panel) {
        panel.hidden = isExpanded;
      }
    }

    function init() {
      if (dom.accordionButtons.length === 0) return;

      dom.accordionButtons.forEach((button) => {
        button.addEventListener("click", () => togglePanel(button));
      });
    }

    return { init };
  })();

  /**
   * Módulo para gerenciar a troca de tema (Dark/Light Mode).
   */
  const ThemeToggle = (() => {
    const THEME_STORAGE_KEY = "theme";
    const icons = {
      moon: document.querySelector(".theme-toggle__icon--moon"),
      sun: document.querySelector(".theme-toggle__icon--sun"),
    };

    function applyTheme(isDark) {
      dom.body.classList.toggle("dark-mode", isDark);
      dom.themeToggleButton.setAttribute("aria-pressed", String(isDark));
      dom.themeToggleButton.setAttribute(
        "aria-label",
        isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
      );

      if (icons.moon && icons.sun) {
        icons.moon.hidden = isDark;
        icons.sun.hidden = !isDark;
      }
    }

    function toggleTheme() {
      const isCurrentlyDark = dom.body.classList.contains("dark-mode");
      const newThemeIsDark = !isCurrentlyDark;

      applyTheme(newThemeIsDark);
      localStorage.setItem(
        THEME_STORAGE_KEY,
        newThemeIsDark ? "dark" : "light"
      );
    }

    function init() {
      if (!dom.themeToggleButton) return;

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

      // A preferência salva tem prioridade sobre a do sistema.
      const initialThemeIsDark =
        savedTheme !== null ? savedTheme === "dark" : prefersDark;

      applyTheme(initialThemeIsDark);

      dom.themeToggleButton.addEventListener("click", toggleTheme);
    }

    return { init };
  })();

  /**
   * Função principal que inicializa todos os módulos da aplicação.
   */
  function initialize() {
    Accordion.init();
    ThemeToggle.init();
  }

  // Garante que o script só execute após o DOM estar completamente carregado.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();

// Accordion
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((button) => {
  button.addEventListener("click", function () {
    const expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !expanded);

    const panel = document.getElementById(this.getAttribute("aria-controls"));
    panel.hidden = expanded;
  });
});

// Toggle Tema
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.innerHTML = '<i class="fi fi-sc-sun"></i>';
  toggleBtn.setAttribute("aria-pressed", "true");
}

toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  toggleBtn.innerHTML = isDark
    ? '<i class="fi fi-sc-sun"></i>'
    : '<i class="fi fi-sc-moon"></i>';
  toggleBtn.setAttribute("aria-pressed", isDark.toString());
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

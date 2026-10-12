
const themeButton = document.createElement("button");

themeButton.textContent = "🌙 Dark Mode";
themeButton.id = "theme-toggle";

themeButton.style.padding = "10px 16px";
themeButton.style.border = "none";
themeButton.style.borderRadius = "20px";
themeButton.style.background = "#8655c7";
themeButton.style.color = "#ffffff";
themeButton.style.cursor = "pointer";

document.querySelector("header").appendChild(themeButton);

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  themeButton.textContent = isDark
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

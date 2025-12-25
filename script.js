/* === THEME SWITCHER === */
const themes = ["christmas-red", "snow-white", "emerald-green", "midnight-blue"];
let currentThemeIndex = 0;

const themeBtn = document.getElementById("theme-switcher");
const savedTheme = localStorage.getItem("theme");
if(savedTheme){
  document.body.setAttribute("data-theme", savedTheme);
  currentThemeIndex = themes.indexOf(savedTheme);
} else {
  document.body.setAttribute("data-theme", themes[0]);
}

themeBtn.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const theme = themes[currentThemeIndex];
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

/* === SMOOTH SCROLL TO FORM === */
const scrollBtn = document.getElementById("scrollToForm");
const formSection = document.getElementById("message-form");
scrollBtn.addEventListener("click", () => {
  formSection.scrollIntoView({ behavior: "smooth" });
});

/* === COUNTDOWN TIMER === */
const countdown = () => {
  const targetDate = new Date("Jan 1, 2026 00:00:00").getTime();
  const now = new Date().getTime();
  const diff = targetDate - now;

  if(diff <= 0){
    document.getElementById("newYearMsg").textContent = "Happy New Year 2026 🎆";
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
};

const countdownInterval = setInterval(countdown, 1000);

/* === SANTA MESSAGE FORM & MODAL === */
const santaForm = document.getElementById("santaForm");
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-msg");
const closeModalBtn = document.getElementById("closeModal");

santaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  modalMsg.textContent = `Ho ho ho! 🎄 I’ve received your message, ${name}!`;
  modal.style.display = "flex";
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 400);
  document.body.style.overflow = "auto";
});

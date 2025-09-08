// ==================== NAVBAR SCROLL ====================
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// ==================== WORKOUT DATA ====================
const workouts = [
  { title: "PUSH / CORE", day: 5, time: "06:00", message: "YOU GOT THIS!" },
  { title: "GRIP AND RIP (ERGS)", day: 5, time: "06:00", message: "TOO EASY BABY!" },
  { title: "HYROX SATURDAY", day: 6, time: "07:30", message: "IT'S EASY!" },
  // add more workouts here
];

// ==================== WEEKLY PLANNER / CALENDAR ====================
(function () {
  const grid = document.getElementById("weekGrid");
  const label = document.getElementById("weekLabel");
  const prev = document.getElementById("prevWeek");
  const next = document.getElementById("nextWeek");
  if (!grid || !label || !prev || !next) return;

  const MS_DAY = 86400000;
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let anchor = new Date();

  function startOfWeek(d) {
    const date = new Date(d);
    const diff = date.getDate() - date.getDay(); // Sunday
    return new Date(date.setDate(diff));
  }

  function formatShort(date) {
    return `${weekdays[date.getDay()]} ${date.getDate()}`;
  }

  function render() {
    const start = startOfWeek(anchor);
    const end = new Date(start.getTime() + MS_DAY * 6);
    label.textContent = `${start.toLocaleDateString("en-GB")} - ${end.toLocaleDateString("en-GB")}`;
    grid.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const day = new Date(start.getTime() + MS_DAY * i);
      const dayEl = document.createElement("div");
      dayEl.className = "day-card";

      const header = document.createElement("div");
      header.className = "day-header";
      header.innerHTML = `<span>${formatShort(day)}</span>`;

      const sessions = document.createElement("div");
      sessions.className = "day-sessions";

      workouts.forEach((w) => {
        if (day.getDay() === w.day) {
          addSession(sessions, w.title, w.time, day);
        }
      });

      dayEl.appendChild(header);
      dayEl.appendChild(sessions);
      grid.appendChild(dayEl);
    }
  }

  function addSession(container, name, time, dayDate) {
    const pill = document.createElement("div");
    pill.className = "session-pill";
    pill.innerHTML = `<span>${time} • ${name}</span>`;
    container.appendChild(pill);
  }

  prev.addEventListener("click", () => {
    anchor = new Date(anchor.getTime() - MS_DAY * 7);
    render();
  });
  next.addEventListener("click", () => {
    anchor = new Date(anchor.getTime() + MS_DAY * 7);
    render();
  });

  render();
})();

// ==================== AUTO DATES ABOVE WORKOUTS ====================
function getWeekdayDate(targetDay) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday start of week
  const targetDate = new Date(start);
  targetDate.setDate(start.getDate() + targetDay);

  const options = { weekday: "short", day: "numeric", month: "short" };
  return targetDate.toLocaleDateString("en-GB", options);
}

document.querySelectorAll("[id$='-date']").forEach((el) => {
  const id = el.id;
  const dayNum = id.startsWith("friday") ? 5 : id.startsWith("saturday") ? 6 : null;
  if (dayNum !== null) {
    el.textContent = getWeekdayDate(dayNum);
  }
});

// ==================== MAKE WORKOUT PAGE BIGGER ====================
const mainContent = document.querySelector(".main-content");
if (mainContent) {
  mainContent.style.maxWidth = "1200px";
  mainContent.style.margin = "0 auto";
}



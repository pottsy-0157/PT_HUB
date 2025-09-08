// ==================== NAVBAR SCROLL ====================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ==================== WORKOUT DATA ====================
const workouts = [
  {
    title: "PUSH / CORE",
    day: 5, // Friday
    time: "06:00 am – 07:00 am",
    message: "YOU GOT THIS!",
    link: "PUSH-CORE.html?name=PUSH-CORE",
  },
  {
    title: "GRIP AND RIP (ERGS)",
    day: 5,
    time: "06:00 am – 07:00 am",
    message: "TOO EASY BABY!",
    link: "GRIP-RIP.html?name=GRIP AND RIP (ERGS)",
  },
  {
    title: "HYROX SATURDAY",
    day: 6, // Saturday
    time: "07:30 am – 08:30 am",
    message: "IT'S EASY!",
    link: "SATURDAY-HYROX.html?name=HYROX SATURDAY",
  },
  // add more here
];

// ==================== AUTO DATES ABOVE WORKOUTS ====================
function getWeekdayDate(targetDay) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday start
  const targetDate = new Date(start);
  targetDate.setDate(start.getDate() + targetDay);

  return targetDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

document.getElementById("friday-date").textContent = getWeekdayDate(5);
document.getElementById("saturday-date").textContent = getWeekdayDate(6);

// ==================== WEEKLY PLANNER / CALENDAR ====================
(function () {
  const grid = document.getElementById("weekGrid");
  const label = document.getElementById("weekLabel");
  const prev = document.getElementById("prevWeek");
  const next = document.getElementById("nextWeek");
  if (!grid || !label) return;

  const MS_DAY = 86400000;
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let anchor = new Date();

  function startOfWeek(d) {
    const date = new Date(d);
    date.setDate(date.getDate() - date.getDay());
    return date;
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
      header.innerHTML = `<span>${weekdays[day.getDay()]} ${day.getDate()}</span>`;

      const sessions = document.createElement("div");
      sessions.className = "day-sessions";

      workouts.forEach((w) => {
        if (day.getDay() === w.day) {
          const pill = document.createElement("div");
          pill.className = "session-pill";
          pill.innerHTML = `<span>${w.time} • ${w.title}</span>`;
          pill.addEventListener("click", () => {
            window.location.href = w.link;
          });
          sessions.appendChild(pill);
        }
      });

      dayEl.appendChild(header);
      dayEl.appendChild(sessions);
      grid.appendChild(dayEl);
    }
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

// ==================== MAKE WORKOUT PAGE BIGGER ====================
const mainContent = document.querySelector(".main-content");
if (mainContent) {
  mainContent.style.maxWidth = "1200px";
  mainContent.style.margin = "0 auto";
}

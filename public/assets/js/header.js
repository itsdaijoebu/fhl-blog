const recentsList = document.getElementById("recent-posts-list");

getRecents();
calendar();

async function getRecents() {
  const res = await fetch("/api/getRecents");
  const recents = await res.json();
  for (let post of recents) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/post/${post.titleUrl}`;
    link.innerText = post.title;
    li.appendChild(link);
    recentsList.appendChild(li);
  }
}

async function calendar() {
  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let firstDayOfMonth = new Date(year, month, 1).getDay();
  let numDays = new Date(year, month + 1, 0).getDate();
  let dayOffset = 7 - firstDayOfMonth;

  createCalendar();

  async function createCalendar() {
    const calendarTitle = document.getElementById("calendar-title");
    calendarTitle.innerText = `${months[month]} ${year}`;

    const calendarPrevious = document.getElementById("calendar-previous");
    const calendarNext = document.getElementById("calendar-next");
    calendarPrevious.addEventListener("click", calendarMonthChange);
    calendarNext.addEventListener("click", calendarMonthChange);

    if (today.getMonth() === month && today.getFullYear() === year) {
      calendarNext.classList.remove("active");
    } else {
      calendarNext.classList.add("active");
    }

    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";
    let firstWeek = calendarBody.insertRow();
    let firstCell = firstWeek.insertCell();
    firstCell.colSpan = firstDayOfMonth;
    let firstCellPadding = document.createTextNode("");
    firstCell.appendChild(firstCellPadding);

    for (let i = 1; i <= dayOffset; i++) {
      let cell = firstWeek.insertCell();
      cell.id = `day-${i}`;
      let day = document.createTextNode(i);
      cell.appendChild(day);
    }

    for (let i = dayOffset + 1; i <= numDays; i += 7) {
      let startOfWeek = i;
      let week = calendarBody.insertRow();
      let endOfWeek = startOfWeek + 7 > numDays ? numDays : startOfWeek + 6;
      for (let j = i; j <= endOfWeek; j++) {
        let cell = week.insertCell();
        cell.id = `day-${j}`;
        let day = document.createTextNode(j);
        cell.appendChild(day);
      }
      if (endOfWeek === numDays) {
        let cell = week.insertCell();
        cell.colSpan = dayOffset - (numDays % 7);
        let padding = document.createTextNode("");
        cell.appendChild(padding);
      }
    }

    if (month === today.getMonth() && year === today.getFullYear()) {
      document.getElementById(`day-${today.getDate()}`).classList.add("today");
    }

    const res = await fetch(`/api/getFromMonth?month=${month}&year=${year}`);
    const currMonthPosts = await res.json();
    console.log("currmonthposts", month, year, currMonthPosts);
    for (let post of currMonthPosts) {
      const date = new Date(post.date).getDate();
      const calendarDay = document.getElementById(`day-${date}`);
      const textNode = calendarDay.childNodes[0];
      const link = document.createElement("a");
      link.href = `/post/${post.titleUrl}`;
      calendarDay.replaceChild(link, textNode);
      link.appendChild(textNode);
    }
  }

  function calendarMonthChange(e) {
    const target = e.target;
    if (!target.classList.contains("active")) return;
    let targetYear = year;
    let targetMonth = target.classList.contains("calendar-previous")
      ? month - 1
      : month + 1;
    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear--;
    }
    if (targetMonth > 11) {
      targetMonth = 0;
      targetYear++;
    }

    updateFirstLastDays(targetYear, targetMonth);
    createCalendar();
    console.log("change month", month, year);
  }

  function updateFirstLastDays(targetYear, targetMonth) {
    year = targetYear;
    month = targetMonth;
    firstDayOfMonth = new Date(year, month, 1).getDay();
    numDays = new Date(year, month + 1, 0).getDate();
    dayOffset = 7 - firstDayOfMonth;
  }
}

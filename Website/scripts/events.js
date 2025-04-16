async function fetchEventsData() {
  const response = await fetch('/data/events.json');
  const data = await response.json();
  return data;
}

async function renderCalendar(year = 2025) {
  const events = await fetchEventsData();
  const calendarContent = document.getElementById("calendarContent");

  calendarContent.innerHTML = "";

  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const monthBlock = document.createElement("div");
    monthBlock.className = "month";

    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthEvents = Object.keys(events).filter(date => date.startsWith(monthKey));

    if (monthEvents.length === 0) {
      monthBlock.classList.add("empty");
    }

    monthBlock.innerHTML = `<h3>${monthName} ${year}</h3><div class="days"></div>`;

    const daysEl = monthBlock.querySelector(".days");
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      daysEl.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= numDays; day++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      dayDiv.textContent = day;

      if (events[fullDate]) {
        dayDiv.classList.add("event-day");
        dayDiv.onclick = () => showEventsForDate(fullDate, events[fullDate]);
      }

      daysEl.appendChild(dayDiv);
    }

    calendarContent.appendChild(monthBlock);
  }
}

function showEventsForDate(date, dayEvents) {
  const eventCardsEl = document.getElementById("calendarContent");
  eventCardsEl.innerHTML = "";

  if (dayEvents.length === 0) {
    eventCardsEl.innerHTML = `<p>No events for ${date}</p>`;
  } else {
    for (const event of dayEvents) {
      const card = document.createElement("div");
      card.className = "event-item";
      card.innerHTML = `
        <div class="event-layout">
          <div class="event-left">${event.time}</div>
          <div class="event-middle">${event.title}</div>
          <div class="event-right"></div>
        </div>
        <div class="event-flyer">
          <p>${event.description}</p>
        </div>
      `;
      eventCardsEl.appendChild(card);
    }
  }
}

window.onload = () => renderCalendar();

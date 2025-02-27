document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const eventDateInput = document.getElementById("event-date");
    const eventTimeInput = document.getElementById("event-time");
    const eventLocationInput = document.getElementById("event-location");
    const saveEventBtn = document.getElementById("save-event");
    const eventDateTimeDisplay = document.getElementById("event-datetime");
    const countdownDisplay = document.getElementById("countdown");
    const eventLocationDisplay = document.getElementById("event-location-display");
    const navigateGoogleBtn = document.getElementById("navigate-google");
    const navigateWazeBtn = document.getElementById("navigate-waze");
    const mapFrame = document.getElementById("map-frame");

    let eventDateTime = null;
    let eventLocation = "";

    // שינוי מצב כהה/בהיר
    themeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ מצב בהיר" : "🌙 מצב כהה";
    });

    // שמירת תאריך, שעה ומיקום האירוע
    saveEventBtn.addEventListener("click", function() {
        if (eventDateInput.value && eventTimeInput.value && eventLocationInput.value) {
            eventDateTime = new Date(eventDateInput.value + "T" + eventTimeInput.value);
            eventLocation = eventLocationInput.value;
            
            eventDateTimeDisplay.textContent = `📅 תאריך: ${eventDateTime.toLocaleString('he-IL')}`;
            eventLocationDisplay.textContent = `📍 מיקום: ${eventLocation}`;
            updateMap(eventLocation);
            startCountdown();
        } else {
            alert("❗ יש למלא את כל הפרטים (תאריך, שעה ומיקום)");
        }
    });

    // עדכון המפה
    function updateMap(location) {
        const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        mapFrame.src = mapUrl;
        mapFrame.style.display = "block";
    }

    // ספירה לאחור
    function startCountdown() {
        if (!eventDateTime) return;

        setInterval(() => {
            const now = new Date();
            const diff = eventDateTime - now;
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                countdownDisplay.textContent = `⏳ נותרו ${days} ימים, ${hours} שעות, ${minutes} דקות`;
            } else {
                countdownDisplay.textContent = "🎉 האירוע התחיל!";
            }
        }, 1000);
    }

    // כפתורי ניווט
    navigateGoogleBtn.addEventListener("click", function() {
        if (eventLocation) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventLocation)}`, "_blank");
        } else {
            alert("❗ אנא הזן מיקום תחילה");
        }
    });

    navigateWazeBtn.addEventListener("click", function() {
        if (eventLocation) {
            window.open(`https://waze.com/ul?q=${encodeURIComponent(eventLocation)}`, "_blank");
        } else {
            alert("❗ אנא הזן מיקום תחילה");
        }
    });
});

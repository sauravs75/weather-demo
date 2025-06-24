const API_KEY = "a01c94fda6022a9c127b73d95fc4cb87";

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Weather API response:', data); // Debug log
    if (!(data.cod === 200 || data.cod === "200")) {
      alert("Could not fetch weather data. Please try again.");
      return;
    }
    // Update UI
    document.querySelector('.place').textContent = data.name.toUpperCase();
    const now = new Date();
    const options = { day: 'numeric', month: 'short', weekday: 'long' };
    document.querySelector('.day').textContent = now.toLocaleDateString('en-US', options);
    document.querySelector('.temp div').textContent = Math.round(data.main.temp);
    // Add dynamic weather logo based on actual weather condition
    const logoDiv = document.querySelector('.weather-logo');
    const condition = data.weather[0].main.toLowerCase();
    let logoSVG = '';
    if (condition.includes('cloud')) {
      // Cloudy
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#90caf9"/><ellipse cx="32" cy="28" rx="8" ry="6" fill="#b3e5fc"/></svg>`;
    } else if (condition.includes('rain')) {
      // Rainy
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="30" rx="14" ry="8" fill="#90caf9"/><ellipse cx="32" cy="26" rx="8" ry="6" fill="#b3e5fc"/><line x1="18" y1="38" x2="18" y2="44" stroke="#2196f3" stroke-width="3"/><line x1="24" y1="38" x2="24" y2="44" stroke="#2196f3" stroke-width="3"/><line x1="30" y1="38" x2="30" y2="44" stroke="#2196f3" stroke-width="3"/></svg>`;
    } else if (condition.includes('drizzle')) {
      // Drizzle
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#b3e5fc"/><ellipse cx="32" cy="28" rx="8" ry="6" fill="#e1f5fe"/><line x1="20" y1="38" x2="20" y2="42" stroke="#2196f3" stroke-width="2"/><line x1="28" y1="38" x2="28" y2="42" stroke="#2196f3" stroke-width="2"/></svg>`;
    } else if (condition.includes('clear')) {
      // Clear/Sunny
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" fill="#ffeb3b" stroke="#ff9800" stroke-width="2"/><g stroke="#ff9800" stroke-width="2"><line x1="24" y1="4" x2="24" y2="12"/><line x1="24" y1="36" x2="24" y2="44"/><line x1="4" y1="24" x2="12" y2="24"/><line x1="36" y1="24" x2="44" y2="24"/><line x1="9.17" y1="9.17" x2="15.09" y2="15.09"/><line x1="32.91" y1="32.91" x2="38.83" y2="38.83"/><line x1="9.17" y1="38.83" x2="15.09" y2="32.91"/><line x1="32.91" y1="15.09" x2="38.83" y2="9.17"/></g></svg>`;
    } else if (condition.includes('snow')) {
      // Snow
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4v40M24 24l-14-8M24 24l14-8M24 24l-14 8M24 24l14 8M24 4l-4 8M24 4l4 8M24 44l-4-8M24 44l4-8M10 16l4 8M38 16l-4 8M10 32l4-8M38 32l-4-8" stroke="#2196f3" stroke-width="2" stroke-linecap="round"/></svg>`;
    } else if (condition.includes('storm') || condition.includes('thunder')) {
      // Thunderstorm
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#90caf9"/><polygon points="22,36 26,36 24,44" fill="#ff9800"/><polyline points="24,36 24,40 26,40" stroke="#ff9800" stroke-width="2"/></svg>`;
    } else if (condition.includes('mist')) {
      // Mist
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#bdbdbd"/><rect x="10" y="38" width="28" height="4" rx="2" fill="#bdbdbd"/></svg>`;
    } else if (condition.includes('fog')) {
      // Fog
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#bdbdbd"/><rect x="8" y="38" width="32" height="4" rx="2" fill="#bdbdbd"/></svg>`;
    } else if (condition.includes('haze')) {
      // Haze
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#e0e0e0"/><rect x="12" y="38" width="24" height="4" rx="2" fill="#e0e0e0"/></svg>`;
    } else if (condition.includes('smoke')) {
      // Smoke
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#b0bec5"/><rect x="14" y="38" width="20" height="4" rx="2" fill="#b0bec5"/></svg>`;
    } else if (condition.includes('dust')) {
      // Dust
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#ffe082"/><rect x="16" y="38" width="16" height="4" rx="2" fill="#ffe082"/></svg>`;
    } else if (condition.includes('sand')) {
      // Sand
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#ffd54f"/><rect x="18" y="38" width="12" height="4" rx="2" fill="#ffd54f"/></svg>`;
    } else if (condition.includes('ash')) {
      // Ash
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#bdbdbd"/><rect x="20" y="38" width="8" height="4" rx="2" fill="#bdbdbd"/></svg>`;
    } else if (condition.includes('squall')) {
      // Squall
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#90caf9"/><line x1="12" y1="40" x2="36" y2="40" stroke="#2196f3" stroke-width="3"/></svg>`;
    } else if (condition.includes('tornado')) {
      // Tornado
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#bdbdbd"/><rect x="22" y="38" width="4" height="4" rx="2" fill="#bdbdbd"/></svg>`;
    } else {
      // Default (partly cloudy)
      logoSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="14" ry="8" fill="#90caf9"/><circle cx="32" cy="24" r="6" fill="#ffeb3b" stroke="#ff9800" stroke-width="2"/></svg>`;
    }
    logoDiv.innerHTML = logoSVG;
    // Set weather type text below the logo
    const weatherTypeDiv = document.querySelector('.weather-type');
    weatherTypeDiv.textContent = data.weather[0].main;
    document.querySelector('.h').textContent = data.main.humidity + "%";
    document.querySelector('.con').textContent = data.weather[0].main;
    document.querySelector('.t').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    alert("Could not fetch weather data. Please try again.");
    console.error(error);
  }
}

async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Group by day
    const days = {};
    data.list.forEach(item => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      if (!days[day]) days[day] = [];
      days[day].push(item);
    });
    // Store for tab switching
    window.lastForecastDays = days;
    renderForecastCards(days, 'temp');
  } catch (error) {
    console.error(error);
  }
}

// Tab switching
const tabs = document.querySelectorAll('.forecast-tabs button');
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const type = this.textContent.trim().toLowerCase();
    if (window.lastForecastDays) {
      if (type === 'temperature') renderForecastCards(window.lastForecastDays, 'temp');
      else if (type === 'precipitation') renderForecastCards(window.lastForecastDays, 'precip');
      else if (type === 'wind') renderForecastCards(window.lastForecastDays, 'wind');
    }
  });
});

// Initial load
fetchWeather("Greater Noida");
fetchForecast("Greater Noida");

// Search form functionality
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("text").value.trim();
  if (input) {
    fetchWeather(input);
    fetchForecast(input);
  }
});

function renderForecastCards(days, type = 'temp') {
  const forecastCards = document.querySelector('.forecast-cards');
  forecastCards.innerHTML = '';
  Object.keys(days).slice(0, 7).forEach(day => {
    const items = days[day];
    let minTemp = Infinity, maxTemp = -Infinity, windSum = 0, windCount = 0, precipSum = 0;
    const conditionCount = {};
    let icon = '';
    items.forEach(item => {
      minTemp = Math.min(minTemp, item.main.temp_min);
      maxTemp = Math.max(maxTemp, item.main.temp_max);
      windSum += item.wind.speed;
      windCount++;
      if (item.rain && item.rain['3h']) precipSum += item.rain['3h'];
      if (item.snow && item.snow['3h']) precipSum += item.snow['3h'];
      const cond = item.weather[0].main;
      conditionCount[cond] = (conditionCount[cond] || 0) + 1;
      if (!icon) icon = item.weather[0].icon;
    });
    const condition = Object.keys(conditionCount).reduce((a, b) => conditionCount[a] > conditionCount[b] ? a : b);
    // const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const wind = (windSum / windCount).toFixed(1);
    const precip = precipSum.toFixed(1);
    let mainValue = '';
    if (type === 'temp') {
      mainValue = `<div class='main-forecast-value'>${Math.round(maxTemp)}° ${Math.round(minTemp)}°</div>`;
    } else if (type === 'precip') {
      mainValue = `<div class='main-forecast-value'>${precip} mm</div>`;
    } else if (type === 'wind') {
      mainValue = `<div class='main-forecast-value'>${wind} km/h</div>`;
    }
    forecastCards.innerHTML += `
      <div class="forecast-card">
        <div class="day">${day}</div>
        ${mainValue}
      </div>
    `;
  });
}



  const API_KEY = "a01c94fda6022a9c127b73d95fc4cb87";

  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Update UI
      document.querySelector('.place').textContent = data.name.toUpperCase();
      const now = new Date();
      const options = { day: 'numeric', month: 'short', weekday: 'long' };
      document.querySelector('.day').textContent = now.toLocaleDateString('en-US', options);
      document.querySelector('.temp div').textContent = Math.round(data.main.temp);
      document.querySelector('.h').textContent = data.main.humidity + "%";
      document.querySelector('.W').textContent = data.wind.speed + " km/h";
      document.querySelector('.con').textContent = data.weather[0].main;
      document.querySelector('.t').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      alert("Could not fetch weather data. Please try again.");
      console.error(error);
    }
  }

  // Initial load
  fetchWeather("Greater Noida");

  // Search form functionality
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("text").value.trim();
    if (input) {
      fetchWeather(input);
    }
  });


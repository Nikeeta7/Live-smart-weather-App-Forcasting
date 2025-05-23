const apiKey = "168923bf9ec4fe21f5f25d15686e4d28";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const geoBtn = document.getElementById("geo-btn");
const cityNameElem = document.getElementById("city-name");
const tempElem = document.getElementById("temp");
const windElem = document.getElementById("wind");
const windDirectionElem = document.getElementById("wind-direction");
const humidityElem = document.getElementById("humidity");
const conditionElem = document.getElementById("condition");
const weatherIconImg = document.getElementById("weather-icon-img");
const weatherSection = document.querySelector(".weather");
const forecastContainer = document.getElementById("forecast-container");
const errorMessage = document.getElementById("error-message");
const unitToggle = document.getElementById("unit-toggle");
const themeToggle = document.getElementById("theme-toggle");
const loadingSpinner = document.getElementById("loading-spinner");
const lastUpdatedElem = document.getElementById("last-updated");

let currentUnit = "metric"; // metric = Celsius, imperial = Fahrenheit
let forecastChart;

const weatherIconAltMap = {
  "01d": "Clear sky day",
  "01n": "Clear sky night",
  "02d": "Few clouds day",
  "02n": "Few clouds night",
  "03d": "Scattered clouds",
  "03n": "Scattered clouds",
  "04d": "Broken clouds",
  "04n": "Broken clouds",
  "09d": "Shower rain",
  "09n": "Shower rain",
  "10d": "Rain day",
  "10n": "Rain night",
  "11d": "Thunderstorm",
  "11n": "Thunderstorm",
  "13d": "Snow",
  "13n": "Snow",
  "50d": "Mist",
  "50n": "Mist"
};

// Converts degrees to compass direction (e.g., N, NE, E, etc.)
function degToCompass(num) {
  const val = Math.floor((num / 22.5) + 0.5);
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[(val % 16)];
}

function formatTemp(value) {
  return Math.round(value) + (currentUnit === "metric" ? "°C" : "°F");
}

function showLoading(show) {
  loadingSpinner.style.display = show ? "block" : "none";
}

function updateWeatherUI(data) {
  errorMessage.style.display = "none";

  cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
  tempElem.textContent = formatTemp(data.main.temp);

  const windSpeed = Math.round(data.wind.speed);
  windElem.textContent = `${windSpeed} ${currentUnit === "metric" ? "m/s" : "mph"}`;

  const windDeg = data.wind.deg;
  windDirectionElem.textContent = `(${windDeg}°, ${degToCompass(windDeg)})`;
  windDirectionElem.setAttribute("aria-label", `Wind direction ${degToCompass(windDeg)} at ${windDeg} degrees`);

  humidityElem.textContent = `${data.main.humidity}%`;
  conditionElem.textContent = data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());

  const iconCode = data.weather[0].icon;
  weatherIconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconImg.alt = weatherIconAltMap[iconCode] || "Weather icon";

  // Show last updated time
  const updatedDate = new Date();
  lastUpdatedElem.textContent = `Last updated: ${updatedDate.toLocaleTimeString()}`;

  weatherSection.style.display = "block";
}

function showError(message) {
  weatherSection.style.display = "none";
  forecastContainer.style.display = "none";
  lastUpdatedElem.textContent = "";
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

async function fetchWeather(city) {
  showLoading(true);
  try {
    errorMessage.style.display = "none";
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${apiKey}`
    );

    if (!weatherRes.ok) {
      if (weatherRes.status === 404) throw new Error("City not found. Please check the city name.");
      else throw new Error("Error fetching weather data.");
    }

    const weatherData = await weatherRes.json();
    updateWeatherUI(weatherData);
    await fetchForecast(weatherData.coord.lat, weatherData.coord.lon);
  } catch (error) {
    showError(error.message || "Failed to fetch weather data");
  } finally {
    showLoading(false);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  showLoading(true);
  try {
    errorMessage.style.display = "none";
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${apiKey}`
    );

    if (!weatherRes.ok) {
      if (weatherRes.status === 404) throw new Error("Location not found.");
      else throw new Error("Error fetching weather data.");
    }

    const weatherData = await weatherRes.json();
    updateWeatherUI(weatherData);
    await fetchForecast(lat, lon);
  } catch (error) {
    showError(error.message || "Failed to fetch weather data");
  } finally {
    showLoading(false);
  }
}

async function fetchForecast(lat, lon) {
  try {
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${apiKey}`
    );

    if (!forecastRes.ok) throw new Error("Error fetching forecast data.");

    const forecastData = await forecastRes.json();

    const dailyTemps = {};
    // The API returns forecast data every 3 hours for 5 days.
    // We will take the temp at midday (12:00:00) or closest to it for each day.
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      const time = item.dt_txt.split(" ")[1];
      // convert time HH:MM:SS to number HHMMSS for comparison
      const timeNum = parseInt(time.replace(/:/g, ''));
      if (!dailyTemps[date] || Math.abs(timeNum - 120000) < Math.abs(parseInt(dailyTemps[date].time.replace(/:/g, '')) - 120000)) {
        dailyTemps[date] = { temp: item.main.temp, time };
      }
    });

    const labels = Object.keys(dailyTemps).slice(0, 5);
    const temps = labels.map(date => dailyTemps[date].temp);

    if (forecastChart) forecastChart.destroy();

    const ctx = document.getElementById("forecast-chart").getContext("2d");
    forecastChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels.map(d => new Date(d).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })),
        datasets: [{
          label: `5-Day Forecast (${currentUnit === "metric" ? "°C" : "°F"})`,
          data: temps,
          fill: false,
          borderColor: "blue",
          tension: 0.2,
          pointBackgroundColor: "blue"
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });

    forecastContainer.style.display = "block";
  } catch (error) {
    forecastContainer.style.display = "none";
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    position => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
    () => showError("Unable to retrieve your location.")
  );
});

unitToggle.addEventListener("click", () => {
  if (currentUnit === "metric") {
    currentUnit = "imperial";
    unitToggle.textContent = "°F";
  } else {
    currentUnit = "metric";
    unitToggle.textContent = "°C";
  }
  // If city is displayed, refresh data in new unit
  const city = cityNameElem.textContent.split(",")[0];
  if (city) {
    if (city.length > 0) {
      fetchWeather(city);
    }
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

// On page load, optionally fetch weather for a default city
window.addEventListener("load", () => {
  fetchWeather("New York");
});

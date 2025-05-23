# 🌤️ A Smart Weather Forecast Web App

- Real-time
- user friendly

---

## ✅ Overview

**ClimaSense** is an interactive and user-friendly weather forecast web application designed to provide real-time weather data, 
forecasts, and local time information for cities across the globe. It leverages modern web technologies and the OpenWeatherMap API 
to deliver accurate climate updates. Features include temperature unit switching, local time display, weather forecast charting, theme toggle, and more.

---

## 🌟 Key Features

### 🌍 Global City Search
- Instantly search for weather data from any city around the world.

### 📍 Current Location Weather
- Automatically detect and display weather for your current location using the **Geolocation API**.

### 🌡 Temperature Unit Toggle (°C / °F)
- Seamlessly switch between **Celsius** and **Fahrenheit**.

### 📊 5-Day Forecast Chart
- View detailed daily weather trends via a **Chart.js**-powered chart.

### 🕒 Local Time Display
- Shows the current **local time** for the selected city based on timezone data.

### 🎨 Dark/Light Theme Switcher
- Toggle between dark and light modes for a better viewing experience.

### 🧠 Smart Enhancements
- Local storage support for saving user preferences.
- Debounced search to reduce unnecessary API requests.
- Optionally supports **PWA features** like offline access.

---

## 🧰 Technologies Used

| Technology            | Purpose                                      |
|-----------------------|----------------------------------------------|
| HTML5                 | Webpage structure                            |
| CSS3                  | Styling and responsive layout                |
| JavaScript            | Logic, DOM manipulation, interactivity       |
| OpenWeatherMap API    | Weather and timezone data                    |
| Chart.js              | Interactive weather forecast visualization   |
| Font Awesome          | Weather icons and UI symbols                 |
| Geolocation API       | Detects user's current location              |
| LocalStorage          | Stores theme/unit preferences                |


---

## ⚙️ How It Works (Step-by-Step)

### 🔍 1. User Input or Geolocation
- Detects user’s current location via the **Geolocation API**, or
- Accepts manual city name input from the search bar.

### 🌐 2. API Request to OpenWeatherMap
- Uses coordinates or city name to fetch data from OpenWeatherMap:
  - Current weather
  - 5-day forecast
  - Timezone offset

### ☁️ 3. Fetch and Process Weather Data
- Retrieves:
  - Temperature, humidity, wind speed
  - Weather condition and icon code
  - Forecast data grouped by day

### 🕒 4. Calculate and Display Local Time
- Uses timezone offset and `Date` object to calculate and display **city’s local time**.

### 📊 5. Render Weather Forecast Chart
- Utilizes **Chart.js** to generate a **line/bar chart** of daily temperatures.

### 🖥️ 6. Update User Interface
- Dynamically updates the DOM with:
  - City name, country, temperature
  - Weather description and icons
  - Local time and 5-day forecast

---

## 💡 Use Cases

- **Daily Planning**: Stay informed about weather before stepping out.
- **Traveling**: Instantly get updates for cities worldwide.
- **Learning Tool**: Perfect for understanding API integration and frontend skills.
- **Project Showcase**: Ideal for tech demos, portfolios, or college projects.

---

## 🌍 Impact

- 🧠 **Enhanced Awareness**: Prepares users for weather disruptions like rain or storms.
- ✨ **Smooth UI/UX**: Offers a clean and responsive interface with dark mode and charts.
- 📚 **Educational Value**: Encourages use of APIs, real-time data, and local storage.
- 💡 **Smart Weather Utility**: Represents an ideal smart city or IoT support project foundation.

---

## Live Demo Link :





## Screenshots

![image](https://github.com/user-attachments/assets/2c55a03d-2085-4a7b-956a-4d2fb4d4ec8b)
![image](https://github.com/user-attachments/assets/5965f717-a301-4ed6-94a1-95ab391b4d88)
![image](https://github.com/user-attachments/assets/6c492ff5-5335-4ff8-96a4-61968fc6f6fd)
![image](https://github.com/user-attachments/assets/c8ced46b-7e24-41a3-8ce9-714f230c1daa)
![image](https://github.com/user-attachments/assets/ed237640-359a-42de-ab45-e771d92aafc3)






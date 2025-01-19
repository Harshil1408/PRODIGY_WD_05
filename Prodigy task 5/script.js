const apiKey = "YOUR_API_KEY";  // Replace with your OpenWeatherMap API key

// Elements from the DOM
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Function to fetch weather data by city name
async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found.");
    } else {
      displayWeatherData(data);
    }
  } catch (error) {
    alert("Error fetching weather data. Please try again.");
  }
}

// Function to fetch weather data by user's location
async function fetchWeatherByLocation(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert("Error fetching weather data. Please try again.");
  }
}

// Function to display weather data on the page
function displayWeatherData(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherDescription.textContent = data.weather[0].description;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Get weather for the user's location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByLocation(latitude, longitude);
    }, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherByCity(city);
  } else {
    alert("Please enter a city.");
  }
});

locationBtn.addEventListener("click", getWeatherByLocation);


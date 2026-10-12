
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");
const result = document.getElementById("weather-result");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

function getWeatherInfo(code) {
  if (code === 0) return ["Clear sky", "☀️"];
  if (code <= 2) return ["Partly cloudy", "🌤️"];
  if (code === 3) return ["Overcast", "☁️"];
  if (code <= 48) return ["Foggy", "🌫️"];
  if (code <= 57) return ["Drizzle", "🌦️"];
  if (code <= 67) return ["Rain", "🌧️"];
  if (code <= 77) return ["Snow", "❄️"];
  if (code <= 82) return ["Rain showers", "🌧️"];
  if (code <= 86) return ["Snow showers", "🌨️"];
  if (code <= 99) return ["Thunderstorm", "⛈️"];

  return ["Weather unavailable", "🌡️"];
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    message.textContent = "Please enter a city name.";
    result.hidden = true;
    return;
  }

  message.textContent = "Loading weather...";
  result.hidden = true;

  try {
    const geoUrl =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) +
      "&count=1&language=en&format=json";

    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("Unable to search for this city.");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Please check the spelling.");
    }

    const place = geoData.results[0];

    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${place.latitude}` +
      `&longitude=${place.longitude}` +
      "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
      "&timezone=auto";

    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Unable to get weather details.");
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    const info = getWeatherInfo(current.weather_code);

    cityName.textContent = place.name +
      (place.country ? ", " + place.country : "");

    weatherIcon.textContent = info[1];
    description.textContent = info[0];
    temperature.textContent = Math.round(current.temperature_2m);
    humidity.textContent = current.relative_humidity_2m;
    wind.textContent = current.wind_speed_10m;

    result.hidden = false;
    message.textContent = "Current weather details";
  } catch (error) {
    message.textContent =
      error.message || "Something went wrong. Please try again.";
    result.hidden = true;
  }
});

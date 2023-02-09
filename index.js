// Current Time

let currentTime = new Date();

let h2 = document.querySelector("h2");

let hour = currentTime.getHours();
let minute = String(currentTime.getMinutes()).padStart(2, 0);
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekDays[currentTime.getDay()];

h2.innerHTML = `${day}, ${hour}:${minute}`;

// Weather Default City

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temp-value");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let weatherIcon = document.querySelector("#weather-icon");

  tempValue.innerHTML = `${celsiusTemperature}°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidityElement.innerHTML = response.data.main.humidity;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
let apiKey = "8ad14f7a62f146b2ab9eaec8cacef335";
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=Sofia&units=metric`;
axios.get(`${apiLink}&appid=${apiKey}`).then(showTemperature);

// Unit change feature WIP

function changeUnit() {
  let buttonText = document.querySelector("#button-text");
  if (buttonText.innerHTML === "Switch to Fahrenheit") {
    buttonText.innerHTML = "Switch to Celsius";
  } else {
    buttonText.innerHTML = "Switch to Fahrenheit";
  }
  let fahrenheitTemprature = Math.round(celsiusTemperature * 1.8 + 32) + "°F";
  let tempValue = document.querySelector("#temp-value");
  if (tempValue.innerHTML === fahrenheitTemprature) {
    tempValue.innerHTML = `${celsiusTemperature}°C`;
  } else {
    tempValue.innerHTML = fahrenheitTemprature;
  }
}

let unitButton = document.querySelector("#unit-button");
unitButton.addEventListener("click", changeUnit);

let celsiusTemperature = null;

// Geolocation

let cityInput = document.querySelector("#city-input");
let newCity = document.querySelector("#city");

function changeCity(event) {
  event.preventDefault();
  newCity.innerHTML = `${cityInput.value}`;
  apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiLink}&appid=${apiKey}`).then(showTemperature);
}

let citySearchBar = document.querySelector("#search-bar");
citySearchBar.addEventListener("submit", changeCity);

function currentCityName(cityName) {
  let currentCity = cityName.data.city;
  newCity.innerHTML = currentCity;
}

function handlePosition(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiLink}&appid=${apiKey}`).then(showTemperature);
  axios
    .get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    )
    .then(currentCityName);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", showCurrentLocation);

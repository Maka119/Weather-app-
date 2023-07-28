import "./style.css";
let date = document.querySelector("#today");

let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let day = currentDate.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

date.innerHTML = `${days[day]} ${hours}:${minutes}`;

function getTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
function originalCity(city) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(getTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  originalCity(city);
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", showCity);

originalCity("Durban");

function searchLocation(position) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getLocationPosition(searchLocation);
}

let currentLocation = document.querySelector("#location-input");
currentLocation.addEventListener("click", getLocation);

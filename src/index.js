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

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.time
                )}</div>

                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-temp-max"> ${Math.round(
                    forecastDay.temperature.maximum
                  )}° </span>
                  <span class="weather-temp-min"> ${Math.round(
                    forecastDay.temperature.minimum
                  )}° </span>
                </div>
              </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "afc34890d5f2e69t9063c4e498283o2b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#CurrentCity");
  cityElement.innerHTML = response.data.city;

  celsiusTemp = response.data.daily[0].temperature.day;
  console.log(response.data.daily[0].temperature.day);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.daily[0].condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.daily[0].wind.speed);

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(response.data.daily[0].time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = "afc34890d5f2e69t9063";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showCelsius(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

let celsiusTemp = null;

let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", showCelsius);

let fahrenheitUnit = document.querySelector("#far-unit");
fahrenheitUnit.addEventListener("click", showFahrenheit);

search("Durban");

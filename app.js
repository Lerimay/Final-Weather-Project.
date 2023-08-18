function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = date.getDay();
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}


function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
            <div class="col-2">
              <div class="weather-forecast-date">
                ${formatDay(
                    forecastDay.dt
                )} </div><img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon
                }@2x.png" alt="" width="42px">
               <div class="weather-forecast-temperatures">
                 <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                )}°</span>
                 <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                )}°</span>
              </div>
            </div>
          `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#Wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord)
}
function search(city) {
    let apiKey = "f52c42d33e007f7250df167ee104c7d8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handlesubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayfahrenheitTemperature(event) {
    event.preventDefault("link clicked");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement, (innerHTML = Math.round(fahrenheitTemperature));
}

function displaycelsiusTemperature(event) {
    event.preventDefault("");
    temperatureElement, (innerHTML = math.round(celsiusTemperature));
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

search("Cape Town");
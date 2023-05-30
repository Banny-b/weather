"use strict"

// Блок с погодой
const weatherBlock = document.querySelector('#weather');

async function loadWeather(event) {
    weatherBlock.innerHTML = `
    <div class="weather__loading">
        <img src="img/loading.gif" alt="Loading...">
    </div>`;

const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&lat=49.9923181&lon=36.2310146&appid=d26ea699f6e933696b744f9b0d289eb6';
const response = await fetch(server, {
    method: 'GET',
});

const responseResult = await response.json();
if (response.ok) {
    getWeather(responseResult);
} else {
    weatherBlock.innerHTML = responseResult.message;
};
};

function getWeather(data) {
    // Обработка и вывод данных
    console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const windStatus = Math.round(data.wind.speed);
    const humidityStatus = Math.round(data.main.humidity);
    const pressureStatus = Math.round(data.main.pressure);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    // Запрос текущей даты
    const currentDate = new Date();
    const currentDateFormatted = currentDate.toLocaleDateString();

    // HTML-шаблон
    const template = `
    <div class="weather__header">
        <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__status"><span>Sky: </span>${weatherStatus}</div>
        </div>
        <div class="weather__icon">
            <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
    </div>
    <div class="weather__temp"><span>Temp: </span>${temp}</div>
    <div class="weater__feels-like"><span>Feeling temp: </span>${feelsLike}</div>
    <div class="weather__wind"><span>Wind: </span>${windStatus}</div>
    <div class="weather__humid"><span>Humidity: </span>${humidityStatus}</div>
    <div class="weather__press">Pressure: </span>${pressureStatus}</div>
    <div class="weather__time">${currentDateFormatted}</div>`;

    // Вывод HTML-шаблона в виджет
    weatherBlock.innerHTML = template;
};

if (weatherBlock) {
    loadWeather();
};

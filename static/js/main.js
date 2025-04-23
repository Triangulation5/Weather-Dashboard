let currentUnit = 'metric';

function searchWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    currentUnit = document.querySelector('input[name="units"]:checked').value;
    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    fetch(`/weather?city=${encodeURIComponent(city)}&units=${currentUnit}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateCurrentWeather(data.current);
                updateForecast(data.forecast);
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch weather data');
        });
}

function updateCurrentWeather(current) {
    const temp = currentUnit === 'metric' ? 
        `${current.temperature.celsius}°C` : 
        `${current.temperature.fahrenheit}°F`;

    document.getElementById('currentWeather').innerHTML = `
        <div class="text-center">
            <h2>${current.city}</h2>
            <img src="http://openweathermap.org/img/w/${current.icon}.png" alt="Weather icon" class="weather-icon">
            <div class="temperature">${temp}</div>
            <div class="weather-details">
                <p>${current.description}</p>
                <p>Humidity: ${current.humidity}%</p>
                <p>Wind Speed: ${current.wind_speed} m/s</p>
            </div>
        </div>
    `;
}

function updateForecast(forecast) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    forecast.forEach(item => {
        const temp = currentUnit === 'metric' ? 
            `${item.temperature.celsius}°C` : 
            `${item.temperature.fahrenheit}°F`;

        const date = new Date(item.datetime);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        const forecastItem = document.createElement('div');
        forecastItem.className = 'col-md-2 forecast-item';
        forecastItem.innerHTML = `
            <div class="weather-card">
                <p><strong>${formattedDate}</strong></p>
                <p>${formattedTime}</p>
                <img src="http://openweathermap.org/img/w/${item.icon}.png" alt="Weather icon" class="weather-icon">
                <p class="temp">${temp}</p>
                <p>${item.description}</p>
                <p>Humidity: ${item.humidity}%</p>
                <p>Wind: ${item.wind_speed} m/s</p>
            </div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

// Initial load with default city
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('London');
});

// Update when unit is changed
document.querySelectorAll('input[name="units"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const city = document.getElementById('cityInput').value || 'London';
        searchWeather();
    });
});
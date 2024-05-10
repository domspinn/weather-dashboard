const apiKey = "66e55f6bb741fa7676661dac34dcd50b";
    
// Function to fetch current weather
async function fetchCurrentWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}

// Function to fetch 5-day forecast
async function fetchForecast(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}

// Function to update current weather
async function updateCurrentWeather(city) {
  const currentWeatherDetailsDiv = document.getElementById("currentWeatherDetails");
  const data = await fetchCurrentWeather(city);
  const { main, wind } = data;
  currentWeatherDetailsDiv.innerHTML = `
    <p>Temperature: ${main.temp} °C</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
}

// Function to update 5-day forecast
async function updateForecast(city) {
  const forecastDiv = document.getElementById("forecast");
  const data = await fetchForecast(city);
  const forecastList = data.list;
  let forecastHTML = "";
  let dates = [];
  forecastList.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!dates.includes(date)) {
      dates.push(date);
      forecastHTML += `
        <div class="column is-one-fifth">
          <div class="card">
            <div class="card-content">
              <p>Date: ${item.dt_txt}</p>
              <p>Temperature: ${item.main.temp} °C</p>
              <p>Wind Speed: ${item.wind.speed} m/s</p>
              <p>Humidity: ${item.main.humidity}%</p>
            </div>
          </div>
        </div>
      `;
    }
  });
  forecastDiv.innerHTML = forecastHTML;
}

// Event listener for city input
document.getElementById("cityInput").addEventListener("change", function() {
  const city = this.value;
  updateCurrentWeather(city);
  updateForecast(city);
});
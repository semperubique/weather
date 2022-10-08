const key = "b902e8317058b2cac1e5f3c013a5fb95";

const processData = (weatherData) => {
  const weatherDataProcessed = {
    name: weatherData.city.name,
    today: {
      currentTemp: Math.round(weatherData.list[0].main.temp),
      feelsLike: Math.round(weatherData.list[0].main.feels_like),
      minTemp: Math.round(weatherData.list[0].main.temp_min),
      maxTemp: Math.round(weatherData.list[0].main.temp_max),
      humidity: Math.round(weatherData.list[0].main.humidity),
      weatherDescription: weatherData.list[0].weather[0].description,
      windSpeed: Math.round(weatherData.list[0].wind.speed * 3.6 * 100) / 100,
    },
  };

  return weatherDataProcessed;
};

const getData = async (key, location) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${key}&units=metric`;
    const response = await fetch(url, { mode: "cors" });
    if (response.status === 200) {
      const weatherData = await response.json();
      const weatherDataProcessed = processData(weatherData);
      return weatherDataProcessed;
    } else {
      console.log(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const form = document.querySelector("form");
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async () => {
  if (!form.checkValidity()) {
    form.reportValidity();
  } else {
    const location = document.querySelector("input#location").value;
    const cityName = document.querySelector(".city-name");
    const weatherDescription = document.querySelector(".weather-description");
    const currentTemp = document.querySelector(".current-temp");
    const humidity = document.querySelector(".humidity");
    const windSpeed = document.querySelector(".wind-speed");
    document.querySelector("#loading").classList.remove("hidden");
    document.querySelector(".today").classList.add("hidden");
    const weatherData = await getData(key, location);
    if (weatherData !== undefined) {
      cityName.textContent = weatherData.name;
      weatherDescription.textContent = weatherData.today.weatherDescription;
      currentTemp.textContent = weatherData.today.currentTemp + "	°C";
      humidity.textContent = "Humidity: " + weatherData.today.humidity + " %";
      windSpeed.textContent =
        "Wind speed: " + weatherData.today.windSpeed + " km/h";
    } else {
      document
        .querySelector("input#location")
        .setCustomValidity("Incorrect place name");
      form.reportValidity();
      document.querySelector("input#location").setCustomValidity("");
      form.reset();
    }
    document.querySelector("#loading").classList.add("hidden");
    document.querySelector(".today").classList.remove("hidden");
  }
});

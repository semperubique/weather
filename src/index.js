const key = "b902e8317058b2cac1e5f3c013a5fb95";
const location = "London";

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
    const weatherData = await response.json();
    const weatherDataProcessed = processData(weatherData);
    return weatherDataProcessed;
  } catch (error) {
    console.log(error);
  }
};

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async () => {
  const abc = await getData(key, location);
  console.log(abc);
});

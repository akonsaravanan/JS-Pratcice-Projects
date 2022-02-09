const inputSearch = document.querySelector(".search-bar");
const buttonSearch = document.querySelector(".search-icon");
const weatherDiv = document.querySelector(".weather");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icons = document.querySelector(".icon");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const winds = document.querySelector(".wind");

let weatherobj = {
  apikey: "166ab4233db5802fde57d87f62b9ea6e",

  fetchWeather: function (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`;
    // console.log(url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert("No resposne");
          throw new Error("Error");
        } else {
          return response.json();
        }
      })
      .then((response) => {
        this.displayWeather(response);
      });
  },
  displayWeather: function (response) {
    // console.log(response);
    const { name, weather, wind, main } = response;
    // console.log(name, weather, wind, main);
    weatherDiv.classList.remove("loading");
    city.textContent = "Weather in " + name;
    temp.textContent = main.temp + "°C";
    humidity.textContent = "Humidity: " + main.humidity + "%";
    description.innerText = weather[0].description;
    winds.textContent = "Wind speed: " + wind.speed + "km/h";
    icons.src = "https://openweathermap.org/img/wn/" + weather[0].icon + ".png";
  },
  searchWeather: function () {
    this.fetchWeather(inputSearch.value);
  },
};

weatherobj.fetchWeather("Kerala");
buttonSearch.addEventListener("click", function () {
  weatherobj.searchWeather();
});

inputSearch.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    weatherobj.searchWeather();
  }
});

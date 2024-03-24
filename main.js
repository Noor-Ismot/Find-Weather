//API Information
const apiKey = "087e55344a868756a7b3b277fe8078a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Variables
const searchBox = document.querySelector(".search-container input");
const searchBtn = document.querySelector(".search-container button");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.getElementById('body');

//Event listener for the search button
searchBtn.addEventListener("click", () => {
    if (searchBox.value == '') {
        document.querySelector(".emptyText").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "none";
        body.style.backgroundImage = "url('images/back-default.jpg')";
    }
    else {
        checkWeather(searchBox.value);
        document.querySelector(".emptyText").style.display = "none";

    }
});


// Event listener for Enter key press
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (searchBox.value == '') {
            document.querySelector(".emptyText").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").style.display = "none";
            body.style.backgroundImage = "url('images/back-default.jpg')";
        } else {
            checkWeather(searchBox.value);
            document.querySelector(".emptyText").style.display = "none";
        }
    }
});

// Function to check weather data for a given city
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Handle case when the city is not found
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".emptyText").style.display = "none";
        body.style.backgroundImage = "url('images/back-default.jpg')";
    }

    else {
        //Extract weather data from the API response
        var data = await response.json();

        // Update the HTML elements with the retrieved weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Set the weather icon based on the weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png?t=" + Date.now();
            body.style.backgroundImage = "url('images/back-cloudy.jpg')";
        }

        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png?t=" + Date.now();
            body.style.backgroundImage = "url('images/back-clear.jpg')";
        }

        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png?t=" + Date.now();
            body.style.backgroundImage = "url('images/back-rain.jpg')";
        }

        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png?t=" + Date.now();
            body.style.backgroundImage = "url('images/back-drizzle.jpg')";
        }

        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png?t=" + Date.now();
            body.style.backgroundImage = "url('images/back-mist.jpg')";
        }

        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png?t=" + Date.now();
            body.style.backgroundImage = "url('images/back-snow.jpg')";
        }

        else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/haze.svg?t=" + Date.now();
            body.style.backgroundImage = "url('images/back-haze.jpg')";
        }

        // Display the weather information and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }

}

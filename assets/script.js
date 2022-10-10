// input city name
// parse data for lat + lon
// input lat + lon into the api to get the weather forecast
// populate the containers with the parsed weather info
var cityLatitude;
var cityLongitude;

var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityName = document.querySelector("#cityName").value.trim();
    if (cityName) {
        console.log(cityName);
        var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=308207fba2f306021f2d0ad086ed7b2f"
        getCityCoords(geoApiUrl);
        // getCityForecast();
        document.querySelector("#cityName").value = "";
    } 
    else {
        alert('Please enter a city');
        console.log("hello")
    }
};

// takes in the geoapiurl with the specified city and retrieve's the latitude and longitude values
var getCityCoords = function (url) {
    fetch(url)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    cityLatitude = data[0].lat;
                    cityLongitude = data[0].lon;
                    console.log(cityLatitude + ", " + cityLongitude)

                    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLatitude+"&lon="+cityLongitude+"&appid=308207fba2f306021f2d0ad086ed7b2f&units=imperial";
                    fetch(weatherApiUrl)
                        .then (function (response) {
                            if(response.ok) {
                                response.json().then(function (data2) {
                                    console.log(data2);
                                })
                            }
                        })
                })
            } else {
                alert("Error: " + response.statusText);
            }
        })
    .catch(function (error) {
        alert("unable to connect to servers")
    });
    
}


// // using the lat+lon, get the city's weather data
// var getCityForecast = function () {
//     var weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLatitude+"&lon="+cityLongitude+"&appid=308207fba2f306021f2d0ad086ed7b2f";
//     fetch(weatherApiUrl)
//     .then(function (response) {
//         if(response.ok) {
//             response.json().then(function (data) {
//                 console.log(data);
//             })
//         }
//     })
// }

document.querySelector("#cityNameSearch").addEventListener('submit', formSubmitHandler);
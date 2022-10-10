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
        var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=308207fba2f306021f2d0ad086ed7b2f"
        getCityData(geoApiUrl);
        document.querySelector("#cityName").value = "";
    } 
    else {
        alert('Please enter a city');
        console.log("hello")
    }
};

var getCityData = function (url) {
    fetch(url)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    cityLatitude = data[0].lat;
                    cityLongitude = data[0].lon;
                    console.log(cityLatitude + ", " + cityLongitude)
                })
            } else {
                alert("Error: " + response.statusText);
            }
        })
    .catch(function (error) {
        alert("unable to connect to servers")
    });
}

document.querySelector("#cityNameSearch").addEventListener('submit', formSubmitHandler);
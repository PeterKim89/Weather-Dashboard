// input city name
// parse data for lat + lon
// input lat + lon into the api to get the weather forecast
// populate the containers with the parsed weather info
var cityDataObject;
var forecastContainersObj = [
    {
        date: document.querySelector("#currentDate").textContent,
        icon: document.querySelector("#currentIcon").textContent,
        // temp: document.querySelector("#currentTemp").textContent,
        temp: "#currentTemp",
        wind: document.querySelector("#currentWind").textContent,
        humidity: document.querySelector("#currentHumidity").textContent
    },
    {
        date: document.querySelector("#date1").textContent,
        icon: document.querySelector("#icon1").textContent,
        // temp: document.querySelector("#temp1").textContent,
        temp: "#temp1",
        wind: document.querySelector("#wind1").textContent,
        humidity: document.querySelector("#humidity1").textContent
    },
    {
        date: document.querySelector("#date2").textContent,
        icon: document.querySelector("#icon2").textContent,
        // temp: document.querySelector("#temp2").textContent,
        temp: "#temp2",
        wind: document.querySelector("#wind2").textContent,
        humidity: document.querySelector("#humidity2").textContent
    },
    {
        date: document.querySelector("#date3").textContent,
        icon: document.querySelector("#icon3").textContent,
        // temp: document.querySelector("#temp3").textContent,
        temp: "#temp3",
        wind: document.querySelector("#wind3").textContent,
        humidity: document.querySelector("#humidity3").textContent
    },
    {
        date: document.querySelector("#date4").textContent,
        icon: document.querySelector("#icon4").textContent,
        // temp: document.querySelector("#temp4").textContent,
        temp: "#temp4",
        wind: document.querySelector("#wind4").textContent,
        humidity: document.querySelector("#humidity4").textContent
    },
    {
        date: document.querySelector("#date5").textContent,
        icon: document.querySelector("#icon5").textContent,
        // temp: document.querySelector("#temp5").textContent,
        temp: "#temp5",
        wind: document.querySelector("#wind5").textContent,
        humidity: document.querySelector("#humidity5").textContent
    }
]

var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityName = document.querySelector("#cityName").value.trim();
    if (cityName) {
        console.log(cityName);
        document.querySelector("#searchCityName").textContent = cityName;
        var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=308207fba2f306021f2d0ad086ed7b2f"
        getCityData(geoApiUrl);
        // passes the city name value to the Current Day Forecast
        document.querySelector("#cityName").value = "";
        
        
    } 
    else {
        alert('Please enter a city');
        // console.log("hello")
    }
};

// takes in the geoapiurl with the specified city and retrieve's the latitude and longitude values
var getCityData = function (url) {
    fetch(url)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    var cityLatitude = data[0].lat; 
                    var cityLongitude = data[0].lon;
                    // console.log(cityLatitude + ", " + cityLongitude)

                    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLatitude+"&lon="+cityLongitude+"&appid=308207fba2f306021f2d0ad086ed7b2f&units=imperial";
                    fetch(weatherApiUrl)
                        .then (function (response) {
                            if(response.ok) {
                                response.json().then(function (data2) {
                                    // console.log(data2);
                                    cityDataObject = data2;
                                    // console.log(cityDataObject);
                                    for (i=0; i<6; i++)
                                    {
                                        console.log(data2.list[i].main.temp);
                                        console.log(forecastContainersObj[i].temp)
                                        // forecastContainersObj[i].temp = data2.list[i].main.temp;
                                        document.querySelector(forecastContainersObj[i].temp).textContent = " " + data2.list[i].main.temp;
                                        forecastContainersObj[i].wind = cityDataObject.list[i].main.wind;
                                        forecastContainersObj[i].wind = cityDataObject.list[i].main.humidity;
                                    }
                                })
                            }
                        })
                        .catch(function (error) {
                            alert("Error: "+ response.statusText);
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

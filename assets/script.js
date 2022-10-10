// input city name
// parse data for lat + lon
// input lat + lon into the api to get the weather forecast
// populate the containers with the parsed weather info
var forecastContainersObj = [
    {
        date: "#currentDate",
        icon: "#currentIcon",
        temp: "#currentTemp",
        wind: "#currentWind",
        humidity: "#currentHumidity"
    },
    {
        date: "#date1",
        icon: "#icon1",
        temp: "#temp1",
        wind: "#wind1",
        humidity: "#humidity1"
    },
    {
        date: "#date2",
        icon: "#icon2",
        temp: "#temp2",
        wind: "#wind2",
        humidity: "#humidity2"
    },
    {
        date: "#date3",
        icon: "#icon3",
        temp: "#temp3",
        wind: "#wind3",
        humidity: "#humidity3"
    },
    {
        date: "#date4",
        icon: "#icon4",
        temp: "#temp4",
        wind: "#wind4",
        humidity: "#humidity4"
    },
    {
        date: "#date5",
        icon: "#icon5",
        temp: "#temp5",
        wind: "#wind5",
        humidity: "#humidity5"
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
                                    console.log(data2);
                                    cityDataObject = data2;
                                    // console.log(cityDataObject);
                                    for (i=0; i<6; i++)
                                    {
                                        console.log(data2.list[i].main.temp);
                                        console.log(forecastContainersObj[i].temp)

                                        document.querySelector(forecastContainersObj[i].date).textContent = " " + moment().format("MMMM, Do, YYYY")
                                        document.querySelector(forecastContainersObj[i].temp).textContent = " " + data2.list[i].main.temp + "F";
                                        document.querySelector(forecastContainersObj[i].wind).textContent = " " + data2.list[i].wind.speed + " mph"; 
                                        document.querySelector(forecastContainersObj[i].humidity).textContent = " " + data2.list[i].main.humidity + "%";
                                        
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

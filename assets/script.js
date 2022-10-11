// input city name
// parse data for lat + lon
// input lat + lon into the api to get the weather forecast
// populate the containers with the parsed weather info
var currentForecastObj = {
    date: "#currentDate",
    icon: "#currentIcon",
    temp: "#currentTemp",
    wind: "#currentWind",
    humidity: "#currentHumidity"
}
var forecastContainersObj = [ 
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
        var geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=308207fba2f306021f2d0ad086ed7b2f&units=imperial"
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
                    console.log(data);
                    document.querySelector(currentForecastObj.date).textContent = moment().format("MMMM, Do, YYYY");
                    // document.querySelector(currentForecastObj.icon).textContent 
                    document.querySelector(currentForecastObj.temp).textContent = " " + data.main.temp + "F";
                    document.querySelector(currentForecastObj.wind).textContent = " " + data.wind.speed + " mph";
                    document.querySelector(currentForecastObj.humidity).textContent = " " + data.main.humidity + "%";

                    var cityLatitude = data.coord.lat; 
                    var cityLongitude = data.coord.lon;
                    
                    // console.log(cityLatitude + ", " + cityLongitude)

                    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLatitude+"&lon="+cityLongitude+"&appid=fada60c7d193a5d0339eb9c9f0107eb5&units=imperial";
                    fetch(weatherApiUrl)
                        .then (function (response) {
                            if(response.ok) {
                                response.json().then(function (data2) {
                                    console.log(data2);
                                    cityDataObject = data2;
                                    // console.log(cityDataObject);
                                    for (i=0; i<5; i++) //TODO: change i<5 back to i<6
                                    {

                                        // console.log(data2.list[8*i].main.temp);
                                        console.log(forecastContainersObj[i].temp)
                                        var iteratedDate = moment();
                                        iteratedDate = iteratedDate.add(i+1,'d');
                                        document.querySelector(forecastContainersObj[i].date).textContent = " " + iteratedDate.format("MMMM, Do, YYYY");
                                        document.querySelector(forecastContainersObj[i].temp).textContent = " " + data2.list[8*i].main.temp + "F";
                                        document.querySelector(forecastContainersObj[i].wind).textContent = " " + data2.list[8*i].wind.speed + " mph"; 
                                        document.querySelector(forecastContainersObj[i].humidity).textContent = " " + data2.list[8*i].main.humidity + "%";
                                        
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

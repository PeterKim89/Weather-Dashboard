// object to target Current Day elements
var currentForecastObj = {
    date: "#currentDate",
    icon: "#currentIcon",
    temp: "#currentTemp",
    wind: "#currentWind",
    humidity: "#currentHumidity"
}
// object to target future day elements
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

// Will trigger upon a form submit of the city input
var formSubmitHandler = function (event) {
    event.preventDefault();
    // will save the city input into a variable
    var cityName = document.querySelector("#cityName").value.trim();
    if (cityName) {
        // creating the city specific api url
        var geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=308207fba2f306021f2d0ad086ed7b2f&units=imperial"
        // passing the api call along with the city's name to another function to get the actual weather data
        getCityData(geoApiUrl, cityName);
        // passes the city name value to the Current Day Forecast
        document.querySelector("#cityName").value = "";
        // append a button to the search history with the city name
        var pastSearch = document.createElement("button");
        // set it's id and class to style and target later
        pastSearch.setAttribute("id", cityName+"Btn");
        pastSearch.setAttribute("class", "historyButton");
        pastSearch.innerHTML = cityName;
        // add click event handler to the button
        pastSearch.addEventListener("click", function(){
            getCityData("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=308207fba2f306021f2d0ad086ed7b2f&units=imperial", cityName)
        }); 
        // append the button onto the search history
        document.querySelector("#searchHistoryContainer").append(pastSearch);

    } 
    else {
        alert('Please enter a city');
    }
};

// takes in the geoapiurl with the specified city and retrieve's the latitude and longitude values
var getCityData = function (url, city) {
    fetch(url)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    // assigning data to the current day info
                    document.querySelector("#searchCityName").textContent = city;
                    document.querySelector(currentForecastObj.date).textContent = moment().format("MMMM, Do, YYYY");
                    document.querySelector(currentForecastObj.icon).src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
                    document.querySelector(currentForecastObj.temp).textContent = " " + data.main.temp + "F";
                    document.querySelector(currentForecastObj.wind).textContent = " " + data.wind.speed + " mph";
                    document.querySelector(currentForecastObj.humidity).textContent = " " + data.main.humidity + "%";

                    // retrieving coordinates from the parsed json data
                    var cityLatitude = data.coord.lat; 
                    var cityLongitude = data.coord.lon;
                    
                    // add city + coordinates to local storage
                    localStorage.setItem(city, [cityLatitude,cityLongitude])

                    // api call for the future 5 day forecast
                    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLatitude+"&lon="+cityLongitude+"&appid=fada60c7d193a5d0339eb9c9f0107eb5&units=imperial";
                    fetch(weatherApiUrl)
                        .then (function (response) {
                            if(response.ok) {
                                response.json().then(function (data2) {
                                    cityDataObject = data2;
                                    for (i=0; i<5; i++)
                                    {
                                        var iteratedDate = moment();
                                        iteratedDate = iteratedDate.add(i+1,'d');
                                        document.querySelector(forecastContainersObj[i].icon).src = "http://openweathermap.org/img/wn/"+data2.list[8*i+3].weather[0].icon+"@2x.png"
                                        document.querySelector(forecastContainersObj[i].date).textContent = " " + iteratedDate.format("MMMM, Do, YYYY");
                                        document.querySelector(forecastContainersObj[i].temp).textContent = " " + data2.list[8*i+3].main.temp + "F";
                                        document.querySelector(forecastContainersObj[i].wind).textContent = " " + data2.list[8*i+3].wind.speed + " mph"; 
                                        document.querySelector(forecastContainersObj[i].humidity).textContent = " " + data2.list[8*i+3].main.humidity + "%";        
                                    }
                                })
                            }
                        })
                        .catch(function (error) {
                            alert("Unable to connect to servers");
                        })
                })
            } else {
                alert("Error: " + response.statusText);
            }
        })
    .catch(function (error) {
        alert("unable to connect to servers");
    });
}

document.querySelector("#cityNameSearch").addEventListener("submit", formSubmitHandler);
# Weather-Dashboard
https://peterkim89.github.io/Weather-Dashboard/

## Introduction
Through this weather dashboard, the user can see a 6-day forecast for any given city. With winter coming it's all the more important to keep track of the weather. A valuable skill of how to perform fetch requests on apis and parse the response data was learned throughout the whole process. 

## Build Process 
A sketch of the frontend ui was first made. From there the HTML and CSS were made, keeping in mind that many elements were going to be dynamically generated and changed. As work began on the script.js, additions and removals were made to the HTML as needed. First for the script file, I considered what elements would need event handlers. The next step was to call upon the API to get the weather data for a specified city. However an api call with just a city name only returns some of the needed information. Another api call is needed using the latitutde and longitude to get the full 6-day forecast. Using all of this data, the weather forecast can be appended or changed in the HTML. Moment.js takes care of the dates and any other functions requiring dates. Lastly, the city names and their coordinates are saved to local storage, which are then appended as buttons to a search history container. These buttons allow for past searched cities to show their forecast again quickly.

## Code Snippet
As the event handler for the city input form, it needs to take on the role of calling the api and performing most of the work in the app. A preventDefault() is used to prevent the page from instantly refreshing. The city input element is targeted and saved into a variable. Checking to see if a city name has been passed, the first API call is made to get it's coordinates. getCityData() will take care of retrieving any needed weather data and adding it to the page. Afterwards, the input form is reset to an empty string. Then a button with it's text set as the city name, with an api call attached to its event handler. This button is then appended to a list of past searched cities to call upon later.

```
var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityName = document.querySelector("#cityName").value.trim();
    if (cityName) {
        var geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=308207fba2f306021f2d0ad086ed7b2f&units=imperial"
        getCityData(geoApiUrl, cityName);
        document.querySelector("#cityName").value = "";
        var pastSearch = document.createElement("button");
        pastSearch.setAttribute("id", cityName+"Btn");
        pastSearch.setAttribute("class", "historyButton");
        pastSearch.innerHTML = cityName;
        pastSearch.addEventListener("click", function(){
            getCityData("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=308207fba2f306021f2d0ad086ed7b2f&units=imperial", cityName)
        }); 
        document.querySelector("#searchHistoryContainer").append(pastSearch);
```

## Usage
![Gif](./assets/Weather%20Forecast.gif)
Inputting a valid city name will populate the weather forecast for today and the next 5 days.
A button for that city will then be appended to the list. Clicking on any button will recall the weather forecast for that city.

## Languages and Technology
- JavaScript
- HTML
- CSS
- [Openweather API](https://openweathermap.org/api)

## Author
[GitHub](https://github.com/PeterKim89) <br>
[LinkedIn](www.linkedin.com/in/peter-kim89)   
[Email] Peter.Kim@uconn.edu

## License
[MIT](https://choosealicense.com/licenses/mit/) <br>
Copyright (c) [2022] [Peter Kim]
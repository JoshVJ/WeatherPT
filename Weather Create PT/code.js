//State lists for data, and variables to use the data
var stateList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "State");
var cityList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "City");
var dateList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Forecast Number");
var iconList= getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Icon");
var highTempList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "High Temperature");
var lowTempList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Low Temperature");
var humidityPercentList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Humidity Percentage");
var rainAmountList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Rain Inches");
var snowAmountList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Snow Inches");
var cloudPercentageList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Cloud Percent");
var windSpeedList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Wind MPH");
var windDirectionList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Wind Direction");
var weatherDescriptionList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Condition Description");
var fullDateList = getColumn("C:\Users\s733105\Downloads\Daily Weather.csv", "Date");
var stateDropdown = "";
var fullDate = "";
var day = "";
var icon = "";
var weatherDescription = "";
var highTemp = "";
var lowTemp = "";
var humidityPercent = "";
var rainAmount = "";
var snowAmount = "";
var cloudPercentage = "";
var windSpeed = "";
var windDirection = "";
var filteredCityList=["Please choose a city:"];
var filteredStateList=["Please choose a state:"];
var tempuratureChoice = "Fahrenheit";
var inputCheck;

//Hides the input blocker after the app is finished loading all lists.
hideElement("inputBlock1");

onEvent("stateDropdown", "input", function( ) {
  stateDropdown=getText("stateDropdown");
  setProperty("cityDropdown", "options", checkCity(stateDropdown));
  hideElement("inputBlock2");
  hideElement("inputBlock3");
});

//Updates every element to show weather data on weatherResults screen
onEvent("weatherButton", "click", function( ) {
  checkInputs();
  if (inputCheck=="True") {
    day = checkDate(getText("dateDropdown"));
    checkWeather(getText("stateDropdown"), getText("cityDropdown"), day);
    hideElement("errorLabel");
    setProperty("fahrenheitbutton", "checked", true);
    setProperty("citystateLabel", "text", ("Weather in: " + getText("cityDropdown")) + ", " + getText("stateDropdown") + " " + fullDate);
    setProperty("weatherIcon", "image", icon);
    setProperty("highLabel", "text", "High:\n" + highTemp + "°F");
    setProperty("lowLabel", "text", "Low:\n" + lowTemp + "°F");
    setProperty("humidityLabel", "text", "Humidity:\n" + humidityPercent + "%");
    setProperty("precipitationAmountLabel", "text", precipitationCheck());
    setProperty("cloudPercentageLabel", "text", "Clouds:\n" + cloudPercentage + "%");
    setProperty("windLabel", "text", "Wind:\n" + windSpeed + "MPH\n" + windDirection);
    setProperty("weatherLabel", "text", weatherDescription.toUpperCase());
  } else {
    showElement("errorLabel");
  }
});

//Allows user to go back to the main screen after looking at weather.
onEvent("backButton", "click", function( ) {
  filteredCityList = [];
  filteredStateList = [];
  setScreen("homeScreen");
});

//For the buttons on weatherResults screen, changes temperature type from user's choice using functions.
//Celsius to fahrenheit
onEvent("fahrenheitbutton", "click", function( ) {
  fahrenheitConverter();
});

//Fahrenheit to celsius
onEvent("celsiusButton", "click", function( ) {
  celsiusConverter();
});

//Function to update variables based on the state, city, and date based on database.
function checkWeather(state, city, date) {
for (var i = 0; i < stateList.length; i++) {
    if (state==stateList[i] & city==cityList[i] & date==dateList[i]) {
      icon = iconList[i];
      highTemp = Math.round(highTempList[i]);
      lowTemp = Math.round(lowTempList[i]);
      humidityPercent = humidityPercentList[i];
      cloudPercentage = cloudPercentageList[i];
      windSpeed = windSpeedList[i];
      windDirection = windDirectionList[i];
      weatherDescription = weatherDescriptionList[i];
      fullDate = fullDateList[i];
      tempuratureChoice = "Fahrenheit";
      rainAmount = rainAmountList[i];
      snowAmount = snowAmountList[i];
      setScreen("weatherResults");
    }
  }
}

//Function which adds cities from the state into the dropdown based on the state.
function checkCity(state) {
  filteredCityList = ["Please choose a city:"];
  for (var i = 0; i < cityList.length; i++) {
    if (state==stateList[i] & cityList[i]!= cityList[(i-1)]) {
      appendItem(filteredCityList, cityList[i]);
    }
  }
  return filteredCityList;
}

//Updates variable date based on the user's input for use in checkWeather function. 
function checkDate(date) {
  if (date=="Today") {
    return "1";
  } else if (date=="Tomorrow") {
    return "2";
  } else if (date=="Two days from now") {
    return "3";
  } else if (date=="Three days from now") {
    return "4";
  } else {
    return "5";
  }
}


//If there is snow, it will show snow chance instead of rain chance.
function precipitationCheck() {
  if (snowAmount!=0) {
    return ("Snow Amount:\n" + snowAmount + "in.");
  } else {
    return (("Rain Amount:\n" + rainAmount) + "in.");
  }
}

//Verifies that all dropdowns have inputs.
function checkInputs() {
  if (getText("stateDropdown") != "Please choose a state:" & getText("cityDropdown") != "Please choose a city:" & getText("dateDropdown")!= "Please choose a date:") {
    inputCheck = "True";
  } else {
    inputCheck = "False";
  }
}

//Converts Fahrenheit to Celsius
function celsiusConverter() {
  if (tempuratureChoice=="Fahrenheit"){
  highTemp = (highTemp-32);
  highTemp = (highTemp*(5/9));
  setProperty("highLabel", "text", "High:\n" + Math.round(highTemp) + "°C");
  lowTemp = (lowTemp-32);
  lowTemp = (lowTemp*(5/9));
  setProperty("lowLabel", "text", "Low:\n" + Math.round(lowTemp) + "°C");
  }
  tempuratureChoice = "Celsius";
  }
//Converts Celsius to Fahrenheit
function fahrenheitConverter() {
  if (tempuratureChoice=="Celsius") {
    highTemp = (highTemp*(9/5));
    highTemp = (highTemp+32);
    setProperty("highLabel", "text", "High:\n" + Math.round(highTemp) + "°F");
    lowTemp = (lowTemp*(9/5));
    lowTemp = (lowTemp+32);
    setProperty("lowLabel", "text", "Low:\n" + Math.round(lowTemp) + "°F");
  }
  tempuratureChoice = "Fahrenheit";
}

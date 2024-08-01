// STEP 1: Copy the OWMGeocode and other OWM .js files into your website
// STEP 2: Enter your API key below (uncomment)
// STEP 3: Uncomment the resources for your website
// STEP 4: Write the load functions to perform each step
// STEP 5: Call the load1() function when the weather should load

//const APIKEY = "APIKEYHERE";
//let units = "imperial";

// RESOURCES (Uncomment for each .js file)
// let owmGeocode = new OWMGeocode(APIKEY);
// let owmWeather = new OWMWeather(APIKEY, units);
// let owmForecast = new OWMForecast(APIKEY, units);
// let owmPollution = new OWMPollution(APIKEY);


//    load1()  -->  load2()  -->  load3()
//     |             |             |
//     Get location  |             Display weather
//                   Get weather from location

function load1() {
    owmGeocode.city = getLocation(); // or load from a text box, etc.
    owmGeocode.request(load2); // link to second function
    
}

function load2(location) {
    if(location === undefined){
        owmWeather.lat = owmGeocode.getLat();
        owmWeather.lon = owmGeocode.getLon();
    }else{
        owmWeather.lat = location.coords.latitude;
    owmWeather.lon = location.coords.longitude;
    }
    
    owmWeather.request(load3); // link to third function
    
}

function load3() {
    const loc = document.getElementById("location");
    testLocation();
   

    

    const weatherReport = document.getElementById("weather-report");
    // See display.js for more examples
    weatherReport.innerHTML = `Weather report for ${owmWeather.json.name}: ${owmWeather.json.weather[0].description}`;
if(owmWeather.json.main.temp_max > 80){
    document.body.style.background =" red";
    document.getElementById("tshirt").style.visibility = "visible";
    document.getElementById("shorts").style.visibility = "visible";




}else if (owmWeather.json.main.temp_max > 70){



    document.body.style.background =" green";
    document.getElementById("shorts").style.visibility = "visible";
    document.getElementById("long").style.visibility = "visible";




} else if(owmWeather.json.main.temp_max > 50){
    document.body.style.background =" blue";
    document.getElementById("long").style.visibility = "visible";
    document.getElementById("pants").style.visibility = "visible";
    
}



displayForecast();
}



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(load2);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


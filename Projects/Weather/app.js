let weather = { 
    userId: "5e5043bc8f879449a103c97e8d452e5b",
    city: "",
    temp: "",
    icon: "",
    description: "",
    humidity:"" ,
    wind:""
};

// when document is ready, get default-city from local storage, then set and display
$(function () {
    if(localStorage.getItem("default-city") === null){
        // doesnt exist default-city make it Istanbul
        setWeather("Istanbul");
    }else{
        setWeather(localStorage.getItem("default-city"));
    } 
});

//send input by pressing Enter
$("#search-input").keypress((e)=>{
    if(e.key === "Enter")
        submitCity();
});

//click event
$("#submit").click(submitCity);

function submitCity(){
    setWeather($("#search-input").val());
    //clear value 
    $("#search-input").val("");
}

//set values of weather class, then display
function setWeather(city){
    // set city, then get values from API with respect to the city.
    weather.city = city;
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + weather.city + "&appid="+ weather.userId +"&units=metric";
    fetch(url).then(res=>{
        if(res.ok){
            return res.json();
        }else {
            throw new Error("Enter valid city name.");
        }
    }
    ).then(data=>{
        weather.temp = data.main.temp;
        weather.icon = data.weather[0].icon;
        weather.description = data.weather[0].description;
        weather.humidity = data.main.humidity;
        weather.wind = data.wind.speed;
        displayWeather();
    }).catch((err)=>alert(err));
}

// to display values
function displayWeather(){
    $("#city").text(`Weather in ${weather.city}`);
    $("body").css("background-image","url('https://source.unsplash.com/1600x900/?" + weather.city + "')");
    $("#temp").text(weather.temp +"° Celcius");
    $("#weathor-icon").attr("src","http://openweathermap.org/img/wn/"+ weather.icon +"@2x.png")
    $("#weather-description").text(weather.description);
    $(".humidity").text(`Humidity: ${weather.humidity}%`)
    $(".wind").text("Wind speed: " + weather.wind +" km/h");
    
    // set current city as a default 
    localStorage.setItem("default-city",weather.city);
}

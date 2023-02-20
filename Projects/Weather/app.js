let weather = { 
    userId: "bc8f879449a103c97e8d",
    city: "",
    temp: "",
    icon: "",
    description: "",
    humidity:"" ,
    wind:"",
    unit :{
        speed:"",
        temperature:""
    }
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

//event for radioes call setWeather function with city parameter 
$(".form-check-input").click(()=>setWeather(weather.city));

function submitCity(){
    setWeather($("#search-input").val());
    //clear value 
    $("#search-input").val("");
}

//set values of weather class, then display
function setWeather(city){
    // set city, then get values from API with respect to the city.
    weather.city = city;
    let unit = $(".form-check-input:checked").val();
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + weather.city + "&appid=5e5043"+ weather.userId +"452e5b&units="+ unit;
    fetch(url).then(res=>{
        console.log(res);
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
        if(unit === "metric"){
            weather.unit.speed = "meter/sec";
            weather.unit.temperature = "celcius";
        }else{
            weather.unit.speed = "miles/hour";
            weather.unit.temperature = "fahrenheit";
        }
        displayWeather();
    }).catch((err)=>alert(err));
}

// to display values
function displayWeather(){
    $("#city").text(`Weather in ${weather.city}`);
    $("body").css("background-image","url('https://source.unsplash.com/1600x900/?" + weather.city + "')");
    $("#temp").text(weather.temp +"° "+weather.unit.temperature);
    $("#weathor-icon").attr("src","http://openweathermap.org/img/wn/"+ weather.icon +"@2x.png")
    $("#weather-description").text(weather.description);
    $(".humidity").text(`Humidity: ${weather.humidity}%`)
    $(".wind").text("Wind speed: " + weather.wind +" "+ weather.unit.speed);
    
    // set current city as a default 
    localStorage.setItem("default-city",weather.city);
}

/* Time Section*/

function time(){
    let localTime = new Date().toLocaleTimeString(); // get local time as a string
    $("#time").text(localTime); // set value of time
}

setInterval(time,1000); // call every second



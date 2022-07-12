const key = 'cc3a92d941f18252d44a4bc748a34a79';

function getWeather() {
    const xhr = new XMLHttpRequest();
    var cityInput = document.getElementById("country");
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&lang=vi`, true);
    xhr.send();
    xhr.onload = () => {
        let data = JSON.parse(xhr.response);
        document.getElementById("cityName").innerHTML = data.name;
    }
}

function getWeather2() {
    var cityInput = document.getElementById("country").value;
    if (!cityInput.trim()) {
        alert("Please enter");
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}&lang=en`)  
        .then((response) => { 
            return response.json() 
        }) 
        .then((data) => {
            if (data.name === undefined) {
                alert("Không tồn tại");
            } else {
                var date = new Date(data.dt * 1000);
                var currentDate = moment(date).format('HH:mm a DD/MM/YYYY');
                
                document.getElementById("cityName").innerHTML = data.name + ' at ' + currentDate;
                document.getElementById("temp").innerHTML = Math.round((data.main.temp - 273.15) * 100) /100 + ' °C';
                document.getElementById("description").innerHTML = data.weather[0].description;
                document.getElementById("wind").innerHTML = 'Wind: ' +  data.wind.speed + ' m/s';
                document.getElementById("humidity").innerHTML = 'Humidity: ' + data.main.humidity + '%';

                var timezone = data.timezone;
                document.getElementById("sunrise").innerHTML = 'Sunrise: ' +  turnToHour(data.sys.sunrise, timezone);
                document.getElementById("sunset").innerHTML = 'Sunset: ' +  turnToHour(data.sys.sunset, timezone); 

                let main = data.weather[0].main;
                if (main === "Rain") {
                    document.getElementById("image").style.backgroundImage = "url('image/Rain-Background.jpg')";
                } else if (main === "Clouds") {
                    document.getElementById("image").style.backgroundImage = "url('image/cloud.webp')";
                } else {
                    document.getElementById("image").style.backgroundImage = "url('image/sun.jpg')";
                }
            }
            cityInput = "";
        })
        .catch((e) => {
            //alert("Error" + e)
        });
    }
}

function turnToHour(time, timezone) {
    return moment.utc(time,'X').add(timezone,'seconds').format('HH:mm a');
}

//hard coded API call with Lexington zip my key
// api.openweathermap.org/data/2.5/weather?zip=40502,&appid=d5f3a56c48b321f9643f548d57a655a8
//let weatherData = fetch('http://api.openweathermap.org/data/2.5/weather?zip=40502,&appid=d5f3a56c48b321f9643f548d57a655a8')

//get variables from html
const city = document.getElementById('city-name'),
    k = document.getElementById('tempK'),
    f = document.getElementById('tempF'),
    c = document.getElementById('tempC'),
    //icon = document.getElementById('weather-icon'),
    weather = document.getElementById('weather-type'),
    inputData = document.getElementById('input-box'),
    inputForm = document.getElementById('input-form'),
    btn = document.getElementById('button');

//make the button work
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var zip = inputData.value;
    if (zip.length != 5) {
        console.error('Not a zipcode');
        alert('not a zipcode');
        return;
    }
    getData(zip);

    });



//fetch request

function getData(zip) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=d5f3a56c48b321f9643f548d57a655a8`)
        .then(response => response.json())
        .then(data => {
            city.innerHTML = data.name;
            weather.innerHTML = data.weather[0].description;

            let imgUrl = "http://openweathermap.org/img/wn/10d@2x.png";

            let kelvinTemp = data.main.temp;

            k.innerHTML = kelvinTemp;
            f.innerHTML = Math.round((kelvinTemp - 273.15) * 9 / 5 + 32);
            c.innerHTML = Math.round(kelvinTemp - 273.15);
            
           let img = document.createElement("img");
           img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
           weather.appendChild(img);
        })
        .catch(function(err) {
            alert('Invalid Zip');
            city.innerHTML = "";
            console.log('Fetch problem: ' + err.message);
        })
    }
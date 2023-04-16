const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather"
  }

  const inputBox = document.querySelector('input');

inputBox.addEventListener('keypress', setQuery);

function setQuery(event){
    console.log("Key Pressed")
    console.log(event);
    if(event.keyCode === 13){  // 13 -> ASCII value of enter key
        getWeatherInfo(inputBox.value);
    }
}
function getWeatherInfo(cityName){
  console.log(`Fetching data from Open Weather map of ${cityName}`)
    const url = `${api.base}?q=${cityName}&units=metric&appid=${api.key}`;
    fetch(url).then((response)=>{
      console.log(response);
      return response.json();
    }).then((weatherInfo)=>{
      console.log(weatherInfo);
      if(weatherInfo.cod===200){
        displayResults(weatherInfo);
      }else{
        alert(weatherInfo.message);
      }
    }).catch((err)=>console.log(err));
  }
  
  function displayResults(weatherInfo){
    let now = new Date();
    
    document.querySelector('.city').textContent = `${weatherInfo.name},${weatherInfo.sys.country}`;
    document.querySelector('.temp').textContent =`${Math.round(weatherInfo.main.temp)}°c`;
    document.querySelector('.hi-low').textContent =`${Math.round(weatherInfo.main.temp_min)}°c/${Math.round(weatherInfo.main.temp_max)}°c`;
    document.querySelector('.weather').textContent =weatherInfo.weather[0].main;
    document.querySelector(".location .date").textContent = dateBuilder(now);

  }
  
function dateBuilder(d){
    // let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // let day = days[d.getDay()];
    // let date = d.getDate();
    // let month = months[d.getMonth()];
    // let year = d.getFullYear();
  
    const formatOptions = {
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric",
    };
    return d.toLocaleDateString("en-US",formatOptions);
  }
  getWeatherInfo('mumbai');
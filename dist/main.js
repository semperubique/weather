document.querySelector(".search-button").addEventListener("click",(async()=>{const t=await(async(t,e)=>{try{const n=`http://api.openweathermap.org/data/2.5/forecast?q=${e}&APPID=${t}&units=metric`,i=await fetch(n,{mode:"cors"});return{name:(a=await i.json()).city.name,today:{currentTemp:Math.round(a.list[0].main.temp),feelsLike:Math.round(a.list[0].main.feels_like),minTemp:Math.round(a.list[0].main.temp_min),maxTemp:Math.round(a.list[0].main.temp_max),humidity:Math.round(a.list[0].main.humidity),weatherDescription:a.list[0].weather[0].description,windSpeed:Math.round(3.6*a.list[0].wind.speed*100)/100}}}catch(t){console.log(t)}var a})("b902e8317058b2cac1e5f3c013a5fb95","London");console.log(t)}));
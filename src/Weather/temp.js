// https://api.openweathermap.org/data/2.5/weather?q=%20Ranchi%20&appid=cb3652e00f7d67d7ce6832bea6f57f64
import React, { useState, useEffect } from "react";
import './extradata.css';
import { RiSearchLine } from "react-icons/ri";

function Temp() {
  const [searchValue, setSearchValue] = useState("Ranchi");
  const [tempInfo, setTempInfo] = useState({});
  const currentdate = new Date().getDate();
  let daynum = new Date().getDay();
  let daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDay = daysInWeek[daynum];
  let Month = new Date().toLocaleString('en-us', { month: 'long' });
  const getWeatherInfo  = async () => {

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}+&units=metric&appid=9d135d971fea8e1f77225cab2120316f`

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } 
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  const [weatherState, setWeatheState] = useState("");
  const {
    temp,
    humidity,
    pressure,
    weathermood,
    name,
    speed,
    country,
    sunset,
  } = tempInfo;

  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeSt = `${date.getHours()}:${date.getMinutes()}`;
  
  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatheState("wi-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;
        case "Thunderstorm":
          setWeatheState("wi-day-thunderstorm");
          break;
        case "Rain":
          setWeatheState("wi-day-rain");
          break;
        case "Dizzle":{
          setWeatheState("wi-day-showers")
          break;
        }

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [weathermood]);

  return(
    <div className="wrap">
      <h1 className="H1">Weather Forecast</h1>
      <article className="weather">
        <div className="search">
          <input
            // <VscSearch/>
            type="search"
            placeholder="search cities"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            <RiSearchLine color='#fff'/>
          </button>
        </div>
        <div className="icons">
          <i className={`wi ${weatherState}`}></i>
          <div className="weatherCondition">{weathermood}</div>
        </div>
        

        <div className="weatherInfo">
          <div className="temperature">
            <div>{temp}&deg;C</div>
            
          </div>

          <div className="description">
            <div className="place">
              {name}, {country}
            </div>
          </div>
        <div className="date">{currentDay} {currentdate} {Month} </div>
        
        {/* <div className="extra-temp">
          <div className="temp-info-minmax info">
            <div className="two-sided-section">
              <p>
                <i className="wi wi-sunset"></i>
              </p>
              <p className="extra-info-leftside">
                {timeSt}Pm <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section info">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {humidity}%<br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {pressure}mbar
                <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section info">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {speed} km/h
                <br />
                Wind Speed
              </p>
            </div>
          </div>
        </div> */}
        </div>
        {/* <div className="date">{ctime}</div> */}
        <div className="extradata">
          <div className="sunset extraboxes">
          {timeSt}Pm
          <p>
          <i className="wi wi-sunset"></i>
          </p>
          Sunset
          </div>
          <div className="humidity extraboxes">
          {humidity}%
          <p>
          <i className={"wi wi-humidity"}></i>
          </p>
          Humidity
          </div>
          <div className="pressure extraboxes">
          {pressure}mbar
          <p>
          <i className={"wi wi-rain"}></i>  
          </p>
          Pressure
          </div>
          <div className="wind speed extraboxes">
          {speed} km/h
          <p>
          <i className={"wi wi-strong-wind"}></i> 
          </p>
          Wind Speed
          </div>
        </div>

        
      </article>
    </div>
  );
}

export default Temp;

import React, { Component } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdGpsFixed } from "react-icons/md";
import { WiCelsius } from "react-icons/wi";


import CitySearch from "./citySearchManually";

const apiKeys = {
  weatherKey : process.env.REACT_APP_WeatherKey,
  unsplash : process.env.REACT_APP_Unsplash,
}


class GetLocation extends Component {
  // setting state
  state = {
    areaName: "sialkot",
    country: "pakistan",
    temperatureC: undefined,
    humidity: undefined,
    description: "clear sky weather",
    sunrise: undefined,
    sunset: undefined,
    weatherIcon: "03n",
    weatherApiLink: `https://api.openweathermap.org/data/2.5/weather?q=lahore&appid=${apiKeys.weatherKey}&units=metric`,
    backgroundImage : "",
    backgroundImagetype : "weather"
  };

  // Get location from browser and update weather api links
  fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        weatherApiLink: `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKeys.weatherKey}&units=metric`,
      }, () => {
        this.fetchWeatherData();
      });
    });

  };

  // Get location manually and fetch weather data
  getSearchLocation = (value) => {
    const weatherApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKeys.weatherKey}&units=metric`;
    this.setState({
      weatherApiLink,
      value,
    }, () => {
      this.fetchWeatherData();
    })
  };

  // Call weather API from open weather
  fetchWeatherData = () => {
    fetch(this.state.weatherApiLink)
      .then((res) => res.json())
      .then((json) => {
        const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
        this.setState({
          weatherJson: json,
          areaName: json.name,
          country : regionNamesInEnglish.of(json.sys.country),
          temperatureC: Math.round(json.main.temp),
          humidity: json.main.humidity,
          description: json.weather[0].description,
          imageSearchQueryString : `${json.weather[0].description}`,
          showSearch: true,
          weatherIcon: json.weather[0].icon
        });
      }).catch(
        (error)=>{
          console.log(error)
        }
      );
      this.fetchBackgroundImage()
  };

  //fetch Background image
  fetchBackgroundImage = () => { 
    const backgroundImageUrl = `https://api.unsplash.com/search/photos?query=${this.state.description}&client_id=${apiKeys.unsplash}`
    fetch(backgroundImageUrl)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results[Math.floor(Math.random() * 21)].links.download)
        this.setState({
          backgroundImage : json.results[Math.floor(Math.random() * 10)].urls.regular
        })
            
      }).catch(
        (error)=>{
          console.log(error)
        }
      );;  
  };

  



  // Run fetch location code before page load
  componentDidMount() {
    this.fetchWeatherData();
  }

  render() {
    return (
      <div className="w-screen h-screen p-10 text-center bg-cover bg-center" style={{backgroundImage: `url(${this.state.backgroundImage})`}}> 
        <div className="shadow-2xl md:w-1/2 w-full mx-auto p-5  bg-white  bg-opacity-70 rounded-2xl">
          <div className="flex-wrap">
            <div className="flex justify-center">
              <CitySearch getSearchLocation={this.getSearchLocation} />
              <button onClick={this.fetchLocation}>
                <div className="flex flex-wrap justify-center text-2xl text-black pl-5">
                  <MdGpsFixed />
                  <span className="text-sm w-100 pl-1">
                    Get current
                    <br /> location
                  </span>
                </div>
              </button>
            </div>
            <div className="flex pt-10 justify-center text-2xl text-black mx-auto w-full">
              <span className="">
                <IoLocationSharp />
              </span>
              <span>
                {this.state.areaName !== undefined
                  ? `${this.state.areaName}, ${this.state.country}`
                  : `You need to enable location for app to run or type location manually`}
              </span>
            </div>
          </div>
          <div className="text-3xl justify-center text-black">
            <div className="flex flex-wrap justify-center pb-8">
              <img className="" src={`http://openweathermap.org/img/wn/${this.state.weatherIcon}@4x.png`} alt="weather icon"/>
            </div>
            <div className="flex justify-center w-full text-8xl">
              {this.state.temperatureC}
              <span className="p-0 m-0 flex absolute pl-5 ml-32">
                <WiCelsius />
              </span>
            </div>
            <div className="text-6xl w-full">{this.state.description}</div>
            <div className="text-lg">
              {`
          ${new Date().toLocaleString("en-US", { day: "2-digit" })}, 
          ${new Date().toLocaleString("en-US", { month: "long" })},
          ${new Date().getFullYear()}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
} 

export default GetLocation;

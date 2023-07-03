import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import Card from "../Card";
import logo from "../images/logo.png";
import { WeatherDetailsPayLoad } from "../type";
import WeatherDetails from "../WeatherDetails";
import "./Home.css";

interface UserLocation {
  latitude?: number;
  longitude?: number;
}

function Home() {
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetailsPayLoad>({
    name: "",
    main: { humidity: "", temp: "" },
    sys: { country: "", id: 0, sunrise: 0, sunset: 0 },
    weather: [{ description: "", icon: "", main: "" }],
    wind: { speed: 0 },
  });

  const [foreCastDetails, setForeCastDetails] = useState({
    list: [
      {
        dt_txt: "",
        main: { humidity: "", temp: "" },
        weather: [{ description: "", icon: "", main: "" }],
        wind: { speed: 0 },
      },
    ],
  });

  const [location, setLocation] = useState<UserLocation>({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const url = process.env.REACT_APP_OPENWEATHER_FORECAST_URL;
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      axios
        .get(
          `${url}lat=${location.latitude}&lon=${location.longitude}&cnt=5&appid=${apiKey}`
        )
        .then((response) => {
          setForeCastDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
        });
    }
  }, [location]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const url = process.env.REACT_APP_OPENWEATHER_URL;
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      axios
        .get(
          `${url}lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
        )
        .then((response) => {
          setWeatherDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location]);

  console.log(weatherDetails);
  console.log(foreCastDetails);
  let iconName = weatherDetails.weather[0]?.icon;
  let countryName = weatherDetails.sys?.country;
  let icon = `http://openweathermap.org/img/wn/${iconName}@2x.png`;
  const countryFlag = `http://openweathermap.org/images/flags/${countryName?.toLowerCase()}.png`;

  console.log("big");
  return (
    <div className="home-container">
      <div className="nav">
        <div
          style={{
            display: "flex",
            margin: "0",
            padding: "0",
          }}
        >
          <Image src={countryFlag} alt={"flag"} style={{ padding: "10px" }} />
          <span
            style={{ padding: "5px", fontSize: "20px", fontWeight: "bolder" }}
          >
            {weatherDetails.name}
          </span>
        </div>
        <div className="nav-logo">
          <Image src={logo} alt={"logo"} style={{ height: "70px" }} />
        </div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>

      <div className="weather-type">
        <div
          style={{
            width: "200px",
            height: "200px",
            margin: "auto",
          }}
        >
          <Image
            src={icon}
            alt={"icon"}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h3 style={{ fontSize: "20px" }}>
          {weatherDetails.weather[0]?.description}
        </h3>
      </div>
      <WeatherDetails
        wind={weatherDetails.wind?.speed}
        humidity={weatherDetails.main?.humidity}
        temp={weatherDetails.main?.temp}
        sunrise={weatherDetails.sys?.sunrise}
        sunset={weatherDetails.sys?.sunset}
      />
      <div className="card-container">
        <div className="ui three stackable cards">
          {foreCastDetails.list.map((info, index) => (
            <Card
              wind={info.wind?.speed}
              humidity={info.main?.humidity}
              temp={info.main?.temp}
              country={countryFlag}
              date={info.dt_txt}
              countryName={weatherDetails.name}
              description={info.weather[0]?.description}
              icon={info.weather[0]?.icon}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

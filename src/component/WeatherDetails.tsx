import React from "react";
import { BsSun } from "react-icons/bs";
import { SiWindicss } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import "./pages/Home.css";

type Props = {
  wind?: number;
  temp?: string;
  humidity?: string;
  sunrise: number;
  sunset: number;
};

function WeatherDetails(props: Props) {
  const { wind, temp, humidity, sunrise, sunset } = props;
  const diff =
    new Date(sunset * 1000).getTime() - new Date(sunrise * 1000).getTime();
  const sunHours = Math.round(diff / (60 * 60 * 1000));

  return (
    <div>
      <div className="weather-information">
        <div className="weather-sub-details">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SiWindicss
              fontSize={"15px"}
              style={{ margin: "10px", color: "gray" }}
            />
            <WiHumidity
              fontSize={"15px"}
              style={{ margin: "10px", color: "gray" }}
            />
            <BsSun
              fontSize={"15px"}
              style={{ margin: "10px", color: "gray" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{`${wind} Km/h`}</p>
            <p>{`${humidity}%`}</p>
            <p>{`${sunHours}h`}</p>
          </div>
        </div>
        <p style={{ fontSize: "50px" }}>{temp}K</p>
      </div>
    </div>
  );
}

export default WeatherDetails;

import React from "react";
import { SiWindicss } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import "./pages/Home.css";

type Props = {
  wind?: number;
  temp?: string;
  humidity?: string;
};

function CardWeatherDetails(props: Props) {
  const { wind, temp, humidity } = props;

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
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{`${wind} Km/h`}</p>
            <p>{`${humidity}%`}</p>
          </div>
        </div>
        <p style={{ fontSize: "25px" }}>{temp}K</p>
      </div>
    </div>
  );
}

export default CardWeatherDetails;

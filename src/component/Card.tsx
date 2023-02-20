import React from "react";
import { Image } from "semantic-ui-react";
import CardWeatherDetails from "./CardWeatherDetails";

type Props = {
  wind: number;
  temp: string;
  humidity: string;
  country: string;
  countryName?: string;
  date: string;
  description: string;
  icon: string;
};

function Card(props: Props) {
  const {
    wind,
    temp,
    humidity,
    country,
    countryName,
    date,
    description,
    icon,
  } = props;
  let iconName = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let foreCastDate = date;
  foreCastDate = date.replace(/:00$/, "");

  return (
    <div
      className="ui card"
      style={{
        background:
          "linear-gradient(to top right,black,black 70%,black 10%, rgb(66, 63, 63))",
      }}
    >
      <div className="content">
        <div className="description">
          <div className="card-top">
            <div
              style={{
                display: "flex",
                margin: "0",
                padding: "0",
              }}
            >
              <Image src={country} alt={"flag"} style={{ padding: "10px" }} />
              <span
                style={{
                  padding: "5px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {countryName}
              </span>
            </div>{" "}
            <p>{foreCastDate}</p>
          </div>
          <div>
            <div
              style={{
                width: "200px",
                height: "200px",
                margin: "auto",
              }}
            >
              <Image
                src={iconName}
                alt={"icon"}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h3 style={{ fontSize: "20px", color: "whitesmoke" }}>
              {description}
            </h3>
          </div>
        </div>
        <CardWeatherDetails wind={wind} humidity={humidity} temp={temp} />
      </div>
    </div>
  );
}

export default Card;

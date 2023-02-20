export type WeatherDetailsPayLoad = {
  name?: string;
  main: { humidity: string; temp: string };
  sys: { country: string; id: number; sunrise: number; sunset: number };
  weather: WeatherInfo[];
  wind: { speed: number };
};

type WeatherInfo = {
  description: string;
  icon: string;
  main: string;
};

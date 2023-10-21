import { FaTachometerAlt, FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WeatherModel } from "../models/weather_model";

type Props = {
  weather: WeatherModel;
};

const CurrentWeather = ({ weather }: Props) => {
  return (
    <div className="w-full h-full p-3 xl:p-10 flex flex-col items-center gap-4 rounded-3xl bg-primary-800/40">
      <div className="text-4xl xl:text-8xl">
        {weather.main.temp.toFixed(1)} °C
      </div>
      <div className="text-2xl xl:text-5xl">
        {weather.weather[0].description}
      </div>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo autem
        minus provident repudiandae aliquam? Similique magni recusandae quaerat
      </p>

      <div className="grid grid-cols-2 grid-rows-2 w-full gap-2 xl:p-0">
        <div className="w-full xt:p-4">
          <div className="bg-primary-900/50  aspect-square rounded-3xl p-4 flex flex-col gap-3">
            <div className="flex gap-2 text-md xl:text-xl">
              <FaTemperatureHigh /> FEELS LIKE
            </div>
            <p className="text-2xl xl:text-4xl">
              {weather.main.feels_like.toFixed(1)} °C
            </p>
            <p className="mt-auto">clear skies</p>
          </div>
        </div>
        <div className="w-full xl:p-4">
          <div className="bg-primary-900/50  aspect-square rounded-3xl p-4 flex flex-col gap-3">
            <div className="flex gap-2 text-md xl:text-xl">
              <FaTachometerAlt /> PREASURE
            </div>
            <p className="text-2xl xl:text-4xl">{weather.main.pressure}</p>
            <p className="mt-auto"></p>
          </div>
        </div>
        <div className="w-full xl:p-4">
          <div className="bg-primary-900/50  aspect-square rounded-3xl p-4 flex flex-col gap-3">
            <div className="flex gap-2 text-md xl:text-xl">
              <FaWind /> WIND
            </div>
            <p className="text-2xl xl:text-4xl">{weather.wind.speed} MPH</p>
            <p className="mt-auto"></p>
          </div>
        </div>
        <div className="w-full xl:p-4">
          <div className="bg-primary-900/50  aspect-square rounded-3xl p-4 flex flex-col gap-3">
            <div className="flex gap-2 items-center text-md xl:text-xl">
              <WiHumidity className="text-2xl xl:text-4xl" /> HUMIDITY
            </div>
            <p className="text-2xl xl:text-4xl">{weather.main.humidity} %</p>
            <p className="mt-auto"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

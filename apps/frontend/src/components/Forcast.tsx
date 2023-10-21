import dateFormat from "dateformat";
import {
  FaCalendarAlt,
  FaRegCalendar,
  FaRegCompass,
  FaWind,
} from "react-icons/fa";
import { GiLevelCrossing } from "react-icons/gi";
import {  WeatherModel } from "../models/weather_model";

type Props = {
  forcast: WeatherModel[];
  onSelect: (index: number) => void;
  selected: number;
};

const Forcast = ({ forcast, onSelect, selected }: Props) => {
  const selectedWeather = forcast[selected];

  const renderForcast = forcast.map((wt, index) => {
    return (
      <div key={index} className="h-full p1  xl:p-4">
        <div
          onClick={() => onSelect(index)}
          className={`cursor-pointer aspect-square rounded-3xl p-4 flex flex-col gap-3 items-center ${
            selected === index ? "bg-primary-700/70" : ""
          }`}>
          <div className="flex gap-2 text-sm xl:text-xl">
            <FaCalendarAlt /> {dateFormat(new Date(wt.dt * 1000), "UTC:h:MM")}
          </div>
          <p className="text-xs xl:text-xl">{wt.main.temp.toFixed(1)} °C</p>
          <p className="mt-auto w-12 aspect-square bg-primary-50 rounded-2xl">
            <img src={`icons/${wt.weather[0].icon}.png`} alt="" />
          </p>
        </div>
      </div>
    );
  });

  const renderSelected = selectedWeather && (
    <div className="flex flex-col xl:flex-row w-full gap-4">
      <div className="xl:w-1/2 bg-primary-900/50 rounded-xl flex flex-col p-4">
        <div className="flex gap-2 text-md xl:text-xl">
          <GiLevelCrossing /> LEVEL
        </div>
        <div className="flex items-center text-md xl:text-2xl flex-1">
          <div className="text-center flex-1">
            SEA
            <br />
            {selectedWeather.main.sea_level}
          </div>
          <div className="text-center flex-1">
            GRND
            <br />
            {selectedWeather.main.grnd_level}
          </div>
        </div>
      </div>
      <div className="xl:w-1/2 bg-primary-900/50 rounded-xl flex p-4">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex gap-2 text-md xl:text-xl">
            <FaWind /> WIND
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl xl:text-4xl">
              {selectedWeather.wind.speed}
            </span>
            <div>
              <div>MPH</div>
              <div>WIND</div>
            </div>
          </div>
          <div className="w-full border-b-2 border-primary-50"></div>
          <div className="flex items-center gap-2">
            <span className="text-xl xl:text-4xl">
              {selectedWeather.wind.gust}
            </span>
            <div>
              <div>MPH</div>
              <div>Guests</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2 justify-around">
          <FaRegCompass
            className={`text-4xl xl:text-8xl`}
            style={{ rotate: `${selectedWeather.wind.deg - 45}deg` }}
          />
          <p className="text-2xl xl:text-4xl">{selectedWeather.wind.deg} °</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-2 xl:p-10 flex flex-col items-center gap-4 rounded-3xl bg-primary-800/40">
      <div className="flex flex-col bg-primary-900/50 w-full p-2 xl:p-4 rounded-xl">
        <div className="text-xl flex gap-2 border-b-2 border-primary-50 w-full">
          <FaRegCalendar /> 5-DAY FORCAST
        </div>
        <div className="flex overflow-scroll">{renderForcast}</div>
      </div>
      {renderSelected}
    </div>
  );
};

export default Forcast;

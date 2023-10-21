import { useEffect, useState } from "react";
import image from "../assets/weather-background.jpg";
import CurrentWeather from "../components/CurrentWeather";
import Forcast from "../components/Forcast";
import Spinner from "../components/Spinner";
import { WeatherModel } from "../models/weather_model";
import { useGetForecatsQuery } from "../store";

const WeatherPage = () => {
  const { data, isLoading } = useGetForecatsQuery();

  const [selectedDay, setSelectedDay] = useState(-1);

  useEffect(() => {
    if (data && !isLoading) {
      setSelectedDay(0);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="w-100 h-100 m-auto flex gap-2 items-center">
        <Spinner /> Loading Weather
      </div>
    );
  }

  const forcast = data.data?.list as WeatherModel[];

  return (
    <div
      className="w-full min-h-fit text-white"
      style={{ background: `url(${image})` }}>
      <div className="w-full h-full flex flex-col xl:flex-row">
        <div className="xl:w-2/5 py-6 px-3 xl:ps-4 xl:pe-2 flex items-center justify-center">
          {(selectedDay > -1 && (
            <CurrentWeather weather={forcast[selectedDay]} />
          )) || <Spinner />}
        </div>
        <div className="xl:w-3/5 py-6 px-3 xl:pe-4 xl:ps-2">
          <Forcast
            forcast={data.data?.list || []}
            onSelect={setSelectedDay}
            selected={selectedDay}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;

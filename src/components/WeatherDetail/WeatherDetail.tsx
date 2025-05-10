import { FormatTemperature } from "../../helpers"
import style from './WeatherDetail.module.css'
import { Weather } from "../../hooks/useWeather"

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather} : WeatherDetailProps) {
  return (
    <div className={style.container}>
        <h2>
            Clima de: {weather.name}
        </h2>
        <p className={style.current}>
            {FormatTemperature(weather.main.temp).toFixed(1)}&deg;C
        </p>
        <div className={style.temperatures}>
            <p>Min: <span>
                        {FormatTemperature(weather.main.temp_max).toFixed(1)}&deg;C
                    </span>
            </p>
            <p>Max: <span>
                        {FormatTemperature(weather.main.temp_min).toFixed(1)}&deg;C
                    </span>
            </p>
        </div>
    </div>
  )
}

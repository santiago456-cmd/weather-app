import axios from "axios"
import {z} from 'zod'
import { SearchType } from "../types"
import { useMemo, useState } from "react"

//zod schema
const Weather =z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type Weather = z.infer<typeof Weather>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {
    
    const [weather, setWeather] = useState<Weather>(initialState)
    //spinner de carga
    const [loading, setLoading] = useState(false)

    //state que se activa al no encontrar una ciudad ingresada
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        setNotFound(false)
        setLoading(true)
        setWeather(initialState)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&&appid=${appId}`

            const {data} = await axios(geoUrl, {method: 'get'})

            //comprobar si existe 
            if (!data[0]) {
                setNotFound(true)
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weaUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            
            const {data: info} = await axios(weaUrl, {method: 'get'})
            
            //zod
            const result = Weather.safeParse(info)
            if (result.success) {
                setWeather(result.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return{
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}
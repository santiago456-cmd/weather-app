export const FormatTemperature = (temperature : number) : number => {
    const kelvin = 273.15
    return temperature - kelvin
}
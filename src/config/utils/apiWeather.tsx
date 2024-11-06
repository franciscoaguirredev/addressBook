import { OPENWEATHER_KEY } from '@env';

export async function getWeather (location: { latitude:number; longitude: number }){
    
    const {latitude, longitude} = location

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_KEY}&units=metric`)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon
        const iconURL =  `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        return { temperature, weatherDescription,iconURL }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }

}

import { ref } from "vue"

const API_KEY: string = import.meta.env.VITE_API_KEY as string

export default class WeatherAPI {
    city = ref<any>([])

    async fetchCity(city: string): Promise<void>{
        // Open weather api response to errors is status code 200 anyway
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${API_KEY}`)
        const json = await response.json()
        console.log(json)
        this.city.value = json
    }
}
<template>
    <div class="search">
        <input type="text" v-model="city">
        <button @click="getWeatherData">Search</button>
    </div>
    <main v-if="fetched">
        <div v-if="substractedCity.cod === '404'" class="not_found">
            <h1>City not found</h1>
        </div>
        <div v-else class="found">
            <div>City: <span>{{ substractedCity.name }}</span></div>
            <div>Temperature: <span>{{ substractedCity.main.temp }}</span></div>
            <div>Weather: <span>{{ substractedCity.weather[0].main }}</span></div>
            <div>Description: <span>{{ substractedCity.weather[0].description }}</span></div>
            <img :src="`https://openweathermap.org/img/wn/${substractedCity.weather[0].icon}@2x.png`" alt="Weather Icon">
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import WeatherAPI from './services/weather.ts'

    const weatherAPI = new WeatherAPI()
    const city = ref('');
    const substractedCity = ref<any>([])
    const fetched = ref(false)

    const getWeatherData = async(): Promise<void> =>{
        // Open weather api response to errors is status code 200 anyway
        await weatherAPI.fetchCity(city.value)
        substractedCity.value = weatherAPI.city.value
        fetched.value = true
    }
</script>
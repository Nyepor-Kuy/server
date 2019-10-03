const axios = require('axios')

function axiosFlight() {
    return axios.create({
        baseURL: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0`,
        headers: {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.FLIGHT_KEY}`
        }
    })
}

function axiosWeather() {
    return axios.create({
        baseURL: `https://api.stormglass.io/v1/weather/point`,
        headers: {
            "Authorization": `${process.env.WEATHER_KEY}`
        }
    })
}

function axiosEvent() {
    return axios.create({
        baseURL: `https://www.eventbriteapi.com/v3/events/search`,
        headers: {
            "Authorization": `Bearer ${process.env.EVENT_KEY}`
        }
    })
}

module.exports = {
    axiosFlight,
    axiosWeather,
    axiosEvent
}

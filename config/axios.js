const axios = require('axios')

const axiosFlight = axios.create({
        baseURL: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0`,
        headers: {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.FLIGHT_KEY}`
        }
    })


const axiosWeather = axios.create({
        baseURL: `https://api.stormglass.io/v1/weather`,
        headers: {
            "Authorization": `${process.env.WEATHER_KEY}`
        }
    })

const axiosEvent = axios.create({
        baseURL: `https://www.eventbriteapi.com/v3/events/search`,
        headers: {
            "Authorization": `Bearer ${process.env.EVENT_KEY}`
        }
    })

module.exports = {
    axiosFlight,
    axiosWeather,
    axiosEvent
}

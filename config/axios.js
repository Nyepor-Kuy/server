const axios = require('axios')

function axiosTrain() {
    return axios.create({
        baseURL: ``,
        headers: {

        }
    })
}

function axiosWeather() {
    return axios.create({
        baseURL: ``,
        headers: {

        }
    })
}

module.exports = {
    axiosTrain,
    axiosWeather
}

const { axiosFlight,  axiosWeather, axiosEvent } = require('../config/axios')

class PegiPegiController {

  static find ( req, res, next) {
    let promises = []
    let lat = null, lng = null, address = null
    let {originplace, destinationplace, outboundpartialdate} = req.body

    const library = {
      Jakarta: {
        airportcode: 'CGK-sky',
        lat: "-6.125556",
        lng: "106.655830",
        address: "jakarta"
      },
      Surabaya: {
        airportcode: 'SUB-sky',
        lat: "-7.374498502",
        lng: "112.785496858",
        address: "surabaya"
      }
    }

    for (let key in library) {
      if(key === destinationplace) {
        destinationplace = library[key].airportcode
        lat = library[key].lat
        lng = library[key].lng
        address = library[key].address
      }
      if(key === originplace) {
        originplace = library[key].airportcode
      }
    }

    let start_date = outboundpartialdate+'T00%3A00%3A00Z'

    promises.push(axiosWeather({
      method: 'get',
      url: `/point?lat=${lat}&lng=${lng}`
    }))

    promises.push(axiosFlight({
      method: 'get',
      url: `/ID/IDR/id-ID/${originplace}/${destinationplace}/${outboundpartialdate}`
    }))

    promises.push(axiosEvent({
      method: 'get',
      url: `?location.address=${address}`
    }))

    return Promise.all(promises)
    .then(response => {
     console.log(response)
     res.status(200).json({wether : response[0].data, flight : response[1].data, event : response[2].data})
    })
    .catch(next)
  }

}

module.exports = PegiPegiController
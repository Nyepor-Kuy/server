const { axiosFlight, axiosWeather, axiosEvent } = require('../config/axios')

class PegiPegiController {

  static find(req, res, next) {
    let promises = []
    let lat = null, lng = null, address = null
    let { originplace, destinationplace, outboundpartialdate } = req.body
    console.log({ originplace, destinationplace, outboundpartialdate })

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
      },
      Bandung: {
        airportcode: 'BDO-sky',
        lat: "-6.914744",
        lng: "107.609810",
        address: "bandung"
      },
      Bali: {
        airportcode: 'DPS-sky',
        lat: "-8.409518",
        lng: "115.188919",
        address: "bali"
      },
      Medan: {
        airportcode: 'KNO-sky',
        lat: "3.597031",
        lng: "98.678513",
        address: "medan"
      },
      Semarang: {
        airportcode: 'SRG-sky',
        lat: "-6.966667",
        lng: "110.416664",
        address: "semarang"
      },
      Palembang: {
        airportcode: 'PLM-sky',
        lat: "-2.990934",
        lng: "104.756554",
        address: "palembang"
      },
      Makassar: {
        airportcode: 'UPG-sky',
        lat: "-5.135399",
        lng: "119.423790",
        address: "makassar"
      },
      Lampung: {
        airportcode: 'TKG-sky',
        lat: "-5.450000",
        lng: "105.266670",
        address: "lampung"
      },
      Yogyakarta: {
        airportcode: 'YIA-sky',
        lat: "-7.797068",
        lng: "110.370529",
        address: "yogyakarta"
      }
    }

    for (let key in library) {
      if (key === destinationplace) {
        destinationplace = library[key].airportcode
        lat = library[key].lat
        lng = library[key].lng
        address = library[key].address
      }
      if (key === originplace) {
        originplace = library[key].airportcode
      }
    }
    // let start_date = outboundpartialdate+'T00%3A00%3A00Z'

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
      url: `?location.address=${address}&start_date.keyword=this_week`
    }))

    return Promise.all(promises)
      .then(response => {
        res.status(200).json({ weather: response[0].data, flight: response[1].data, event: response[2].data })
      })
      .catch(next)
  }

}

module.exports = PegiPegiController
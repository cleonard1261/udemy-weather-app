const request = require('request')
const mapKey = 'pk.eyJ1IjoidG9tYXNwaW5jaCIsImEiOiJja2t1NjVheXIxMjF5MnZwNnJzY2I1eXRzIn0.4dRJSUrpwy8zANdvBcSA0A';

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
        + address 
        + '.json?access_token='
        + mapKey
        + '&limit=1'
    
    console.log(url)

    request({ url: url, json: true }, (error, response) => {
        //console.log(response.body.features.center)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
const request = require('request')
const api_key = '724a6b0d7155f15f17d1ca834d82fb47';

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?'
        +'access_key='
        + api_key
        +'&query=' 
        + latitude + ',' 
        + longitude 
        + '&units=f'
    
    //console.log(url)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] 
                + ". It is currently " 
                + response.body.current.temperature 
                + " degrees out.")
        }
    })
}

module.exports = forecast
const request = require('request')
// 09c65ecdbc12e3315f1fc29ad22beee3
const forecast = (latitude, longitude, callback) => {
    // const url = 'https://api.darksky.net/forecast/09c65ecdbc12e3315f1fc29ad22beee3/' + latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=09c65ecdbc12e3315f1fc29ad22beee3&query=' + latitude + ',' + longitude
    console.log('rec: url:'+ url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location: Code: '+ body.code + ' Error: ' + body.error, undefined)
        } else {
          callback(undefined, body.current.weather_descriptions+'. It is currently '+body.current.temperature+' degrees out. There is a '+ body.current.precip + '% chance of rain.')
          // callback(undefined, body.daily.data[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast
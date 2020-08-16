const request = require('request')
const key = 'pk.eyJ1IjoiZGhtbSIsImEiOiJja2N4ZGV3bjAwbWtjMnRzMXJ3dDBvMnFkIn0.XUP__RuLfS5HYNCdRp6xYg'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token='+key+'&limit=1'

    request({ url, json: true }, (error, { body }) => {
        console.log(' passed arg:'+ address.length)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (address.length < 2) {
            callback('Unable to find location with 1 Character.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
// geocode(address, (err, { latitude, longitude, place_name: location }) => {

// geocode('cairo', () => {
//   console.log('callack....'+latitude+' long:'+longitude+' loc:'+ location)
// } )

module.exports = geocode
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0303ccea982c71e88ca4911e739c5acc&query=' + latitude + ',' + longitude 

    request({ url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect weather services.', undefined)
        }else if(response.body.error){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, response.body.current.temperature)
        }
    })
}

module.exports = forecast
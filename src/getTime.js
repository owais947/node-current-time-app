const request = require('postman-request')

const getTime = (longitude, latitude, callback) => {
    const url = 'http://api.timezonedb.com/v2.1/get-time-zone?format=json&by=position&key=FR435HLEODD1&lat=' + latitude + '&lng=' + longitude

    request({url : url, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to getTime.', undefined)
        }
        else if(response.body.length === 0){
            callback('Unable to find location time.', undefined)
        }
        else {
            callback(undefined, {
                location : response.body.cityName,
                current_time : response.body.formatted
            })
        }
    })
}


module.exports = getTime
const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=20037e5f798272cc2d96a61ea7d9cc28&query=' + lat+ ',' + lon
    // here is distruction of object
    //request({url: url, json: true}, (error, response)=> { 
    request({url, json: true}, (error, {body})=> {
        if(error){
            callback('unable to connect', undefined)
        //}else if (response.body.error){
        }else if (body.error){
            callback('couldnt find location')
        }
        else{
        //    callback(undefined, response.body.current.weather_descriptions[0] +". It's currently " +response.body.current.temperature+ " dgrees out. It feels like "+response.body.current.feelslike+" degrees out.")
        callback(undefined, body.current.weather_descriptions[0] +". It's currently " +body.current.temperature+ " dgrees out. It feels like "+body.current.feelslike+" degrees out.")
            }
   
    })
}

module.exports = forecast

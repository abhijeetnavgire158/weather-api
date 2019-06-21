const request = require('request');

const url = 'https://api.darksky.net/forecast/67a710b619afee0831361c8a84125c17/{searchtext}';

const forecast = (latitude, longitude, callback) => {
    let finalUrl = url.replace('{searchtext}', latitude + ',' + longitude);
    request({url: finalUrl, json: true}, (error, response, body) => {
        if (error) {
            callback('unable to connect to the server');
        } else if (body.error) {
            callback('unable to find location');
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                rainProbability: body.currently.precipProbability,
                summary: body.currently.summary
            });
        }
    });
};

module.exports = forecast;

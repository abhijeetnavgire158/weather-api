
const request = require('request');
const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{searchtext}.json?access_token=pk.eyJ1IjoiYW5zaHN5c3RlbXMxNTYiLCJhIjoiY2p4MzVmZDhtMDdiNzQ4bXVnMmkwbjU3diJ9.ZkUDOXJw_bdqAv0md0y9pg&limit=1'

const geocode = function(searchText, callback) {
    let url = geoUrl.replace('{searchtext}', encodeURIComponent(searchText));
    request({url: url,json: true}, function(error, response, body) {
        if (error) {
            callback('unable to connect to the server');
        } else if (body.features.length === 0) {
            callback('unable to find the location geo');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name,
                latlong: body.features[0].center.reverse().join(',')
            });
        }
    });
};

module.exports = geocode;
const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9yZXJvcm9uIiwiYSI6ImNrMjY1YjlsdTJwY3EzbnF0YXhiN2l4ODIifQ.wpMnH7OKc8rrwdKrKu4jog&limit=1`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location sevice', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. try another search', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                lantitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
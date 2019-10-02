const getLocation = require('../services/maps-api');
const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  const { address } = req.body;

  if(!address) {
    return next({
      statusCode: 400,
      error: 'address is required'
    });
  }

  getLocation(address) 
    .then(location => {
      if(!location) {
        throw {
          statusCode: 400,
          error: 'address must be resolvable to geolocation'
        };
      }

      req.body.location = location;

      return getForecast(location.latitude, location.longitude)
        .then(forecast => {
          res.json(forecast);
        });
    })
    .catch(next);
};
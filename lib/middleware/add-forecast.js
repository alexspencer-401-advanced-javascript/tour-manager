const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  const { location } = req.body;

  if(!location) {
    return next({
      statusCode: 400,
      error: 'address is required'
    });
  }

  getForecast(location.latitude, location.longitude)
    .then(forecast => {
      
      req.body.weather = forecast[0];
      next();
    })
    .catch(next);
};
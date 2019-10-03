// eslint-disable-next-line new-cap
const router = require('express').Router();
const Stop = require('../models/stop');
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');
const addForecast = require('../middleware/add-forecast');

router
  .post('/:id', addGeo(), addForecast(), (req, res, next) => {
    Stop.create(req.body) 
      .then(stop => {
        res.json(stop);
        Tour.findByIdAndUpdate(req.params.id, { $push: { stops: stop._id } }, { new: true })
          .then(updatedTour => updatedTour);
      })
      .catch(next);
  })
  .delete('/:id', addGeo(), addForecast(), (req, res, next) => {
    Stop.create(req.body) 
      .then(stop => {
        res.json(stop);
        Tour.findByIdAndUpdate(req.params.id, { $push: { stops: stop._id } }, { new: true })
          .then(updatedTour => {
            res.json(updatedTour);
            console.log(updatedTour);
            Stop.findByIdAndRemove(req.params.id)
              .then(deletedStop => {
                res.json(deletedStop);
              })
              .catch(next);
          });
      });
  });

module.exports = router;
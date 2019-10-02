// eslint-disable-next-line new-cap
const router = require('express').Router();
const Stop = require('../models/stop');
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');

router
  .post('/:id', addGeo(), (req, res, next) => {
    console.log(req.body); 
    Stop.create(req.body) 
      .then(stop => {
        res.json(stop);
        Tour.findByIdAndUpdate(req.params.id, { $push: { stops: stop._id } }, { new: true })
          .then(updatedTour => {
            console.log(updatedTour);
          });
      })
        
      .catch(next);
  });
  // .get('/', (req, res, next) => {
  //   Stop.find()
  //     .then(stops => res.json(stops))
  //     .catch(next);
  // });

module.exports = router;
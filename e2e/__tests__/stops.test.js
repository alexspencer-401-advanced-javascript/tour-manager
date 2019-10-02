const request = require('../request');
const db = require('../db');

describe('stops api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('tours'),
      db.dropCollection('stops')
    ]);
  });

  const tourModel = {
    title: 'Star Tours',
    activities: ['Tatooine Bar Hop', 'Hoth Battle', 'Coruscant Political Tour']
  };

  const stopModel = {
    address: '80447'
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a stop', () => {
    return postTour(tourModel)
      .then(tour => {
        return request
          .post(`/api/stops/${tour._id}`)
          .send(stopModel)
          .expect(200)
          .then(({ body }) => {
            console.log(body);
          });
        
      });
  });
});

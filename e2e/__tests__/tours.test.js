const request = require('../request');
const db = require('../db');

describe('tours api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const tourModel = {
    title: 'Star Tours',
    activities: ['Tatooine Bar Hop', 'Hoth Battle', 'Coruscant Political Tour']
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a tour', () => {
    return postTour(tourModel).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          __v: 0,
          launchDate: expect.any(String),
          activities: expect.any(Array),
          stops: expect.any(Array)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "activities": Any<Array>,
          "launchDate": Any<String>,
          "stops": Any<Array>,
          "title": "Star Tours",
        }
      `
      );
    });
  });
});

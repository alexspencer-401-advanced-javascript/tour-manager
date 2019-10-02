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
  it('gets all tours', () => {
    return Promise.all([
      postTour(tourModel),
      postTour(tourModel),
      postTour(tourModel)
    ])
      .then(() => {
        return request.get('/api/tours').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            __v: 0,
            launchDate: expect.any(String),
            stops: expect.any(Array)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "activities": Array [
              "Tatooine Bar Hop",
              "Hoth Battle",
              "Coruscant Political Tour",
            ],
            "launchDate": Any<String>,
            "stops": Any<Array>,
            "title": "Star Tours",
          }
        `
        );
      });
  });
});

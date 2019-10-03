jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

const request = require('../request');
const db = require('../db');

getLocation.mockResolvedValue({
  latitude: 45,
  longitude: -133
});

getForecast.mockResolvedValue([
  {
    time: '2019-10-02T07:00:00.000Z',
    forecast: 'Possible drizzle overnight.',
    high: 63.29,
    low: 47.07
  },
  {
    time: '2019-10-03T07:00:00.000Z',
    forecast: 'Cloudy with snow at high elevations.',
    high: 50.89,
    low: 38.13
  }
]);

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
    return postTour(tourModel).then(tour => {
      return request
        .post(`/api/stops/${tour._id}`)
        .send(stopModel)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              __v: 0
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "location": Object {
                "latitude": 45,
                "longitude": -133,
              },
              "weather": Object {
                "forecast": "Possible drizzle overnight.",
                "time": "2019-10-02T07:00:00.000Z",
              },
            }
          `
          );
        });
    });
  });
  // it('deletes a stop', () => {
  //   return postTour(tourModel).then(tour => {
  //     return request
  //       .post(`/api/stops/${tour._id}`)
  //       .send(stopModel)
  //       .expect(200)
  //       .then(() => {
  //         return request
  //           .delete();
  //       });
  // });
  // });
});

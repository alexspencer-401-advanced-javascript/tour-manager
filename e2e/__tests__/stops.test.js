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
                "latitude": 40.3053839,
                "longitude": -105.8290298,
              },
              "weather": Object {
                "forecast": "Windy until evening.",
                "time": "2019-10-02T06:00:00.000Z",
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

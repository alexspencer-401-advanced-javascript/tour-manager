# LAB - 12

## Tour Manager

### Author: Alex Spencer

### Links and Resources
* [submission PR](https://github.com/alexspencer-401-advanced-javascript/tour-manager/pull/1)
* [travis](https://travis-ci.com/alexspencer-401-advanced-javascript/tour-manager/builds/130119342)
* [back-end](https://alex-tour-manager.herokuapp.com)

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app

- Scripts:
   * "lint": "eslint .",
   * "pretest": "npm run lint",
   * "jest": "jest --runInBand --verbose",
   * "test": "npm run jest",
   * "test:coverage": "npm run test -- --coverage",
   * "test:watch": "npm run jest -- --watchAll",
   * "test:verbose": "npm run test -- --verbose",
   * "start": "node server.js",
   * "start:watch": "nodemon server.js"

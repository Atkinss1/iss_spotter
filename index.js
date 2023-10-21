const { nextISSTimesForMyLocation, printPassTimes} = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn\'t work!', error);
  }
  // looping through each item in the object and converting unix time to a date
  printPassTimes(passTimes);
});
const { nextISSTimesForMyLocation, unixConversionPacific} = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn\'t work!', error);
  }
  // looping through each item in the object and converting unix time to a date
  for (const rotation of passTimes) {
    let myDate = unixConversionPacific(rotation);
    console.log(`Next pass at ${myDate} for ${rotation.duration} seconds!`);
  }
});
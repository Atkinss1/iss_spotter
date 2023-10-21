const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');
// fetchMyIP takes in the local IP address of user from an API request
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('That didn\'t work!', error);
//     return;
//   } // returns IP in message
//   console.log('It worked! Returned IP: ', ip);
// });

// // test IP for functionality testing
// fetchCoordsByIP('96.52.110.15', (error, coordinates) => {
//   if (error) {
//     console.log(error, null);
//     return;
//   }
//   console.log('It worked! Return coordinates: ', coordinates);
// });

// fetchISSFlyOverTimes takes in coords of user from an API request and determines when the ISS will fly over their location and duration of visibility
// fetchISSFlyOverTimes({ longitude: -113.4909267, latitude: 53.544389 }, (error, passTimes) => {
//   if (error) {
//     console.log(error, null);
//   }
//   console.log('It worked! Returned flyover times: ', passTimes);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn\'t work!', error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
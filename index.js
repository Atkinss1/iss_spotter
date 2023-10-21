const { fetchMyIP, fetchCoordsByIP } = require('./iss');
// fetchMyIP takes in the local IP address of user from an API request
fetchMyIP((error, ip) => {
  if (error) {
    console.log('That didn\'t work!', error);
    return;
  } // returns IP in message
  console.log('It worked! Returned IP: ', ip);
});

// test IP for functionality testing
fetchCoordsByIP('96.52.110.15', (error, coordinates) => {
  if (error) {
    console.log(error, null);
    return;
  }
  console.log('It worked! Return coordinates: ', coordinates);
});

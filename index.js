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
fetchCoordsByIP('96.52.110.15'
  , (error, data) => {
    if (error) {
      console.log(error);
      return;
    } // Parse through JSON file that was requested by IP API
    data = JSON.parse(data);
    // filtering JSON for longitude and latitude
    const latitude = data.latitude;
    const longitude = data.longitude;
    console.log({
      latitude: latitude,
      longitude: longitude
    });
  });


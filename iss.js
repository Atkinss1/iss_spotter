const request = require('request');
/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const fetchMyIP = function(callback) {
  // IP fetching API url
  const myIP = 'https://api.ipify.org?format=json';
  request(myIP, (error, response, body) => {
    // if statusCode is not 200, deliver a message
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    if (error) {
      callback(error, 'That didn\'t work!');
      return;
    }
    // filter JSON for IP variable
    const data = JSON.parse(body).ip;
    callback(null, data);
  });
};


/*
 * fetchCoordsByIP
 * takes in an IP address and returns the latitude and longitude for it.
 */

const fetchCoordsByIP = function(ip, callback) {
  
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    // if statusCode throws an error, deliver a message
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching coords. Response: ${body}`));
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    // check for invalid IP
    if (!data.success) {
      console.log(`Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`);
      return;
    }
    // filter JSON file for longitude/latitude
    const { longitude, latitude } = data;

    callback(null, {longitude, latitude});
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};
  
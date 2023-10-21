const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const fetchMyIP = function(callback) {
  const myIP = 'https://api.ipify.org?format=json';
  request(myIP, (error, response, body) => {
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    if (error) {
      callback(error, 'That didn\'t work!');
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);
  });
};

module.exports = fetchMyIP;
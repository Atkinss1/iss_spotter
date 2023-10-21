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
    const data = JSON.parse(body);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    if (error) {
      callback(null, 'That didn\'t work!');
      return;
    }
    callback(null, data);
  });
};

module.exports = fetchMyIP;
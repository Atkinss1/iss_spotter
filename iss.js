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
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


/**
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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  // API request for ISS fly over times depending on coords of user
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    // check for statusCode errors
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching flyover times. Response: ${body}`), null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    } // filter JSON file and filter for risetime and duration ISS will be visible
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return (error, null);
      
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return (error, null);
        
      }
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passTimes);
      });
    });
  });
};
/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

module.exports = {
  nextISSTimesForMyLocation,
  printPassTimes
};
  
'use strict';

const axios = require('axios');
const get = require('lodash.get');
const { getAppAccessToken } = require('./auth');
const config = require('./config');

const chooseRandomItem = array => array[Math.floor(Math.random() * array.length)];

module.exports.handler = async (event) => {
  var numStreams = process.env.DEFAULT_NUMBER_OF_STREAMS;
  if (get(event, 'queryStringParameters.numberOfStreams')) {
    numStreams = get(event, 'queryStringParameters.numberOfStreams');
    if (numStreams >= 100) {
      return {statusCode: 400, message: 'Client Error: numberOfStreams greater than 99.'};
    }
  }
  var url = `${config.twitchApi}/streams?first=${numStreams}`;
  const appAccessToken = await getAppAccessToken();
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${appAccessToken}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID,
    }
  });

  if (response.status !== 200) {
    return {statusCode: 500, message: 'Internal Error'};
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      stream: chooseRandomItem(response.data.data)
    }, null, 2),
  };

};

'use strict';

const axios = require('axios');

const chooseRandomItemFromArray = array => array[Math.floor(Math.random() * array.length)];

module.exports.handler = async (event) => {
  
  return {
    statusCode: 200,
    body: JSON.stringify({stream: chosenStream}, null, 2),
  };
};

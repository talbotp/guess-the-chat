const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const axios = require('axios');
const config = require('./config');

const generateAppAccessToken = async () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const url = `${config.twitchAuthApi}/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
  const response = await axios.post(url);
  if (response.status === 200) {
    return {
      accessToken: response.data.access_token,
      expiresAt: response.data.expires_in
    }
  } 
};

const storeAppAccessToken = async accessTokenData => {
  const params = {
    TableName: config.twitchTokensTable,
    Item: {
      token_type: {S: 'app_access_token'},
      token: {S: accessTokenData.accessToken},
      expires_at: {N: (Date.now() + accessTokenData.expiresAt * 500).toString()}    // Use 500 instead of 1000 to underestimate the number of ms in a second.
    }
  };
  await dynamodb.putItem(params).promise();
};

const getAppAccessToken = async () => {
  const params = {
    TableName: config.twitchTokensTable,
    Key: {
      token_type: {S: 'app_access_token'}
    }
  };
  const tokenData = await dynamodb.getItem(params).promise();
  if (!Object.keys(tokenData).length || Date.now() > parseInt(tokenData.Item.expires_at.N)) {
    const accessTokenData = await generateAppAccessToken();
    await storeAppAccessToken(accessTokenData);
    var accessToken = accessTokenData.accessToken;
  } else {
    var accessToken = tokenData.Item.token.S;
  }
  return accessToken;
};

module.exports = {
  getAppAccessToken,
}

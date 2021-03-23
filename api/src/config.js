const config = {
  twitchApi: 'https://api.twitch.tv/helix',
  twitchAuthApi: 'https://id.twitch.tv/oauth2',
  twitchTokensTable: process.env.TWITCH_TOKENS_TABLE,
};

module.exports = config;

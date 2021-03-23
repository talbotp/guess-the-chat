const config = {};

if (process.env.NODE_ENV === 'development') {
  config.api = 'http://localhost:3030/prod';
} else if (process.env.NODE_ENV === 'production') {
  config.api = 'https://api.guessthechat.com';
}

export default config;

const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
  host: 'redis', // by docker-compose networking
  port: 6379,
});
client.set('visits', 0);

app.get('/', (_, res) => {
  process.exit(0);
  client.get('visits', (_, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8080, () => {
  console.log('http://localhost:8080');
});

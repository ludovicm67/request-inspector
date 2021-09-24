import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyRateLimit from 'fastify-rate-limit';

// get configuration from environment variables
const port = process.env.SERVER_PORT || 8080;
const host = process.env.SERVER_HOST || '0.0.0.0';
const rateLimitNumber = process.env.RATE_LIMIT_NUMBER || 100;
const rateLimitPeriod = process.env.RATE_LIMIT_PERIOD || '5 minutes';

// initialize server and add some rate-limiting
const server = fastify();
server.register(fastifyCors);
server.register(fastifyRateLimit, {
  max: parseInt(`${rateLimitNumber}`, 10),
  timeWindow: rateLimitPeriod,
});

// health check endpoint
server.get('/healthz', async () => 'OK\n');

server.get('*', (req, res) => {
  const date = new Date();
  const {
    headers, method, url,
  } = req;
  console.log(`\n\n[${date.toISOString()}]\t${method}\t${url}:`);
  console.log('Headers:', headers);
  res.send('OK\n');
});

// start the server
server.listen(port, host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

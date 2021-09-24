import fastify, { FastifyReply, FastifyRequest } from 'fastify';
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

/**
 * Inspect a Fastify request and print details in the console.
 *
 * @param req Fastify request
 * @param res Fastify reply
 */
const inspectRequest = (req: FastifyRequest, res: FastifyReply) => {
  const date = new Date();
  const {
    headers, method, url, body,
  } = req;

  console.log(`\n\n[${date.toISOString()}]\t${method}\t${url}:`);
  console.log('Headers:', headers);
  console.log('Body:', body);

  res.send('OK\n');
};

// health check endpoint
server.get('/healthz', async () => 'OK\n');

// inspect basic methods
server.delete('*', inspectRequest);
server.get('*', inspectRequest);
server.patch('*', inspectRequest);
server.post('*', inspectRequest);
server.put('*', inspectRequest);

// start the server
server.listen(port, host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

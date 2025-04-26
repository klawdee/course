
import * as f from 'fastify'

import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import fAuth from '@fastify/auth';

import route from './routes/routes'

const app = f.fastify({
    logger: true,
})

// Register @fastify/cookie
app.register(fCookie, {
  secret: 'some-secret-key', // Use environment variables in production
  hook: 'preHandler',
});

// Register @fastify/jwt
app.register(fjwt, {
  secret: 'supersecretcode-CHANGE_THIS-USE_ENV_FILE', // Use environment variables in production
});


app.register(fp(fAuth));

// Decorate the Fastify instance with an authentication function
app.decorate(
  'authenticate',
  async (req: f.FastifyRequest, reply: f.FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.status(401).send({ message: 'Authentication required' });
    }
  }
)

app.register(route)

export default app
// src/types/global.d.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { JWT } from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
    user?: { id: string; email: string; name: string };
  }
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
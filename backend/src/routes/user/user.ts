import { FastifyInstance } from "fastify";
import * as handler from "./handlers";
import * as val from "./val";

const route = async (fastify: FastifyInstance) => {
  fastify.post("/login", { schema: val.create }, handler.login);
  fastify.get("/getAll", { preHandler: fastify.authenticate }, handler.getAll);
  fastify.get(
    "/getById/:id",
    { preHandler: fastify.authenticate },
    handler.getById
  );
  fastify.post(
    "/create",
    {  schema: val.create },
    handler.create
  );
  fastify.patch(
    "/patch/:id",
    { preHandler: fastify.authenticate, schema: val.update },
    handler.patchById
  );
  fastify.patch(
    "/patch/password/:id",
    { preHandler: fastify.authenticate, schema: val.updatePassword },
    handler.patchPassowrdById
  );
  fastify.delete(
    "/delete/:id",
    { preHandler: fastify.authenticate },
    handler.deleteById
  );
};

export default route;

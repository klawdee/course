import { FastifyInstance } from "fastify";
import * as userCrud from "./handlers";
import * as val from "./val";

const route = async (fastify: FastifyInstance) => {
  fastify.post("/login", { schema: val.create }, userCrud.login);
  fastify.get("/getAll", { preHandler: fastify.authenticate }, userCrud.getAll);
  fastify.get(
    "/getById/:id",
    { preHandler: fastify.authenticate },
    userCrud.getById
  );
  fastify.post(
    "/create",
    { preHandler: fastify.authenticate, schema: val.create },
    userCrud.create
  );
  fastify.patch(
    "/patch/:id",
    { preHandler: fastify.authenticate, schema: val.update },
    userCrud.patchById
  );
  fastify.patch(
    "/patch/password/:id",
    { preHandler: fastify.authenticate, schema: val.updatePassword },
    userCrud.patchPassowrdById
  );
  fastify.delete(
    "/delete/:id",
    { preHandler: fastify.authenticate },
    userCrud.deleteById
  );
};

export default route;

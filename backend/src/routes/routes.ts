import { FastifyInstance } from "fastify";
import user from './user/user'


const route = async (fastify: FastifyInstance) => {
    fastify.register(user, { prefix: "/user" })
}


export default route
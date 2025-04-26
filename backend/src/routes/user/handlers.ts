import { Model } from "sequelize";
import { FastifyReply, FastifyRequest } from "fastify";

import * as dbModel from '../../models/models'
import * as dbType from '../../types/db'
import app from '../../server'

export const login =  async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, name, password } = request.body as {
      email: string;
      name: string;
      password: string;
    };

    const user = await dbModel.user.findOne({
      where: { email: email, name: name, password_hash: password },
    });

    if (user) {
      const token = app.jwt.sign({ user });
      reply.cookie("access_token", token, { path: "/", httpOnly: true });
      reply.send({ token });
    } else {
      reply.status(404).send({ message: "User not found" });
    }
}

interface user {
    email: string,
    name: string,
    password: string
}

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password } = request.body as user 

    let user: dbType.userCreationAttributes = {
        email: email,
        name: name,
        password_hash: password
    }

    await dbModel.user.create(user)
    reply.send({ message: "user was successfully created" }).code(201)
}

export const patchById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email } = request.body as dbType.user
    const { id } = request.params as dbType.paramsId

    let user: dbType.user = {
        email: email,
        name: name,
    }

    await dbModel.user.update(user, { where: { id: id } })
    
    reply.send({ message: "user was successfully updated"}).code(200)
}

export const patchPassowrdById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as dbType.paramsId
    const { password } = request.body as dbType.userUpdatePassword

    await dbModel.user.update({ password_hash: password }, { where: { id: id } })
    
    reply.send({ message: "user was successfully updated"}).code(200)
    
}

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    let users: Model<dbType.user, dbType.userCreationAttributes>[] | null = await dbModel.user.findAll()

    reply.send({users: users}).code(200)
}

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as dbType.paramsId

    let user: Model<dbType.user, dbType.userCreationAttributes> | null = await dbModel.user.findByPk(id)
    if (!user) {
        reply.send({ message: "not found"}).code(404)
    }
    
    reply.send(user).code(200)
}

export const deleteById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as dbType.paramsId
    await dbModel.user.destroy({ where: { id: id } })
    reply.send({ message: "successfully deleted"}).code(200)
    
}
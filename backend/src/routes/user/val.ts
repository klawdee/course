import { Optional } from "sequelize";
import { user } from "../../types/db";

export const create = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      name: { type: "string" },
      password: { type: "string" },
    },
    required: ["email", "name", "password"],
  },
};

export const update = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      name: { type: "string" },
    },
  },
};


export const updatePassword = {
  body: {
    type: "object",
    properties: {
      password: { type: "string" },
    },
    required: [ "password" ]
  },
};

export interface UserCreationAttributes extends Optional<user, 'id'> {}
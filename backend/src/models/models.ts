import { CreateOptions, DataTypes, Model } from "sequelize";
import * as bcrypt from 'bcrypt';
import db from "../repository";
import * as db_type from "../types/db";
import * as appTypes from "../types/types";

export const user = db.define<Model<db_type.user, db_type.userCreationAttributes>>(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
);

export const permission = db.define<
  Model<db_type.permissionAttributes, db_type.permissionCreationAttributes>
>("permission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  body: {
    type: DataTypes.ENUM(...Object.values(appTypes.role)), // Use the enum values
    allowNull: false,
  },
});

// Define the one-to-many relationship
user.hasMany(permission, {
  foreignKey: 'userId',
  as: 'permission',
});

permission.belongsTo(user, {
  foreignKey: 'userId',
  as: 'user', 
});
import { DataTypes, Model } from 'sequelize'
import db from '../repository'
import * as db_type from '../types/db'

export const user = db.define<Model<db_type.user, db_type.userCreation>>('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Choice extends Model {}

Choice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        choice: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }, 
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'question',
                key:'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'choice'
    }
);


module.exports = Choice;
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        this_question_ans: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            references: {
                model: 'this_question',
                key:'id'
            }
        },
        that_question_ans: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            references: {
                model: 'that_question',
                key: 'id'
            }
        }
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
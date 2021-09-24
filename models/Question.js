const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Question extends Model {}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        this_question: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            },
            references: {
                model: 'choice',
                key: 'id'
            }
        },
        that_question: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            },
            references: 'choice',
            key: 'id'
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'question'
    }
);


module.exports = Question;
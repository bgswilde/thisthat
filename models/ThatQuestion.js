const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class ThatQuestion extends Model {}

ThatQuestion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            }
        },
        vote_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
            ifNull: 0,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'that_question'
    }
);

module.exports = ThatQuestion;
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
        this_true: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            },
        },
        that_false: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            }
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
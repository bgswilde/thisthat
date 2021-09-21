const bcrypt = require('bcrypt')
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')


class User extends Model {
    
}


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            inique: true,
            validate: {
                len: [1],
            }
        },
        password: {
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [3]
                }
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook"
            async beforeCreate(user) {
                // saltroudn = 10, the higher the more hashing rounds
                user.password = await bcrypt.hash(user.password, 10);
                return user.password
            },
            // beforeUpdate always to to set a value on a model before saving it
            async beforeUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
                return updateUser;
            }

        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }

);


module.exports = User;
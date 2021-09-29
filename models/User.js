const bcrypt = require('bcrypt')
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')


class User extends Model {
    // take plain text pass word to compare to hashed password
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
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
            unique: true,
            validate: {
                len: [1],
            }
        },
        password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [4]
                }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook"
            async beforeCreate(newuser) {
                // saltroudn = 10, the higher the more hashing rounds
                newuser.password = await bcrypt.hash(newuser.password, 8);
                return newuser;
            },
            // beforeUpdate always to to set a value on a model before saving it
            async beforeUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updateUser.password, 8);
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
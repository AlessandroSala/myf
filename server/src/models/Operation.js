const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define('Operation', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        amount: DataTypes.DOUBLE,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.BOOLEAN
        

    },{
        hooks: {
            afterCreate: function (operation, options) {
                const {User} = require('../models')
                const user = User.findByPk(operation.UserId).then(user => {
                    currentBalance = Number(user.balance)
                    amountToAdd = operation.type == 0 ? Number(operation.amount) : -Number(operation.amount)
                    user.update({
                        balance: currentBalance + amountToAdd
                    })
                })
                
            }
        }
    })
    Operation.associate = function(models) {
        Operation.belongsTo(models.User)
    }
    return Operation
}
const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const Users = require('./users.models')

const Conversations = db.define('conversations', {
    id : {
        primaryKey: true, 
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        field: 'image_url',
        validate: {
            isUrl: true
        }
    }, 
    userId: {
        field: 'user_id',
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
   
})

module.exports = Conversations
const { DataTypes } = require('sequelize')

const db = require('../utils/database')
const Conversations = require('./conversations.models')
const Users = require('./users.models')

const Messages = db.define('messages', {
    id : {
        primaryKey: true, 
        type: DataTypes.UUID,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        field: 'user_id',
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    conversationId : {
        field: 'conversation_id',
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Conversations
        } 
    }
   
})

module.exports = Messages
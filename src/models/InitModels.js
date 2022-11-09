const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')
const Users = require('./users.models') 

const initModel = ()=>{
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

}

module.exports = initModel
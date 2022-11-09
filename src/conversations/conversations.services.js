const conversationsControllers = require('./conversations.controllers')
const messageControllers = require('../messages/message.controllers')

const getAllConversations = (req, res) => {
    const id = req.user.id
    conversationsControllers.getAllMyConversations(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  };

const postConversation = (req, res) => {
    const { title, imageUrl } = req.body
    const userId = req.user.id
    if(
        title 
    ){
        conversationsControllers.createConversation({title, imageUrl, userId})
            .then(data => {
                res.status(201).json({message: `Conversation created succesfully`})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }else{
        res.status(400).json({ message: 'All fields must be completed', 
        fields: {
            title: 'string'
        }})
    }
}

const getConversationsById = (req, res) => {
    const id = req.params.conversation_id
    conversationsControllers.getConversationById(id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(404).json({message: err.message})
      })
  }


const deleteConversationById = (req, res) =>{
    const id = req.params.conversation_id
    conversationsControllers.deleteConversationById(id)
    .then((data) => {
        if(data){
            res.status(204).json()
        }else{
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch(err => {
        res.status(404).json({
            message: err.message
        })
    })
}

const patchConversationById = (req,res) => {
    const id = req.params.conversation_id
    const {title, imageUrl} = req.body
    conversationsControllers.updateConversation(id, {title, imageUrl})
    .then((data) => {
        if(data[0]){
            res.status(200).json({message: `Conversation with ID: ${id} updated`})
        }else{
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch(err => {
        res.status(404).json({
            message: err.message
        })
    })

}

//? Conversation messages

const getAllMessagesFromConversationId = (req,res) =>{
    const id = req.params.conversation_id
    messageControllers.getAllMessages(id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(404).json({message: err.message})
    })
}

const createMessage = (req, res) =>{
    const userId = req.user.id
    const conversationId = req.params.conversation_id
    const {message} = req.body 
    if(message){
        messageControllers.createMessage(userId, conversationId, {message})
        .then((data) => {
            res.status(201).json({message: 'Message created succesfully'})
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })

    }else{
        res.status(400).json({message: 'Message most be filled'})
    }
}

const getMessageById = (req, res) =>{
    const conversationId = req.params.conversation_id
    const messageId = req.params.message_id
    messageControllers.getMessageByIdAndConversation(conversationId, messageId)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(404).json({message: err.message})
    })
}

const deleteMessage = (req, res) => {
    const conversationId = req.params.conversation_id
    const messageId = req.params.message_id
    messageControllers.deleteMessageByIdAndConversation(conversationId, messageId)
    .then((data) => {
        if(data){
            res.status(204).json()
        }else{
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch(err => {
        res.status(404).json({
            message: err.message
        })
    })

}
   
module.exports = {
    getAllConversations,
    postConversation,
    getConversationsById,
    deleteConversationById,
    patchConversationById,
    getAllMessagesFromConversationId,
    createMessage,
    getMessageById,
    deleteMessage
}
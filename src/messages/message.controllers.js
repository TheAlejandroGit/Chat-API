const Messages = require("../models/messages.models");
const uuid = require("uuid");
const Users = require("../models/users.models");
const Conversations = require("../models/conversations.models");


const getAllMessages = async (id) => {
  const data = await Messages.findAll({
    where: {
      conversation_id: id
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Conversations,
        as: "conversation",
        attributes: ["id", "title"]
      }
    ],
  });
  return data;
};

// const getMessagesByConversation = async (conversation_id) => {
//   const data = await Messages.findAll({
//     where: {
//       conversation_id,
//     },
//   });
//   return data;
// }
// ;
// const getMessagesByParticipant = async (participant_id) => {
//   const data = await Messages.findAll({
//     where: {
//       participant_id,
//     },
//   });
//   return data;
// };

const getMessageByIdAndConversation = async (conversationId, messageId) => {
  const data = await Messages.findOne({
    where: {
      id: messageId,
      conversationId,
    },
    include: [
      {
        model: Conversations,
        as: "conversation",
        attributes: ["id", "title"],
      }
    ],
  });
  return data;
};

const createMessage = async (userId, conversationId, data) => {
  const newMessage = {
    id: uuid.v4(),
    message: data.message,
    userId: userId,
    conversationId: conversationId,
  };
  const response = await Messages.create(newMessage);
  return response;
};

const deleteMessageByIdAndConversation = async (conversationId, messageId) => {
  const data = await Messages.destroy({
    where: {
      id: messageId,
      conversationId,
    }
  });
  return data;
};

module.exports = {
  getAllMessages,
  createMessage,
  getMessageByIdAndConversation,
  deleteMessageByIdAndConversation
};

const Conversations = require("../models/conversations.models");
const Users = require("../models/users.models");
const uuid = require('uuid')

const getAllMyConversations = (id) => {
  const data = Conversations.findAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["firstName", "lastName", "email"],
      },
    ],
  });
  return data;
};

const createConversation = async (data) => {
  const response = await Conversations.create({
    id: uuid.v4(),
    title: data.title,
    imageUrl: data.imageUrl,
    userId: data.userId
  });
  return response;
};

const getConversationById = async (id) => {
  const data = await Conversations.findOne({
    where: {
      id: id
    },
  });
  return data;
};

const deleteConversationById = async (id) => {
  const data = await Conversations.destroy({
    where: {
      id: id
    },
  });
  return data;
};

const updateConversation = async (id, data) => {
  const result = await Conversations.update(data, {
    where: {
      id,
    },
  });
  return result;
};

module.exports = {
  getAllMyConversations,
  createConversation,
  getConversationById,
  deleteConversationById,
  updateConversation
};

import uuidv4 from "uuid/v4";

export default {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findByPk(id);
    }
  },
  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      try {
        return await models.Message.create({
          text,
          userId: me.id
        });
      } catch (error) {
        throw new Error("Error creating a message: " + error);
      }
    },
    deleteMessage: async (parent, { id }, { models }) => {
      return await models.Message.destroy({ where: { id } });
    },
    updateMessage: (parent, { id, text }, { models }) => {
      // const message = models.messages[id];
      // if (!message) {
      //   return false;
      // }
      // message.text = text;
      // return message;
      return false;
    }
  },
  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findByPk(message.userId);
    }
  }
};

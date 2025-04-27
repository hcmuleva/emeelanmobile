"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

// Optional: your Ably setup
const Ably = require("ably");
const ably = new Ably.Realtime(process.env.ABLY_API_KEY);

module.exports = createCoreController("api::chat.chat", ({ strapi }) => ({
  async sendMessage(ctx) {
    const { sender, reciever, message } = ctx.request.body;

    if (!sender || !reciever || !message) {
      return ctx.badRequest("sender, reciever, and message are required");
    }

    const entry = await strapi.entityService.create("api::chat.chat", {
      data: { sender, reciever, message },
    });

    // 🔔 Optional: Send Ably push
    const channel = ably.channels.get(`chat:${reciever}`);
    channel.publish("new-message", {
      from: sender,
      message,
      chatId: entry.id,
    });

    return { success: true, data: entry };
  },

  async getMessagesBetweenUsers(ctx) {
    const { sender, reciever } = ctx.request.query;

    if (!sender || !reciever) {
      return ctx.badRequest("sender and reciever are required");
    }

    const messages = await strapi.entityService.findMany("api::chat.chat", {
      filters: {
        $or: [
          { sender: sender, reciever: reciever },
          { sender: reciever, reciever: sender },
        ],
      },
      populate: { sender: true, reciever: true },
      sort: { createdAt: "desc" },
    });

    return { messages };
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    try {
      const updatedChat = await strapi.entityService.update('api::chat.chat', id, {
        data: body,
      });

      return ctx.send({ message: 'Chat updated successfully', data: updatedChat }, 200);
    } catch (error) {
      console.error('Update error:', error);
      return ctx.send({ error: 'Failed to update chat' }, 500);
    }
  },

  // DELETE /api/chats/:id
  async delete(ctx) {
    const { id } = ctx.params;

    try {
      const deletedChat = await strapi.entityService.delete('api::chat.chat', id);
      return ctx.send({ message: 'Chat deleted successfully', data: deletedChat }, 200);
    } catch (error) {
      console.error('Delete error:', error);
      return ctx.send({ error: 'Failed to delete chat' }, 500);
    }
  },

}));
